import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'; 
import { RoomCategoriesService } from '../room-categories.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DTOptions } from 'src/app/variables/data-table-config';

class RoomCategories {
   id:any;
   name:string;
   featured:boolean ;
}

@Component({
  selector: 'room-categories-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements  AfterViewInit, OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective; 

  dtTrigger: Subject<any> = new Subject();
  roomCategories:RoomCategories[] = [];
  loadingId:number=null;
  constructor(private service:RoomCategoriesService,private toastr:ToastrService) { }

  ngOnInit() {
    
    let that = this;
     this.dtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.service.listRoomCategory(dataTablesParameters).subscribe(roomCategories=>{
          that.roomCategories = roomCategories.data;

          callback({
            recordsTotal: roomCategories.recordsTotal,
            recordsFiltered: roomCategories.recordsFiltered,
            data: []
          });
        }) 
      },
      
      columns: [{ data: 'name' }, { data: 'featured' },{ data: 'id',visible:true,orderable:false,searchable:false }],
      
    }; 
  } 
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void { 
    this.dtTrigger.unsubscribe();
  }
  deleteRoomCategory(id){
    this.loadingId = id; 
    this.service.deleteRoomCategory(id).subscribe(res=>{
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => { 
        this.loadingId = null;
        this.toastr.success("Delete Successfully...")
        dtInstance.destroy(); 
        this.dtTrigger.next();
      }); 
    },err=>{
      console.log(err);
      this.loadingId = null;
      this.toastr.error(err.error.message);
    })
    
  }
}
