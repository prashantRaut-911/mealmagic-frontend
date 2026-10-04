import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyReviewComponent } from './user-my-review.component';

describe('UserMyReviewComponent', () => {
  let component: UserMyReviewComponent;
  let fixture: ComponentFixture<UserMyReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMyReviewComponent]
    });
    fixture = TestBed.createComponent(UserMyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
