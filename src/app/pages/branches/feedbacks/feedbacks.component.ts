import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/variables/branch';
import { BranchesService } from '../branches.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'branches-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements AfterViewInit, OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();
  feedbacks = [];
  loadingId = null;
  rating = 2;
  constructor(private service: BranchesService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {

    let that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      language: {
        paginate: {
          first: '<i class="fas fa-angle-left"></i><i class="fas fa-angle-left"></i>',
          last: '<i class="fas fa-angle-right"></i><i class="fas fa-angle-right"></i>',
          next: '<i class="fas fa-angle-right"></i>',
          previous: '<i class="fas fa-angle-left"></i>'
        }
      },
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['branchId'] = this.route.snapshot.paramMap.get('branchId');
        this.service.listBranchFeedBack(dataTablesParameters).subscribe(feeds => {
          that.feedbacks = feeds.data;

          callback({
            recordsTotal: feeds.recordsTotal,
            recordsFiltered: feeds.recordsFiltered,
            data: []
          });
        })
      },

      columns: [{ data: 'rating' }, { data: 'message' }, { data: 'id', visible: true, orderable: false, searchable: false }],

    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  deleteRoomCategory(id) {
    this.loadingId = id;
    this.service.deleteBranch(id).subscribe(res => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        this.loadingId = null;
        this.toastr.success("Delete Successfully...")
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    })

  }
}
