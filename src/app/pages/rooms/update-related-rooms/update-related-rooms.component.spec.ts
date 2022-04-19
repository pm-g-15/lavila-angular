import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRelatedRoomsComponent } from './update-related-rooms.component';

describe('UpdateRelatedRoomsComponent', () => {
  let component: UpdateRelatedRoomsComponent;
  let fixture: ComponentFixture<UpdateRelatedRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRelatedRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRelatedRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
