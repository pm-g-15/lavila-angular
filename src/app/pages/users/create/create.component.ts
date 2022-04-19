import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/variables/user';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  uploadedFile: File  = null;
  imageData: any;
  saveLoading: boolean = false;
  constructor(private toastr: ToastrService, private service: UsersService, private router: Router) { }

  ngOnInit() {
    this.user = new User();
    this.userForm = new FormGroup({
      'fName': new FormControl(this.user.fName, Validators.required),
      'lName': new FormControl(this.user.lName, Validators.required),
      'phone': new FormControl(this.user.phone, Validators.required),
      'email': new FormControl(this.user.email, Validators.required),
      // 'profileImage': new FormControl(this.user.image, Validators.required),
      'password': new FormControl(this.user.password, Validators.required),
      'status': new FormControl(this.user.status, Validators.required)
    });
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
    if( this.uploadedFile != null){
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
    console.log(fd);
    this.service.createUser(fd).subscribe(res=>{
      this.toastr.success('User Create Successfully..!!');
      this.saveLoading = false;
      this.router.navigate(['/users']);
    },err=>{
      this.saveLoading = false;
      this.toastr.error('User Create Failed, Please try again later..!!');
    });
  }
}
