import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appFadeIn]',
  standalone: true
})
export class FadeInDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private fallbackTimeout?: ReturnType<typeof setTimeout>;

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.opacity = '0';
    this.el.nativeElement.style.transform = 'translateY(20px)';
    this.el.nativeElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  }

  ngAfterViewInit() {
    // Fallback: ensure visibility after 2 seconds even if intersection doesn't trigger
    this.fallbackTimeout = setTimeout(() => {
      this.showElement();
    }, 2000);

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.showElement();
        }
      },
      { threshold: 0.05, rootMargin: '50px' }
    );
    this.observer.observe(this.el.nativeElement);
  }

  private showElement() {
    this.el.nativeElement.style.opacity = '1';
    this.el.nativeElement.style.transform = 'translateY(0)';
    this.observer?.disconnect();
    if (this.fallbackTimeout) {
      clearTimeout(this.fallbackTimeout);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    if (this.fallbackTimeout) {
      clearTimeout(this.fallbackTimeout);
    }
  }
}
