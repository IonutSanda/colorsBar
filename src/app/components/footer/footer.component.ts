import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FB_LINK, IG_LINK, MAIL } from '../../application.constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly router = inject(Router);
  public readonly igLink = IG_LINK;
  public readonly fbLink = FB_LINK;
  public readonly mailToColors = `mailTo:${MAIL}`

  public currentYear = new Date().getFullYear();

  public construct() {}

  public scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();

    if (this.router.url === '/' || this.router.url === '') {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 80, //80 is the height of the navbar,
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      this.router.navigate(['/'], { fragment: sectionId });
    }
  }
}
