import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { DTOptions } from 'src/app/variables/data-table-config';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Events } from 'src/app/variables/events';
import { EventsService } from '../events.service'; 

@Component({
  selector: 'events-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();
  events: Events[] = [];
  loadingId: number = null;
  loadingStarId: number = null; 
  constructor(private service: EventsService, private toastr: ToastrService) { }

  ngOnInit() {

    let that = this;
    this.dtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.service.listEvent(dataTablesParameters).subscribe(events => {
          that.events = events.data;

          callback({
            recordsTotal: events.recordsTotal,
            recordsFiltered: events.recordsFiltered,
            data: []
          });
        })
      },

      columns: [ { data: 'name' },  { data: 'date' },{ data: 'id', visible: true, orderable: false, searchable: false }],

    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  deleteEvent(id) {
    this.loadingId = id;
    this.service.deleteEvent(id).subscribe(res => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        this.loadingId = null;
        this.toastr.success("Delete Successfully...")
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    })

  }
  changeAmenityFeaturedStatus(id, featured) {
    this.loadingStarId = id;
    if (featured) {
      this.service.setEventFeatured(id).subscribe(res => {
        this.loadingStarId = null;

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          this.loadingId = null;
          this.toastr.success("Change Successfully...");
          dtInstance.destroy();
          this.events = [];
          this.dtTrigger.next();
        });
      })
    } else {
      this.service.setEventUnfeatured(id).subscribe(res => {
        this.loadingStarId = null;

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          this.loadingId = null;
          this.toastr.success("Change Successfully...");
          dtInstance.destroy();
          this.events = [];
          this.dtTrigger.next();
        });
      })
    }
  }
}
