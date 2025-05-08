import { Component, OnInit } from '@angular/core';
import { NAVBAR_HEIGHT } from '../../application.constants';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  public title = 'Colors';
  public tagline =
    'Experience premium ice delivery and professional mobile bar services that transform ordinary gatherings into extraordinary celebrations. ';
  public isVisible = false;

  public ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }

  public scrollToServices(): void {
    const servicesSection = document.getElementById('services');

    if (servicesSection) {
      window.scrollTo({
        top: servicesSection.offsetTop - NAVBAR_HEIGHT,
        behavior: 'smooth',
      });
    }
  }
}
