import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit, OnDestroy {

  public currentIndex = 0;
  public isAnimating = false;
  public autoPlayInterval: any;

  public images: string[] = [
    'assets/img/carrousel/pic_1.jpg',
    'assets/img/carrousel/pic_2.jpg',
    'assets/img/carrousel/pic_3.jpg',
    'assets/img/carrousel/pic_4.jpg',
    'assets/img/carrousel/pic_5.jpg',
    'assets/img/carrousel/pic_6.jpg',
    'assets/img/carrousel/pic_7.jpg',
    'assets/img/carrousel/pic_8.jpg',
    'assets/img/carrousel/pic_9.jpg',
    'assets/img/carrousel/pic_10.jpg',
    'assets/img/carrousel/pic_11.jpg',
    'assets/img/carrousel/pic_12.jpg',
    'assets/img/carrousel/pic_13.jpg',
    'assets/img/carrousel/pic_14.jpg',
    'assets/img/carrousel/pic_15.jpg',
    'assets/img/carrousel/pic_16.jpg',
    'assets/img/carrousel/pic_17.jpg',
    'assets/img/carrousel/pic_18.jpg',
  ];

  public ngOnInit():void{
    this.currentIndex = Math.floor(Math.random() * (this.images.length - 1));
    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    }
  }

  public ngOnDestroy(): void {
    if(this.autoPlayInterval){
      clearInterval(this.autoPlayInterval);
    }
  }

  public next(): void {
    console.log('Next button clicked, current index:', this.currentIndex);
    if (this.isAnimating) {
      console.log('Animation in progress, skipping');
      return;
    }

    this.isAnimating = true;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    console.log('New index:', this.currentIndex);

    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  public prev(): void {
    console.log('Prev button clicked, current index:', this.currentIndex);
    if (this.isAnimating) {
      console.log('Animation in progress, skipping');
      return;
    }

    this.isAnimating = true;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    console.log('New index:', this.currentIndex);

    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  public getClass(index: number): string {
    const diff =
      (index - this.currentIndex + this.images.length) % this.images.length;

    if (diff === 0) return 'big';
    if (diff === 1) return 'medium mdright';
    if (diff === this.images.length - 1) return 'medium mdleft';
    if (diff === 2) return 'small smallRight';
    if (diff === this.images.length - 2) return 'small smallLeft';

    return '';
  }

  private startAutoPlay(){
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 5000)
  }


}
