import { Component, Inject, inject, NgZone, OnInit, PLATFORM_ID} from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  providers: [ScrollService],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private readonly scrollService: ScrollService){}

  public ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.scrollService.scrollToTop();
    }    
  }

}
