import { Component, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly router = inject(Router);

  public isMenuOpen = false;

  public constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => (this.isMenuOpen = false));
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    this.isMenuOpen = false;

    if (sectionId === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (this.router.url === '/' || this.router.url === '') {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 80, // 80 is the height of the navbar
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      this.router.navigate(['/'], { fragment: sectionId });
    }
  }

  public navigateHome(event: Event): void {
    event.preventDefault();

    this.router.navigate(['']);
  }
}
