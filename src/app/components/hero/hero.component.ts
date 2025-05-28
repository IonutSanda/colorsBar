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
  }
}
