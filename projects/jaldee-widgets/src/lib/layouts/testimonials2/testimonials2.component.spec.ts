import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonials2Component } from './testimonials2.component';

describe('Testimonials2Component', () => {
  let component: Testimonials2Component;
  let fixture: ComponentFixture<Testimonials2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonials2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testimonials2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



