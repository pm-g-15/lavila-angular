import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from '../booking.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { DTOptions } from 'src/app/variables/data-table-config';
import { Branch } from 'src/app/variables/branch';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'booking-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {

  uBDtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  
  uBDtTrigger: Subject<any> = new Subject();
  upcomingBooking = [];
  moment = moment;
  branches:Branch[] = [];
  upcomingBookingSearch = {
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
    this.uBDtOptions = DTOptions;
    this.uBDtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['branch'] = this.upcomingBookingSearch.branch;
        dataTablesParameters['checkIn'] = this.upcomingBookingSearch.checkIn;
        dataTablesParameters['checkOut'] = this.upcomingBookingSearch.checkOut;
        dataTablesParameters['fName'] = this.upcomingBookingSearch.fName;
        dataTablesParameters['booking'] = this.upcomingBookingSearch.booking;
        this.service.getUpcomingBooking(dataTablesParameters).subscribe(booking => {
          that.upcomingBooking = booking.data;

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
    this.uBDtTrigger.next();
  }

  ngOnDestroy(): void {
    this.uBDtTrigger.unsubscribe();
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
      this.uBDtTrigger.next();
    });
  }
}
