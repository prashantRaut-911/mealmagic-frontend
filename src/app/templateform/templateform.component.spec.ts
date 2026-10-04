import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateformComponent } from './templateform.component';

describe('TemplateformComponent', () => {
  let component: TemplateformComponent;
  let fixture: ComponentFixture<TemplateformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateformComponent]
    });
    fixture = TestBed.createComponent(TemplateformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
