import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NAVBAR_HEIGHT } from '../application.constants';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Service } from '../dtos';

@Injectable()
export class ScrollService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private document: Document, private readonly router: Router) {}

  public scrollToTop():void{
	if(isPlatformBrowser(this.platformId)){
		this.document.defaultView?.scroll(0,0);
	}
  }

  public scrollToSection(
    sectionId: string,
    navbarHeight: number = NAVBAR_HEIGHT
  ): void {
	if(!isPlatformBrowser(this.platformId)){
		return;
	}

    if (sectionId === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - navbarHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  }

  public navigateToSectionOnPage(route: string, fragment: string): void {
    if (
      this.router.url.split('#')[0] === route ||
      (this.router.url === '/' && route === '/')
    ) {
      this.scrollToSection(fragment);
    } else {
      this.router.navigate([route], { fragment: fragment });
    }
  }
}
