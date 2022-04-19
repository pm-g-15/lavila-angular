import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Banner } from 'src/app/variables/banner';
import { ToastrService } from 'ngx-toastr';
import { BannerService } from '../banner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'banner-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  bannerForm: FormGroup;
  banner: Banner; 
  imageData: any;
  saveLoading: boolean = false;
  constructor(private toastr: ToastrService, private service: BannerService, private router: Router) { }

  ngOnInit() {
    this.banner = new Banner();
    this.bannerForm = new FormGroup({
      // 'description': new FormControl(this.banner.description, Validators.required),
      'description': new FormControl(this.banner.description),
      'descriptionAr': new FormControl(this.banner.descriptionAr),
      'introBanner': new FormControl(this.banner.introBanner),
      'image': new FormControl(this.banner.image, Validators.required),
      'link': new FormControl(this.banner.link, Validators.required),
      'status': new FormControl(this.banner.status, Validators.required)
    });
  }
  changeFile(value) {
    console.log(value);
    this.bannerForm.controls['introBanner'].setValue(value);
    this.readURL(value);
  }
  readURL(input) {
    let that = this;
    if (input) {
      let reader = new FileReader();

      reader.onload = function (e) { 
        that.bannerForm.controls['image'].setValue(e.target['result']);
      }

      reader.readAsDataURL(input);
    }
  }
  createBanner(value){
    this.saveLoading = true;
    const fd = new FormData();
    if( value.introBanner != null){
      fd.append('introBanner', value.introBanner, value.introBanner.name);
    }else{
      fd.append('introBanner', null);
    }
    fd.append('description',value.description == null ? '' : value.description);
    fd.append('descriptionAr',value.descriptionAr == null ? '' : value.descriptionAr); 
    fd.append('link',value.link); 
    fd.append('status',value.status); 
    console.log(fd);
    this.service.createBanner(fd).subscribe(res=>{
      this.toastr.success('Banner Create Successfully..!!');
      this.saveLoading = false;
      this.router.navigate(['/banner']);
    },err=>{
      this.saveLoading = false;
      this.toastr.error('Banner Create Failed, Please try again later..!!');
    });
  }
}
