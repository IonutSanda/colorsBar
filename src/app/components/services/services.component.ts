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

  public isCollapsed = true;

  public services: Service[] = [
    {
      title: 'Colors Juice',
      description:
        'Sucuri premium, mereu proaspete si gata de utilizare. De la mixul nostru stabil de Lemon Juice pana la sucuri 100% fresh de lamaie,portocale si rodie produsele noastre sunt perfecte pentru cocktail-uri, limonade sau servire directa.',
      image: 'assets/img/carrousel/pic_18.jpg',
      isCollapsed: true
    },
    {
      title: 'Cocktail Bar',
      description:
        ' Spectacol si savoare in fiecare pahar. Cu un bar mobil complet echipat si mixologi profesionisti, aducem cocktail-uri spectaculoase si un vibe unic la orice eveniment.',
      image: 'assets/img/carrousel/pic_15.jpg',
      isCollapsed: true
    },
    {
      title: 'Coffee Bar',
      description:
        'Cafea premium la standarde profesionale, oriunde ai nevoie. Cu echipamente de top si ingrediente de calitate, oferim preparate aromate si o experienta eleganta la evenimentele tale.',
      image: 'assets/img/carrousel/pic_17.jpg',
      isCollapsed: true
    },
    {
      title: 'Ice delivery',
      description:
        'Gheata premium livrata direct la locatia ta. De la cuburi clasice si gheata pisata pana la gheata craft de dimensiuni speciale, oferim solutii complete pentru racire, inclusiv logistica cu congelatoare si thermobox-uri.',
      image: 'assets/img/carrousel/pic_4.jpg',
      isCollapsed: true
    },
    {
      title: 'Bar Logistics',
      description:
        'Solutii complete pentru logistica barului: baruri mobile, pahare de sticla, ustensile profesionale si echipamente de inchiriat. Tot ce ai nevoie pentru un bar functional si bine organizat.',
      image: 'assets/img/carrousel/pic_17.jpg',
      isCollapsed: true
    },
  ];
  
  public getServiceClass(title: string): string{
    const lowerCaseTitle = title.toLocaleLowerCase().replace(/\s+/g, '-');

    return `service-btn-${lowerCaseTitle}`;
  }

  public handleLearnMore(service: Service): void{
    const serviceTitle = service.title.toLocaleLowerCase().replace(/\s+/g, '-') as ServiceTheme;

    this.themeService.setTheme(serviceTitle);

    service.isCollapsed = !service.isCollapsed
  }
}
