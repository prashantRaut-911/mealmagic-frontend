import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewReviewsComponent } from './admin-view-reviews.component';

describe('AdminViewReviewsComponent', () => {
  let component: AdminViewReviewsComponent;
  let fixture: ComponentFixture<AdminViewReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewReviewsComponent]
    });
    fixture = TestBed.createComponent(AdminViewReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
