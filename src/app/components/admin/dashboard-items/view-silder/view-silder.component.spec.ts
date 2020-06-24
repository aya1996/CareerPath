import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSilderComponent } from './view-silder.component';

describe('ViewSilderComponent', () => {
  let component: ViewSilderComponent;
  let fixture: ComponentFixture<ViewSilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
