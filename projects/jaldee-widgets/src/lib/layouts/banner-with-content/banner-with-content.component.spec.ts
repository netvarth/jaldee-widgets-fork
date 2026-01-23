import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerWithContentComponent } from './banner-with-content.component';

describe('BannerWithContentComponent', () => {
  let component: BannerWithContentComponent;
  let fixture: ComponentFixture<BannerWithContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerWithContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerWithContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



