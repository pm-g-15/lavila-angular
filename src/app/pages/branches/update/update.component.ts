import { Component, OnInit } from '@angular/core';
import { BranchesService } from '../branches.service';
import { User } from 'src/app/variables/user';
import { Branch } from 'src/app/variables/branch';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MouseEvent } from '@agm/core';
import { env } from 'src/app/variables/env';

@Component({
  selector: 'branches-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  users: User[] = [];
  branchForm: FormGroup;
  branch: Branch;
  saveLoading: boolean = false;
  branchImages: File[] = [];
  imageData: any[] = [];
  imageUrl: string = env.apiURL;
  removedImages: number[] = [];
  constructor(private service: BranchesService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.getAdminUser().subscribe(res => {
      this.service.getBranch(this.route.snapshot.paramMap.get('id')).subscribe(bRes => {
        this.users = res;
        this.branch = new Branch();
        this.branch.lat = bRes.lat;
        this.branch.lng = bRes.lng; 
        this.branch.name = bRes.name;
        this.branch.nameAr = bRes.nameAr;
        this.branch.description = bRes.description;
        this.branch.descriptionAr = bRes.descriptionAr;
        this.branch.address = bRes.address;
        this.branch.addressAr = bRes.addressAr;
        this.branch.selectedUserId = bRes.selectedUserId;
        this.branch.branchImages = bRes.branchImages;
        this.branch.lat = bRes.lat;
        this.branch.lng = bRes.lng;
        this.branch.status = bRes.status;
        this.branchForm = new FormGroup({
          'name': new FormControl(bRes.name, Validators.required),
          'nameAr': new FormControl(bRes.nameAr),
          'description': new FormControl(bRes.description, Validators.required),
          'descriptionAr': new FormControl(bRes.descriptionAr),
          'address': new FormControl(bRes.address, Validators.required),
          'addressAr': new FormControl(bRes.addressAr),
          'selectedUserId': new FormControl(bRes.userId, Validators.required),
          'branchImages': new FormControl(bRes.branchImages),
          'lat': new FormControl(bRes.lat, Validators.required),
          'lng': new FormControl(bRes.lng, Validators.required),
          'status': new FormControl(bRes.status, Validators.required)
        });
      })
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
    console.log(this.branchForm);
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
  removeBranchUploadedImage(id, i) {
    this.removedImages.push(id);
    this.branch.branchImages.splice(i, 1);
  }
  removeBranchImage(i) {
    this.imageData.splice(i, 1);
  }
  createBranch(branchData) {
    this.saveLoading = true;
    const fd = new FormData();
    fd.append('name',branchData.name);
    fd.append('nameAr',branchData.nameAr);
    fd.append('address',branchData.address);
    fd.append('addressAr',branchData.addressAr);
    fd.append('description',branchData.description);
    fd.append('descriptionAr',branchData.descriptionAr);
    fd.append('selectedUserId',branchData.selectedUserId); 
    fd.append('lat',branchData.lat);
    fd.append('lng',branchData.lng);
    fd.append('status',branchData.status); 
    fd.append('removedImages', JSON.stringify(this.removedImages));


    if (this.branchForm.value.branchImages.length == 0) {
      fd.append('branchImages', null);
    } else {
      this.branchForm.value.branchImages.map(
        (rI, i) => { 
          if(!rI.path){
            fd.append('branchImages', rI, rI.name);
          } 
        }
      );
    }
    this.service.updateBranch(this.route.snapshot.paramMap.get('id'), fd).subscribe(res => {
      console.log(res);
      this.toastr.success("Update Successfully!!!");
      this.saveLoading = false;
      this.router.navigate(['/branches']);
    }, err => {
      this.toastr.error(err);
    })
  }
}
