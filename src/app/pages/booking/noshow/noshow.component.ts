import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from '../booking.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { DTOptions } from 'src/app/variables/data-table-config';
import { Branch } from 'src/app/variables/branch';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'booking-noshow',
  templateUrl: './noshow.component.html',
  styleUrls: ['./noshow.component.scss']
})
export class NoshowComponent implements OnInit {

  noShowBDtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  noShowBDtTrigger: Subject<any> = new Subject();
  noShowBooking = [];
  moment = moment;
  branches:Branch[] = [];
  noShowBookingSearch = {
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
    this.noShowBDtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['branch'] = this.noShowBookingSearch.branch;
        dataTablesParameters['checkIn'] = this.noShowBookingSearch.checkIn;
        dataTablesParameters['checkOut'] = this.noShowBookingSearch.checkOut;
        dataTablesParameters['fName'] = this.noShowBookingSearch.fName;
        dataTablesParameters['booking'] = this.noShowBookingSearch.booking;
        this.service.getNoShowBooking(dataTablesParameters).subscribe(booking => {
          that.noShowBooking = booking.data;

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
    this.noShowBDtTrigger.next();
  }

  ngOnDestroy(): void {
    this.noShowBDtTrigger.unsubscribe();
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
      this.noShowBDtTrigger.next();
    });
  }
}
