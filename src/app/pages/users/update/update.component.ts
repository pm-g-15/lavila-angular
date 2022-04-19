import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/variables/user';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { env } from 'src/app/variables/env';

@Component({
  selector: 'users-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  uploadedFile: File;
  imageData: any;
  saveLoading: boolean = false; 
  constructor(private toastr: ToastrService, private service: UsersService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.user = new User();
    this.service.getUser(this.route.snapshot.paramMap.get('id')).subscribe(res=>{
      this.user.fName = res.fName;
      this.user.lName = res.lName;
      this.user.phone = res.phone;
      this.user.email = res.email;
      this.user.image = null;
      this.user.status = res.status;
      this.imageData = res.image;
      console.log(this.user);
      this.userForm = new FormGroup({
        'fName': new FormControl(this.user.fName, Validators.required),
        'lName': new FormControl(this.user.lName, Validators.required),
        'phone': new FormControl(this.user.phone, Validators.required),
        'email': new FormControl(this.user.email, Validators.required),
        'status': new FormControl(this.user.status, Validators.required)
      }); 
      console.log(this.userForm);
    })
    
  }
  changeFile(value) {
    console.log(value);
    this.uploadedFile = value;
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
  createUser(value){
    this.saveLoading = true;
    const fd = new FormData();
    if( this.uploadedFile){
      fd.append('profileImage', this.uploadedFile, this.uploadedFile.name);
    }else{
      fd.append('profileImage', null);
    }
    fd.append('fName',this.userForm.value.fName);
    fd.append('lName',this.userForm.value.lName);
    fd.append('phone',this.userForm.value.phone);
    fd.append('email',this.userForm.value.email); 
    fd.append('password',this.userForm.value.password);
    fd.append('status',this.userForm.value.status); 
    console.log(this.userForm);
    this.service.updateUser(this.route.snapshot.paramMap.get('id'),fd).subscribe(res=>{
      this.toastr.success('User Update Successfully..!!');
      this.saveLoading = false;
      this.router.navigate(['/users']);
    },err=>{
      this.saveLoading = false;
      this.toastr.error('User Create Failed, Please try again later..!!');
    });
  }
}
