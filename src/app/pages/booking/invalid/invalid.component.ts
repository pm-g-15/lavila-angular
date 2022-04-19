import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from '../booking.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { DTOptions } from 'src/app/variables/data-table-config';
import { Branch } from 'src/app/variables/branch';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'booking-invalid',
  templateUrl: './invalid.component.html',
  styleUrls: ['./invalid.component.scss']
})
export class InvalidComponent implements OnInit {

  invalidBDtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  invalidBDtTrigger: Subject<any> = new Subject();
  invalidBooking = [];
  moment = moment;
  branches:Branch[] = [];
  invalidBookingSearch = {
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
    this.invalidBDtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['branch'] = this.invalidBookingSearch.branch;
        dataTablesParameters['checkIn'] = this.invalidBookingSearch.checkIn;
        dataTablesParameters['checkOut'] = this.invalidBookingSearch.checkOut;
        dataTablesParameters['fName'] = this.invalidBookingSearch.fName;
        dataTablesParameters['booking'] = this.invalidBookingSearch.booking;
        this.service.getInvalidBooking(dataTablesParameters).subscribe(booking => {
          that.invalidBooking = booking.data;

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
    this.invalidBDtTrigger.next();
  }

  ngOnDestroy(): void {
    this.invalidBDtTrigger.unsubscribe();
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
      this.invalidBDtTrigger.next();
    });
  }
}
