import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { User } from 'src/app/variables/user';
import { CustomersService } from '../customers.service';
import { ToastrService } from 'ngx-toastr';
import { env } from 'src/app/variables/env';
import { DTOptions } from 'src/app/variables/data-table-config';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'customers-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {
  fileName= 'ExcelSheet.xlsx'; 
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective; 

  dtTrigger: Subject<any> = new Subject();
  user:User[] = [];
  loadingId:number=null;
  imgURL = env.apiURL;
  loadingStarId: number = null;
  constructor(private service:CustomersService,private toastr:ToastrService) { }

  ngOnInit() {
    
    let that = this;
     this.dtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.service.listCustomers(dataTablesParameters).subscribe(user=>{
          that.user = user.data;

          callback({
            recordsTotal: user.recordsTotal,
            recordsFiltered: user.recordsFiltered,
            data: []
          });
        }) 
      },
      
      columns: [{ data: 'image' },{ data: 'fName' },{ data: 'email' },{ data: 'phone' }, { data: 'status' },{ data: 'id',visible:true,orderable:false,searchable:false }],
      
    }; 
  } 
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void { 
    this.dtTrigger.unsubscribe();
  } 
  changeStatus(id,status){
    this.loadingStarId = id;
    if (status) {
      this.service.enableCustomer(id).subscribe(res => {
        this.loadingStarId = null;

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          this.loadingId = null;
          this.toastr.success("Change Successfully...");
          dtInstance.destroy();
          this.user = [];
          this.dtTrigger.next();
        });
      })
    } else {
      this.service.blockCustomer(id).subscribe(res => {
        this.loadingStarId = null;

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          this.loadingId = null;
          this.toastr.success("Change Successfully...");
          dtInstance.destroy();
          this.user = [];
          this.dtTrigger.next();
        });
      })
    }
  }
  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }
}