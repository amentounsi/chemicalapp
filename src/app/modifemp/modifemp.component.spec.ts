import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifempComponent } from './modifemp.component';

describe('ModifempComponent', () => {
  let component: ModifempComponent;
  let fixture: ComponentFixture<ModifempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
