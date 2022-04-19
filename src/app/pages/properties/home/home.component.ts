import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { DTOptions } from 'src/app/variables/data-table-config';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Property } from 'src/app/variables/property';
import { env } from "src/app/variables/env";
import { PropertiesService } from '../properties.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'properties-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();
  properties: Property[] = [];
  loadingId: number = null;
  loadingStarId: number = null;
  imgURL = env.apiURL;
  constructor(private service: PropertiesService, private toastr: ToastrService) { }

  ngOnInit() {

    let that = this;
    this.dtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.service.listProperties(dataTablesParameters).subscribe(properties => {
          that.properties = properties.data;

          callback({
            recordsTotal: properties.recordsTotal,
            recordsFiltered: properties.recordsFiltered,
            data: []
          });
        })
      },

      columns: [{ data: 'name' }, { data: 'description' },  { data: 'id', visible: true, orderable: false, searchable: false }],

    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  deleteProperty(id) {
    this.loadingId = id;
    this.service.deleteProperty(id).subscribe(res => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        this.loadingId = null;
        this.toastr.success("Delete Successfully...");
        dtInstance.destroy();
        this.properties = [];
        this.dtTrigger.next();
      });
    })

  }
  changePropertyFeaturedStatus(id, featured) {
    this.loadingStarId = id;
    if (featured) {
      this.service.setPropertyFeatured(id).subscribe(res => {
        this.loadingStarId = null;

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          this.loadingId = null;
          this.toastr.success("Change Successfully...");
          dtInstance.destroy();
          this.properties = [];
          this.dtTrigger.next();
        });
      })
    } else {
      this.service.setPropertyUnfeatured(id).subscribe(res => {
        this.loadingStarId = null;

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          this.loadingId = null;
          this.toastr.success("Change Successfully...");
          dtInstance.destroy();
          this.properties = [];
          this.dtTrigger.next();
        });
      })
    }
  }
}