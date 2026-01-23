import { Directive, ElementRef, EventEmitter, Output, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[lazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements AfterViewInit, OnDestroy {
  @Output() visible = new EventEmitter<boolean>();

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    console.log("Observer initialized for:", this.el.nativeElement.id);
    this.observer = new IntersectionObserver(
      ([entry]) => {
        console.log(`Observed ${entry.target.id}:`, entry.isIntersecting);
        if (entry.isIntersecting) {
          this.visible.emit(true);
          setTimeout(() => this.observer.disconnect(), 500); // Give some time before disconnecting
        }
      },
      { rootMargin: "100px", threshold: 0 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  
  ngOnDestroy() {
    this.observer?.disconnect();
  }
}