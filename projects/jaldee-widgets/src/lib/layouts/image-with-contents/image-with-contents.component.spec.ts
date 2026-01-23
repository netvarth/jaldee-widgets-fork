import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWithContentsComponent } from './image-with-contents.component';

describe('ImageWithContentsComponent', () => {
  let component: ImageWithContentsComponent;
  let fixture: ComponentFixture<ImageWithContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageWithContentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageWithContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



