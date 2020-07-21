import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportcustomerComponent } from './reportcustomer.component';

describe('ReportcustomerComponent', () => {
  let component: ReportcustomerComponent;
  let fixture: ComponentFixture<ReportcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
