import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  public images: string[] = [
    '../../../../assets/img/carrousel/pic_1.jpg',
    '../../../../assets/img/carrousel/pic_2.jpg',
    '../../../../assets/img/carrousel/pic_3.jpg',
    '../../../../assets/img/carrousel/pic_4.jpg',
    '../../../../assets/img/carrousel/pic_5.jpg',
    '../../../../assets/img/carrousel/pic_6.jpg',
    '../../../../assets/img/carrousel/pic_7.jpg',
    '../../../../assets/img/carrousel/pic_8.jpg',
    '../../../../assets/img/carrousel/pic_9.jpg',
    '../../../../assets/img/carrousel/pic_10.jpg',
    '../../../../assets/img/carrousel/pic_11.jpg',
    '../../../../assets/img/carrousel/pic_12.jpg',
    '../../../../assets/img/carrousel/pic_17.jpg',
    '../../../../assets/img/carrousel/pic_18.jpg',
    '../../../../assets/img/carrousel/pic_13.jpg',
    '../../../../assets/img/carrousel/pic_14.jpg',
    '../../../../assets/img/carrousel/pic_15.jpg',
    '../../../../assets/img/carrousel/pic_16.jpg',
  ];

  public currentIndex = Math.floor(Math.random() * this.images.length - 1);

  public next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  public prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
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
}
