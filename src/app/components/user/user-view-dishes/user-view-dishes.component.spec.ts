import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewDishesComponent } from './user-view-dishes.component';

describe('UserViewDishesComponent', () => {
  let component: UserViewDishesComponent;
  let fixture: ComponentFixture<UserViewDishesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewDishesComponent]
    });
    fixture = TestBed.createComponent(UserViewDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
