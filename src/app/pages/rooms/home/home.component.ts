import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DTOptions } from 'src/app/variables/data-table-config';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/variables/user';
import { env } from 'src/app/variables/env';
import { RoomsService } from '../rooms.service';
import { Room } from 'src/app/variables/room';

@Component({
  selector: 'rooms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();
  rooms: Room[] = [];
  loadingId: number = null;
  loadingStarId: number = null;
  imgURL = env.apiURL;
  constructor(private service: RoomsService, private toastr: ToastrService) { }

  ngOnInit() {

    let that = this;
    this.dtOptions = {
      ...DTOptions,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.service.getRooms(dataTablesParameters).subscribe(room => {
          that.rooms = room.data;

          callback({
            recordsTotal: room.recordsTotal,
            recordsFiltered: room.recordsFiltered,
            data: []
          });
        })
      },

      columns: [ { data: 'description' }, { data: 'count' }, { data: 'id', visible: true, orderable: false, searchable: false }],

    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  deleteRoom(id) {
    this.loadingId = id;
    this.service.deleteRoom(id).subscribe(res => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        this.loadingId = null;
        this.toastr.success("Delete Successfully...");
        dtInstance.destroy();
        this.rooms = [];
        this.dtTrigger.next();
      });
    })

  }
  changeRoomFeaturedStatus(id, featured) {
    this.loadingStarId = id;
    if (featured) {
      this.service.setRoomFeatured(id).subscribe(res => {
        this.loadingStarId = null;

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          this.loadingId = null;
          this.toastr.success("Change Successfully...");
          dtInstance.destroy();
          this.rooms = [];
          this.dtTrigger.next();
        });
      })
    } else {
      this.service.setRoomUnfeatured(id).subscribe(res => {
        this.loadingStarId = null;

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          this.loadingId = null;
          this.toastr.success("Change Successfully...");
          dtInstance.destroy();
          this.rooms = [];
          this.dtTrigger.next();
        });
      })
    }
  }
}