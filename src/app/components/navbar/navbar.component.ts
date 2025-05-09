import { Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink
} from '@angular/router';
import { debounceTime, filter, fromEvent, Subscription, throttleTime } from 'rxjs';
import { ScrollService } from '../../services/scroll.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NAVBAR_HEIGHT } from '../../application.constants';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  providers: [ScrollService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly scrollService = inject(ScrollService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  
  public isMenuOpen = false;
  public activeSection = 'home';
  
  private scrollListener: any;
  private sections: string[] = ['home', 'services', 'gallery', 'contact'];
  private sectionOffsets: { [key: string]: number } = {};
  private routerSubscription: Subscription | undefined;
  
  public constructor() {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isMenuOpen = false;
        
        const urlParts = event.url.split('#');
        const fragment = urlParts.length > 1 ? urlParts[1] : null;
        
        if (event.url === '/' || event.url === '') {
          this.activeSection = fragment || 'home';
        } else if (event.url.startsWith('/about')) {
          this.activeSection = 'about';
        }
      });
  }
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.calculateSectionOffsets(), 500);
      
      this.scrollListener = fromEvent(window, 'scroll')
        .pipe(throttleTime(100)) 
        .subscribe(() => this.detectActiveSection());
      
      fromEvent(window, 'resize')
        .pipe(debounceTime(250)) 
        .subscribe(() => this.calculateSectionOffsets());
    }
  }
  
  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    
    if (this.scrollListener) {
      this.scrollListener.unsubscribe();
    }
  }
  
  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  public scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    this.isMenuOpen = false;
    
    if (sectionId === 'home') {
      this.activeSection = 'home';
    } else {
      this.activeSection = sectionId;
    }
    
    if (this.router.url === '/' || this.router.url === '') {
      this.scrollService.scrollToSection(sectionId);
    } else {
      this.scrollService.navigateToSectionOnPage('/', sectionId);
    }
  }
  
  public navigateHome(event: Event): void {
    event.preventDefault();
    this.activeSection = 'home';
    this.router.navigate(['']);
  }
  
  private calculateSectionOffsets(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    this.sectionOffsets = {};
    
    this.sectionOffsets['home'] = 0;
    
    for (const section of this.sections.slice(1)) {
      const element = this.document.getElementById(section);
      if (element) {
        this.sectionOffsets[section] = element.offsetTop - NAVBAR_HEIGHT;
      }
    }
    
    this.detectActiveSection();
  }
  
  private detectActiveSection(): void {
    if (!isPlatformBrowser(this.platformId) || 
        this.router.url.startsWith('/about')) {
      return;
    }
    
    const scrollPosition = window.scrollY + NAVBAR_HEIGHT + 10;
    
    for (const section of this.sections) {
      const offset = this.sectionOffsets[section];
      const nextSectionIndex = this.sections.indexOf(section) + 1;
      const nextSection = this.sections[nextSectionIndex];
      const nextOffset = nextSection ? this.sectionOffsets[nextSection] : Infinity;
      
      if (scrollPosition >= offset && scrollPosition < nextOffset) {
        this.activeSection = section;
        break;
      }
    }
  }
}