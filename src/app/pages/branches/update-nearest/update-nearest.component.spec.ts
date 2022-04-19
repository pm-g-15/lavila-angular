import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNearestComponent } from './update-nearest.component';

describe('UpdateNearestComponent', () => {
  let component: UpdateNearestComponent;
  let fixture: ComponentFixture<UpdateNearestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNearestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNearestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
