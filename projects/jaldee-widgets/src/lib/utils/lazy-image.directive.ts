import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[lazyImage]',
  standalone: true
})
export class LazyImageDirective implements OnInit {
  @Input('lazyImage') imageSrc!: string;
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage();
          this.observer.unobserve(this.el.nativeElement);
        }
      });
    }, {
      rootMargin: '300px'
    });

    this.observer.observe(this.el.nativeElement);
  }

  private loadImage() {
    const img = new Image();
    img.onload = () => {
      this.el.nativeElement.src = this.imageSrc;
      this.el.nativeElement.classList.add('loaded');
    };
    img.src = this.imageSrc;
  }
}
