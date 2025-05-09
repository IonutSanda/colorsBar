import { ServiceTheme } from './../../services/theme.service';
import { Component, inject } from '@angular/core';
import { Service } from '../../dtos';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {

  private readonly themeService = inject(ThemeService);

  public services: Service[] = [
    {
      title: 'Juice Bar',
      description:
        'Juice bar description Juice bar descriptionJuice bar descriptionJuice bar descriptionJuice bar description',
      image: 'assets/img/carrousel/pic_17.jpg',
    },
    {
      title: 'Cocktail Bar',
      description:
        'Juice bar description Juice bar descriptionJuice bar descriptionJuice bar descriptionJuice bar description',
      image: 'assets/img/carrousel/pic_17.jpg',
    },
    {
      title: 'Coffee Bar',
      description:
        'Juice bar description Juice bar descriptionJuice bar descriptionJuice bar descriptionJuice bar description',
      image: 'assets/img/carrousel/pic_17.jpg',
    },
    {
      title: 'Ice delivery',
      description:
        'Juice bar description Juice bar descriptionJuice bar descriptionJuice bar descriptionJuice bar description',
      image: 'assets/img/carrousel/pic_17.jpg',
    },
    {
      title: 'Logistics',
      description:
        'Juice bar description Juice bar descriptionJuice bar descriptionJuice bar descriptionJuice bar description',
      image: 'assets/img/carrousel/pic_17.jpg',
    },
  ];

  public getServiceClass(title: string): string{
    const lowerCaseTitle = title.toLocaleLowerCase().replace(/\s+/g, '-');
  
    return `service-btn-${lowerCaseTitle}`;
  }

  public handleLearnMore(service: Service): void{
    const serviceTitle = service.title.toLocaleLowerCase().replace(/\s+/g, '-') as ServiceTheme;

    this.themeService.setTheme(serviceTitle);
  }
}
