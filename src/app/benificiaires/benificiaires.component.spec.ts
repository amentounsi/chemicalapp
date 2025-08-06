import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenificiairesComponent } from './benificiaires.component';

describe('BenificiairesComponent', () => {
  let component: BenificiairesComponent;
  let fixture: ComponentFixture<BenificiairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenificiairesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenificiairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
