import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/variables/user';
import { UsersService } from '../../users/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'customers-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  user: User;
  uploadedFile: File;
  imageData: any;
  saveLoading: boolean = false; 
  constructor(  private service: UsersService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.user = new User();
    this.service.getUser(this.route.snapshot.paramMap.get('id')).subscribe(res=>{
      this.user = res;
    })
    
  }
}
