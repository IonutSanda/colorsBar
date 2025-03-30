import { Component } from '@angular/core';
import { Service } from '../../dtos';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
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
}
