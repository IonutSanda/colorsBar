import { ContactInfo } from './../../dtos/dtos';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, Input, OnInit } from '@angular/core';
import { ServiceTheme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  private readonly themeService = inject(ThemeService);

  @Input() theme?: ServiceTheme;
  @Input() width: number = 240;
  @Input() height: number = 100;

  public dotColor: string = '#000000';
  public bottomText: string = ''; 

  constructor(){
    this.updateLogo();

    if(!this.theme){
      effect(() => {
        const currentTheme = this.themeService.getCurrentTheme();
        this.theme = currentTheme;
        this.updateLogo();
      })
    } else {
      this.updateLogo();
    }
  }

  public updateLogo():void{
    const currentTheme = this.theme || this.themeService.getCurrentTheme();
  
    this.dotColor = this.themeService.themeColors[currentTheme];

    switch(currentTheme) {
      case 'juice-bar':
        this.bottomText = 'JUICE';
        break;
      case 'cocktail-bar':
        this.bottomText = 'COCKTAIL BAR';
        break;
      case 'coffee-bar':
        this.bottomText = 'COFFEE BAR';
        break;
      case 'ice-delivery':
        this.bottomText = 'ICE DELIVERY';
        break;
      case 'logistics':
        this.bottomText = 'LOGISTICS';
        break;
      default:
        this.bottomText = '';
        break;
    }
  };

}
