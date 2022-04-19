import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from '../booking.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { DTOptions } from 'src/app/variables/data-table-config';
import { Branch } from 'src/app/variables/branch';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'booking-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrls: ['./cancelled.component.scss']
})
export class CancelledComponent implements OnInit {

  canBDtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  
  canBDtTrigger: Subject<any> = new Subject();
  cancelledBooking = [];
  moment = moment;
  branches:Branch[] = [];
  canceledBookingSearch = {
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
    this.canBDtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['branch'] = this.canceledBookingSearch.branch;
        dataTablesParameters['checkIn'] = this.canceledBookingSearch.checkIn;
        dataTablesParameters['checkOut'] = this.canceledBookingSearch.checkOut;
        dataTablesParameters['fName'] = this.canceledBookingSearch.fName;
        dataTablesParameters['booking'] = this.canceledBookingSearch.booking;
        this.service.getCancelledBooking(dataTablesParameters).subscribe(booking => {
          that.cancelledBooking = booking.data;

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
    this.canBDtTrigger.next();
  }

  ngOnDestroy(): void {
    this.canBDtTrigger.unsubscribe();
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
      this.canBDtTrigger.next();
    });
  }
}
