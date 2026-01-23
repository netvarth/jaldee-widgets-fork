import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutCardsComponent } from './without-cards.component';

describe('WithoutCardsComponent', () => {
  let component: WithoutCardsComponent;
  let fixture: ComponentFixture<WithoutCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithoutCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithoutCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



