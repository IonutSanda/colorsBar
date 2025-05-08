import { Component, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  providers: [ScrollService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly scrollService = inject(ScrollService);

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

    if(this.router.url === '/' || this.router.url === ''){
      this.scrollService.scrollToSection(sectionId);
    } else {
      this.scrollService.navigateToSectionOnPage('/', sectionId);
    }
  }

  public navigateHome(event: Event): void {
    event.preventDefault();

    this.router.navigate(['']);
  }
}
