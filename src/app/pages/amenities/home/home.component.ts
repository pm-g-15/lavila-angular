import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Amenities } from 'src/app/variables/amenities';
import { AmenitiesService } from '../amenities.service';
import { DTOptions } from 'src/app/variables/data-table-config';

@Component({
  selector: 'amenities-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();
  amenities: Amenities[] = [];
  loadingId: number = null;
  loadingStarId: number = null;
  constructor(private service: AmenitiesService, private toastr: ToastrService) { }

  ngOnInit() {

    let that = this;
    this.dtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.service.listAmenities(dataTablesParameters).subscribe(amenities => {
          that.amenities = amenities.data;

          callback({
            recordsTotal: amenities.recordsTotal,
            recordsFiltered: amenities.recordsFiltered,
            data: []
          });
        })
      },

      columns: [{ data: 'name' }, { data: 'amenitiesTypeId' }, { data: 'id', visible: true, orderable: false, searchable: false }],

    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  deleteAmenity(id) {
    this.loadingId = id;
    this.service.deleteAmenity(id).subscribe(res => {
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
      this.service.setAmenitiesFeatured(id).subscribe(res => {
        this.loadingStarId = null;

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          this.loadingId = null;
          this.toastr.success("Change Successfully...");
          dtInstance.destroy();
          this.amenities = [];
          this.dtTrigger.next();
        });
      })
    } else {
      this.service.setAmenitiesUnfeatured(id).subscribe(res => {
        this.loadingStarId = null;

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          this.loadingId = null;
          this.toastr.success("Change Successfully...");
          dtInstance.destroy();
          this.amenities = [];
          this.dtTrigger.next();
        });
      })
    }
  }
}
