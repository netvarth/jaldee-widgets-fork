import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemZoomCardComponent } from './item-zoom-card.component';

describe('ItemZoomCardComponent', () => {
  let component: ItemZoomCardComponent;
  let fixture: ComponentFixture<ItemZoomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemZoomCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemZoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




