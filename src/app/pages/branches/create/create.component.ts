import { Component, OnInit } from '@angular/core';
import { BranchesService } from '../branches.service';
import { User } from 'src/app/variables/user';
import { Branch } from 'src/app/variables/branch';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MouseEvent } from '@agm/core';
// just an interface for type safety. 

@Component({
  selector: 'branches-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit { 
  users: User[] = [];
  branchForm: FormGroup;
  branch: Branch;
  saveLoading:boolean = false;
  branchImages: File[] = [];
  imageData: any[] = [];
  constructor(private service: BranchesService,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
    this.service.getAdminUser().subscribe(res => {
      this.users = res;
      this.branch = new Branch();
      this.branch.lat = 25.209094339280746;
      this.branch.lng = 50.95256742556967;
      this.branchForm = new FormGroup({
        'name': new FormControl(this.branch.name, Validators.required),
        'nameAr': new FormControl(this.branch.nameAr),
        'address': new FormControl(this.branch.address, Validators.required),
        'addressAr': new FormControl(this.branch.addressAr),
        'description': new FormControl(this.branch.description, Validators.required),
        'descriptionAr': new FormControl(this.branch.descriptionAr),
        'selectedUserId': new FormControl(this.branch.selectedUserId, Validators.required),
        'branchImages': new FormControl(this.branch.branchImages, Validators.required),
        'lat': new FormControl(this.branch.lat , Validators.required),
        'lng': new FormControl(this.branch.lng , Validators.required),
        'status': new FormControl(this.branch.status, Validators.required)
      });
    })
  }
  markerDragEnd(m: Branch, $event: MouseEvent) {
    this.branch.lat = $event.coords.lat;
    this.branch.lng = $event.coords.lng;
    this.branchForm.controls['lat'].setValue($event.coords.lat);
    this.branchForm.controls['lng'].setValue($event.coords.lng);
  }
  changeFile(value) {
    this.imageData = [];
    this.branchImages = [];
    for (let i = 0; i < value.length; i++) {
      this.branchImages.push(value[i]);
      this.readURL(value[i]);
    }
    if (this.branchImages.length == 0) {
      this.branchForm.controls['branchImages'].setValue(null);
    }
    this.branchForm.controls['branchImages'].setValue(this.branchImages); 
  }
  readURL(input) {
    let that = this;
    if (input) {
      let reader = new FileReader();

      reader.onload = function (e) {
        that.imageData.push(e.target['result']);
      }
      reader.readAsDataURL(input);

    }
  }
  createBranch(branchData){ 
    this.saveLoading = true;
    
    const fd = new FormData();
    fd.append('name',this.branchForm.value.name);
    fd.append('nameAr',this.branchForm.value.nameAr);
    fd.append('address',this.branchForm.value.address);
    fd.append('addressAr',this.branchForm.value.addressAr);
    fd.append('description',this.branchForm.value.description);
    fd.append('descriptionAr',this.branchForm.value.descriptionAr);
    fd.append('selectedUserId',this.branchForm.value.selectedUserId); 
    fd.append('lat',this.branchForm.value.lat);
    fd.append('lng',this.branchForm.value.lng);
    fd.append('status',this.branchForm.value.status); 


    if (this.branchForm.value.branchImages.length == 0) {
      fd.append('branchImages', null);
    } else {
      this.branchForm.value.branchImages.map(
        (rI, i) => {
          fd.append('branchImages', rI, rI.name);

        }
      );
    }
    this.service.createBranch(fd).subscribe(res=>{
      console.log(res);
      this.toastr.success("Create Successfully!!!");
      this.saveLoading = false;
      this.router.navigate(['/branches']);
    },err=>{
      this.toastr.error(err); 
    })
  }
}