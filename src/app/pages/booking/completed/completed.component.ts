import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from '../booking.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { DTOptions } from 'src/app/variables/data-table-config';
import { Branch } from 'src/app/variables/branch';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'booking-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

  cBDtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  cBDtTrigger: Subject<any> = new Subject();
  completedBooking = [];
  moment = moment;
  branches:Branch[] = [];
  completedBookingSearch = {
    branch : '',
    checkIn : null,
    checkOut : null,
    fName : null,
    booking : null
  }
  constructor(private service: BookingService) { }

  ngOnInit() {
    let that = this;
    this.service.listBranch().subscribe(res=>{
      this.branches = res;
    })
    this.cBDtOptions = {
      ...DTOptions,
      serverSide: true,
      search:false,
      searching:false,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['branch'] = this.completedBookingSearch.branch;
        dataTablesParameters['checkIn'] = this.completedBookingSearch.checkIn;
        dataTablesParameters['checkOut'] = this.completedBookingSearch.checkOut;
        dataTablesParameters['fName'] = this.completedBookingSearch.fName;
        dataTablesParameters['booking'] = this.completedBookingSearch.booking;
        this.service.getCompletedBooking(dataTablesParameters).subscribe(booking => {
          that.completedBooking = booking.data;
          callback({
            recordsTotal: booking.recordsTotal,
            recordsFiltered: booking.recordsFiltered,
            data: []
          });
        })
      },

      columns: [{ data: 'bookingId', orderable: false, searchable: false }, { data: 'checkIn', orderable: false, searchable: false }, { data: 'checkOut', orderable: false, searchable: false }, { data: 'fName', orderable: false, searchable: false }, { data: 'createdAt', orderable: false, searchable: false }, { data: 'finalPrice', orderable: false, searchable: false }, { data: 'status', orderable: false, searchable: false }, { data: 'roomCategories', orderable: false, searchable: false }, { data: 'id', visible: true, orderable: false, searchable: false }],

    };
  }

  ngAfterViewInit(): void {
    this.cBDtTrigger.next();
  }

  ngOnDestroy(): void {
    this.cBDtTrigger.unsubscribe();
  }
  leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
      output = '0' + output;
    }
    return output;
  } 
  search(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.cBDtTrigger.next();
    });
  }
}
