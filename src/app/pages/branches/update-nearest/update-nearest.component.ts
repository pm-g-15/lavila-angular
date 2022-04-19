import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BranchesService } from '../branches.service';
import { ToastrService } from 'ngx-toastr';
import { NearestItem } from 'src/app/variables/nearest-item';
import { env } from "src/app/variables/env";

@Component({
  selector: 'branch-update-nearest',
  templateUrl: './update-nearest.component.html',
  styleUrls: ['./update-nearest.component.scss']
})
export class UpdateNearestComponent implements OnInit {
  saveLoading:boolean = false;
  nearestCategoryForm:FormGroup;
  nearestItemForm:FormGroup;
  nearestItem:NearestItem;
  categoryList = [];
  imageData;
  imageUrl = env.apiURL; 
  constructor(private modalService: NgbModal,private route:ActivatedRoute,private service:BranchesService,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.listBranchNearestCategory(this.route.snapshot.paramMap.get('branchId')).subscribe(resList=>{
      this.categoryList = resList;
    })
  }
  openModal(nearestCategoryModal){
    this.nearestCategoryForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'nameAr': new FormControl(null, Validators.required)
    })
    this.modalService.open(nearestCategoryModal, { size: 'lg' });
  }
  openItemModal(nearestCategoryModal,id){
    this.nearestItem = new NearestItem();
    this.nearestItem.categoryId = id;
    this.nearestItemForm = new FormGroup({
      'categoryId': new FormControl(this.nearestItem.categoryId, Validators.required),
      'name': new FormControl(this.nearestItem.name, Validators.required),
      'nameAr': new FormControl(this.nearestItem.nameAr),
      'description': new FormControl(this.nearestItem.description, Validators.required),
      'descriptionAr': new FormControl(this.nearestItem.descriptionAr),
      'link': new FormControl(this.nearestItem.link, Validators.required),
      'itemImages': new FormControl(this.nearestItem.image, Validators.required)
    })
    this.modalService.open(nearestCategoryModal, { size: 'lg' });
  }
  saveNearestCategory(values){
    values.branchId = this.route.snapshot.paramMap.get('branchId');
    this.service.createBranchNearestCategory(values).subscribe(res=>{ 
      this.service.listBranchNearestCategory(this.route.snapshot.paramMap.get('branchId')).subscribe(resList=>{
        this.categoryList = resList;
        this.modalService.dismissAll();
        this.toastr.success("Nearest Category Created!!!");
      },err=>{
        this.toastr.success("Nearest Category Create Failed, Please try again later!!!");
      })
    })
  }
  deleteNearestCategory(id){
    this.service.deleteBranchNearestCategory(id).subscribe(res=>{
      this.service.listBranchNearestCategory(this.route.snapshot.paramMap.get('branchId')).subscribe(resList=>{
        this.toastr.success("Nearest Category Delete Successfully!!!");
        this.categoryList = resList;
      })
    },err=>{
      this.toastr.success("Nearest Category Delete Failed, Please try again later!!!");
    })
  }
  removeNearestItem(id){
    this.service.deleteBranchNearestItem(id).subscribe(res=>{
      this.service.listBranchNearestCategory(this.route.snapshot.paramMap.get('branchId')).subscribe(resList=>{
        this.toastr.success("Nearest Item Delete Successfully!!!");
        this.categoryList = resList;
      })
    },err=>{
      this.toastr.success("Nearest Item Delete Failed, Please try again later!!!");
    })
  }
  changeFile(value) {
    console.log(value);
    this.nearestItem.image = value; 
    this.readURL(value);
  }
  readURL(input) {
    let that = this;
    if (input) {
      let reader = new FileReader();

      reader.onload = function (e) {
        that.imageData = e.target['result'];
      }

      reader.readAsDataURL(input);
    }
  }
  saveNearestItem(value){
    this.saveLoading = true;
    const fd = new FormData();
    fd.append('name', this.nearestItemForm.value.name);
    fd.append('nameAr', this.nearestItemForm.value.nameAr);
    fd.append('description', this.nearestItemForm.value.description);
    fd.append('descriptionAr', this.nearestItemForm.value.descriptionAr);
    fd.append('link', this.nearestItemForm.value.link);
    fd.append('branchNearestCategoryId', this.nearestItemForm.value.categoryId); 
    if (this.nearestItem.image == null) {
      fd.append('branchNearestItemImage', null);
    } else {
      fd.append('branchNearestItemImage', this.nearestItem.image, this.nearestItem.image.name);
    }
    this.service.createBranchNearestItem(fd).subscribe(res => {
      this.saveLoading = false;
      this.nearestItem = new NearestItem();
      this.nearestItemForm = new FormGroup({
        'categoryId': new FormControl(this.nearestItem.categoryId, Validators.required),
        'name': new FormControl(this.nearestItem.name, Validators.required),
        'nameAr': new FormControl(this.nearestItem.nameAr),
        'description': new FormControl(this.nearestItem.description, Validators.required),
        'descriptionAr': new FormControl(this.nearestItem.descriptionAr),
        'link': new FormControl(this.nearestItem.link, Validators.required),
        'itemImages': new FormControl(this.nearestItem.image, Validators.required)
      })
      this.imageData = null;
      this.service.listBranchNearestCategory(this.route.snapshot.paramMap.get('branchId')).subscribe(resList=>{
        this.toastr.success('Nearest Item Create Successfully..!!');
        this.categoryList = resList;
        this.modalService.dismissAll();
      }) 
    }, err => {
      this.saveLoading = false;
      this.toastr.error('Nearest Item Create Failed, Please try again later..!!');
    });
  }
}
