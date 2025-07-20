import { Component, inject, OnInit } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { NAVBAR_HEIGHT } from '../../application.constants';
import { ServiceTheme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {

  private readonly scrollService = inject(ScrollService);
  private readonly themeService = inject(ThemeService);

  public title = 'Colors';
  public tagline =
    'Experience premium ice delivery and professional mobile bar services that transform ordinary gatherings into extraordinary celebrations. ';
  public isVisible = false;

  public ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }

  public scrollToSection(event: Event,sectionId: string): void {
    event.preventDefault();

    const servicesSection = document.getElementById(sectionId);

    if(servicesSection){
      this.scrollService.scrollToSection(sectionId, NAVBAR_HEIGHT - 100);
    }
  }

  public setTheme(service: ServiceTheme):void{
    this.themeService.setTheme(service);
    
    // Scroll to the corresponding service card in services section
    setTimeout(() => {
      const serviceTitle = this.getServiceTitle(service);
      const serviceCards = document.querySelectorAll('.service-card');
      let targetCard: Element | null = null;
      
      serviceCards.forEach(card => {
        const cardTitle = card.querySelector('h3')?.textContent?.trim();
        if (cardTitle === serviceTitle) {
          targetCard = card;
        }
      });
      
      if (targetCard) {
        const cardElement = targetCard as HTMLElement;
        const offsetTop = cardElement.offsetTop - 120; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      } else {
        // Fallback: scroll to services section
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          const offsetTop = servicesSection.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
  }
  
  private getServiceTitle(service: ServiceTheme): string {
    switch (service) {
      case 'colors-juice':
        return 'Colors Juice';
      case 'cocktail-bar':
        return 'Cocktail Bar';
      case 'coffee-bar':
        return 'Coffee Bar';
      case 'ice-delivery':
        return 'Ice delivery';
      case 'bar-logistics':
        return 'Bar Logistics';
      default:
        return '';
    }
  }
}
