import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAddonComponent } from './update-addon.component';

describe('UpdateAddonComponent', () => {
  let component: UpdateAddonComponent;
  let fixture: ComponentFixture<UpdateAddonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAddonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAddonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
