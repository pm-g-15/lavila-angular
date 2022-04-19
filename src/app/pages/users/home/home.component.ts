import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DTOptions } from 'src/app/variables/data-table-config'; 
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/variables/user';
import { UsersService } from '../users.service';
import { env } from 'src/app/variables/env';
@Component({
  selector: 'users-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective; 

  dtTrigger: Subject<any> = new Subject();
  user:User[] = [];
  loadingId:number=null;
  imgURL = env.apiURL;
  constructor(private service:UsersService,private toastr:ToastrService) { }

  ngOnInit() {
    
    let that = this;
     this.dtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.service.listAdminUsers(dataTablesParameters).subscribe(user=>{
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
  deleteUser(id){
    this.loadingId = id; 
    this.service.deleteAdminUser(id).subscribe(res=>{
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => { 
        this.loadingId = null;
        this.toastr.success("Delete Successfully...")
        dtInstance.destroy(); 
        this.dtTrigger.next();
      }); 
    })
    
  }
}