import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSilderComponent } from './add-silder.component';

describe('AddSilderComponent', () => {
  let component: AddSilderComponent;
  let fixture: ComponentFixture<AddSilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
