import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoshowComponent } from './noshow.component';

describe('NoshowComponent', () => {
  let component: NoshowComponent;
  let fixture: ComponentFixture<NoshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
