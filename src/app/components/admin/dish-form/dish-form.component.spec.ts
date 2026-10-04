import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishFormComponent } from './dish-form.component';

describe('DishFormComponent', () => {
  let component: DishFormComponent;
  let fixture: ComponentFixture<DishFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DishFormComponent]
    });
    fixture = TestBed.createComponent(DishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
