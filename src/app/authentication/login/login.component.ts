import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/variables/login';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login: Login;

  constructor(private toastr: ToastrService,private authService:AuthenticationService,private router:Router) { }
  ngOnInit() {
    this.login = new Login();
    this.loginForm = new FormGroup({
      'email': new FormControl(this.login.email, [
        Validators.required,
        Validators.minLength(4)
      ]),
      'password': new FormControl(this.login.password, Validators.required)
    });

  }
  submitLogin(loginData){
    this.authService.login(loginData).subscribe(res=>{
      console.log(res);
      sessionStorage.setItem('auth','true');
      this.toastr.success("Login Successfull!!!");
      this.router.navigate(['/dashboard']);
    },err=>{
      this.toastr.error(err); 
    })
  }
}
