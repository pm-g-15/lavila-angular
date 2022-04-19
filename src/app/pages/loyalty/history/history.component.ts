import { Component, OnInit, ViewChild } from '@angular/core';
import { DTOptions } from 'src/app/variables/data-table-config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoyaltyService } from '../loyalty.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Loyalty } from 'src/app/variables/loyalty';

@Component({
  selector: 'loyalty-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  loyalties:Loyalty[] = [];
  activeTab="update";
  selectedIndex 
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();

  
  constructor(private modalService: NgbModal,private service:LoyaltyService) { }

  ngOnInit() {    
    let that = this;
    this.dtOptions = {
      ...DTOptions,
      serverSide: true,
      destroy: true,
      processing: true,
      searching:false,
      ajax: (dataTablesParameters: any, callback) => {
        this.service.listLoyalty(dataTablesParameters).subscribe(data => {
          that.loyalties = data.data;

          callback({
            recordsTotal: data.recordsTotal,
            recordsFiltered: data.recordsFiltered,
            data: []
          });
        },err=>{
          console.log(err)
        })
      },
      
      columns: [{ data: 'id', visible: true, searchable: false },{data:'minTotalBookingAmountPassLoyalty', searchable: false},{data:'oneQAREqualPoint', searchable: false},{data:'minTotalBookingAmountForUsing', searchable: false},{data:'minTotalBookingAmountToGetLoyalty', searchable: false}],

    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  getData(){
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  openModal(contentModal,i) {
    this.selectedIndex = i;
    this.modalService.open(contentModal, { size: 'lg' });
  }
}
