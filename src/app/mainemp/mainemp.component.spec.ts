import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainempComponent } from './mainemp.component';

describe('MainempComponent', () => {
  let component: MainempComponent;
  let fixture: ComponentFixture<MainempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
