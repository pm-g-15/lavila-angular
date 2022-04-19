import { Component, OnInit, ViewChild } from '@angular/core';
import { DTOptions } from 'src/app/variables/data-table-config';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PromoCode } from 'src/app/variables/promo-code';
import { ToastrService } from 'ngx-toastr';
import { PromoCodesService } from '../promo-codes.service';

@Component({
  selector: 'promo-codes-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();
  promoCodes: PromoCode[] = [];
  loadingId: number = null;
  constructor(private service: PromoCodesService, private toastr: ToastrService) { }

  ngOnInit() {

    let that = this;
    this.dtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.service.listPromoCode(dataTablesParameters).subscribe(promoCodes => {
          that.promoCodes = promoCodes.data;

          callback({
            recordsTotal: promoCodes.recordsTotal,
            recordsFiltered: promoCodes.recordsFiltered,
            data: []
          });
        })
      },

      columns: [{ data: 'code' }, { data: 'description' }, { data: 'id', visible: true, orderable: false, searchable: false }],

    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  deletePromoCode(id){
    this.loadingId= id;
    this.service.deletePromoCode(id).subscribe(res=>{
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        this.loadingId = null;
        this.toastr.success("Delete Successfully...")
        dtInstance.destroy();
        this.dtTrigger.next();
      }); 
    },err=>{
      this.toastr.error("Delete Failed, Please try again later..!!!"); 
    })
  }
}
