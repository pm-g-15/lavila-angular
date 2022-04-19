import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Offer } from 'src/app/variables/offer';
import { OffersService } from '../offers.service';
import { ToastrService } from 'ngx-toastr';
import { DTOptions } from 'src/app/variables/data-table-config';

@Component({
  selector: 'offers-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();
  offers: Offer[] = [];
  loadingId: number = null;
  loadingStarId: number = null; 
  constructor(private service: OffersService, private toastr: ToastrService) { }

  ngOnInit() {

    let that = this;
    this.dtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.service.listOffer(dataTablesParameters).subscribe(offers => {
          that.offers = offers.data;

          callback({
            recordsTotal: offers.recordsTotal,
            recordsFiltered: offers.recordsFiltered,
            data: []
          });
        })
      },

      columns: [ { data: 'id' },{ data: 'offerPercent' },  { data: 'status' },{ data: 'id', visible: true, orderable: false, searchable: false }],

    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  deleteOffer(id) {
    this.loadingId = id;
    this.service.deleteOffer(id).subscribe(res => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        this.loadingId = null;
        this.toastr.success("Delete Successfully...")
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    })

  } 
}
