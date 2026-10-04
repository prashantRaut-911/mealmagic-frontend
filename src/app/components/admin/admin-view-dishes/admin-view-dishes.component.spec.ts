import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewDishesComponent } from './admin-view-dishes.component';

describe('AdminViewDishesComponent', () => {
  let component: AdminViewDishesComponent;
  let fixture: ComponentFixture<AdminViewDishesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewDishesComponent]
    });
    fixture = TestBed.createComponent(AdminViewDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
