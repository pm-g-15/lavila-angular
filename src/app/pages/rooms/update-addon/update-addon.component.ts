import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Addon } from 'src/app/variables/addon';
import { ToastrService } from 'ngx-toastr';
import { RoomsService } from '../rooms.service';
import { env } from 'src/app/variables/env';

@Component({
  selector: 'rooms-update-addon',
  templateUrl: './update-addon.component.html',
  styleUrls: ['./update-addon.component.scss']
})
export class UpdateAddonComponent implements OnInit {

  addons = [];
  suggestedAddons = [];
  addonForm: FormGroup;
  addon: Addon = null;
  saveLoading: boolean = false;
  chooseAddonLoading: boolean = false;
  saveChooseLoading: boolean = false;
  imageData: any;
  imageUrl = env.apiURL;
  selectedAddon:number = null;
  removedAddonIndex:number = null;
  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private service: RoomsService) { }

  ngOnInit() {
    this.addon = new Addon();
    this.service.getAddons(this.route.snapshot.paramMap.get('roomId')).subscribe(adRes=>{
      this.addons = adRes;
      this.addonForm = new FormGroup({
        'name': new FormControl(this.addon.name, Validators.required),
        'nameAr': new FormControl(this.addon.nameAr ),
        'description': new FormControl(this.addon.description, Validators.required),
        'descriptionAr': new FormControl(this.addon.descriptionAr ),
        'price': new FormControl(this.addon.price, Validators.required),
        'roomAddonImages': new FormControl(this.addon.image, Validators.required),
        'multiple': new FormControl(this.addon.multiple, Validators.required),
      })
    }) 
  }
  openModal(contentModal) {
    this.modalService.open(contentModal, { size: 'lg' });
  }
  openChooseModal(contentModal) {
    this.chooseAddonLoading = true;
    this.service.getUniqueAddons().subscribe(res=>{
      this.suggestedAddons = res;
      this.modalService.open(contentModal, { size: 'lg' });
      this.chooseAddonLoading = false;
    })
  }
  changeFile(value) {
    console.log(value);
    this.addon.image = value;
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
  saveAddon() {
    this.saveLoading = true;
    const fd = new FormData();
    fd.append('name', this.addonForm.value.name);
    fd.append('nameAr', this.addonForm.value.nameAr);
    fd.append('description', this.addonForm.value.description);
    fd.append('descriptionAr', this.addonForm.value.descriptionAr);
    fd.append('price', this.addonForm.value.price);
    fd.append('multiple', this.addonForm.value.multiple);
    fd.append('roomId', this.route.snapshot.paramMap.get('roomId'));
    if (this.addon.image == null) {
      fd.append('roomAddonImages', null);
    } else {
      fd.append('roomAddonImages', this.addon.image, this.addon.image.name);
    }
    this.service.createRoomAddon(fd).subscribe(res => {
      this.service.getAddons(this.route.snapshot.paramMap.get('roomId')).subscribe(adRes=>{
        
        this.toastr.success('Room Addon Create Successfully..!!');
        this.addon = new Addon();
        this.addonForm = new FormGroup({
          'name': new FormControl(this.addon.name, Validators.required),
          'nameAr': new FormControl(this.addon.nameAr),
          'description': new FormControl(this.addon.description, Validators.required),
          'descriptionAr': new FormControl(this.addon.descriptionAr),
          'price': new FormControl(this.addon.price, Validators.required),
          'roomAddonImages': new FormControl(this.addon.image, Validators.required),
          'multiple': new FormControl(this.addon.multiple, Validators.required),
        });
        this.imageData = null;
        this.saveLoading = false;
        this.addons = adRes;
        this.modalService.dismissAll();
      })
    }, err => {
      this.saveLoading = false;
      this.toastr.error('Room Addon Create Failed, Please try again later..!!');
    });
  }
  changeChooseAddon(i){
    console.log(i);
    this.selectedAddon = i;
  }
  createChooseAddon() {
    this.saveChooseLoading = true;
    let data = {
      name:this.suggestedAddons[this.selectedAddon].name,
      nameAr:this.suggestedAddons[this.selectedAddon].nameAr,
      description:this.suggestedAddons[this.selectedAddon].description,
      descriptionAr:this.suggestedAddons[this.selectedAddon].descriptionAr,
      price:this.suggestedAddons[this.selectedAddon].price,
      multiple:this.suggestedAddons[this.selectedAddon].multiple,
      roomId:this.route.snapshot.paramMap.get('roomId'),
      image:this.suggestedAddons[this.selectedAddon].image,
    }
    this.service.createChooseRoomAddon(data).subscribe(res => { 
      this.service.getAddons(this.route.snapshot.paramMap.get('roomId')).subscribe(adRes=>{
        this.toastr.success('Room Addon Create Successfully..!!');
        this.saveChooseLoading = false;
        this.addons = adRes;
        this.modalService.dismissAll();
      })
    }, err => {
      this.saveLoading = false;
      this.toastr.error('Room Addon Create Failed, Please try again later..!!');
    });
  }
  removeAddon(id,i){
    this.removedAddonIndex = i;
    this.service.deleteAddon(id).subscribe(res=>{
      this.toastr.success('Room Addon Delete Successfully!!');
      this.addons.splice(i, 1);
      this.removedAddonIndex = null;
    },err=>{
      this.toastr.error('Room Addon Delete Failed, Please try again later..!!');
    })
  }
}
