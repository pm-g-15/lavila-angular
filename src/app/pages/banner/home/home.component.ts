import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Banner } from 'src/app/variables/banner';
import { env } from "src/app/variables/env";
import { BannerService } from '../banner.service';
import { ToastrService } from 'ngx-toastr';
import { DTOptions } from 'src/app/variables/data-table-config';

@Component({
  selector: 'banner-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective; 

  dtTrigger: Subject<any> = new Subject();
  banners:Banner[] = [];
  loadingId:number=null;
  imgURL = env.apiURL;
  constructor(private service:BannerService,private toastr:ToastrService) { }

  ngOnInit() {
    
    let that = this;
     this.dtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.service.listBanner(dataTablesParameters).subscribe(banner=>{
          console.log(banner)
          that.banners = banner.data;
          callback({
            recordsTotal: banner.recordsTotal,
            recordsFiltered: banner.recordsFiltered,
            data: []
          });
        }) 
      },
      
      columns: [{ data: 'image' },{ data: 'description' },{ data: 'status' },{ data: 'id',visible:true,orderable:false,searchable:false }],
      
    }; 
  } 
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void { 
    this.dtTrigger.unsubscribe();
  }
  deleteBanner(id){
    this.loadingId = id; 
    this.service.deleteBanner(id).subscribe(res=>{
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => { 
        this.loadingId = null;
        this.toastr.success("Delete Successfully...")
        dtInstance.destroy(); 
        this.dtTrigger.next();
      }); 
    })
    
  }
}