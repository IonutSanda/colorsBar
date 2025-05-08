import { Component, inject, OnInit } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServicesComponent } from '../../components/services/services.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ServicesComponent,
    CarouselComponent,
    ContactComponent,
  ],
  providers: [ScrollService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  private readonly route = inject(ActivatedRoute);
  private readonly scrollService = inject(ScrollService);

  public ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if(fragment){
        return this.scrollService.scrollToSection(fragment);
      }
    })
  }
}
