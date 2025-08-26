import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]'
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const element = this.host.nativeElement;
    element.classList.add('reveal');

    // If already in view on load, trigger immediately for entry animation
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    const rect = element.getBoundingClientRect();
    if (rect.top < viewportH && rect.bottom > 0) {
      // Delay a tick to allow initial paint, so animation is visible
      setTimeout(() => element.classList.add('active'), 60);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.classList.add('active');
            // Once revealed, unobserve to avoid retrigger spam
            this.observer?.unobserve(element);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}


