import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  computed,
  effect,
  inject,
  Inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';

export type ServiceTheme =
  | 'juice-bar'
  | 'cocktail-bar'
  | 'coffee-bar'
  | 'ice-delivery'
  | 'logistics'
  | 'default';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  private currentThemeSignal = signal<ServiceTheme>('default');

  public currentThemeColor = computed(
    () => this.themeColors[this.currentThemeSignal()]
  );
  public currentLogo = computed(
    () => this.logoMapping[this.currentThemeSignal()]
  );

  //TODO: remove these and import from styles.scss
  themeColors: Record<ServiceTheme, string> = {
    'juice-bar': '#f69e09',
    'cocktail-bar': '#e32d12',
    'coffee-bar': '#77411D',
    'ice-delivery': '#3d7577',
    logistics: '#bebec0',
    default: '#4a4a4a',
  };

  logoMapping: Record<ServiceTheme, string> = {
    'juice-bar': 'assets/img/logo-bg-free/colors-juicy-logo.png',
    'cocktail-bar': 'assets/img/logo-bg-free/colors-cocktail-logo.png',
    'coffee-bar': 'assets/img/logo-bg-free/colors-coffee-logo.png',
    'ice-delivery': 'assets/img/logo-bg-free/colors-ice-logo.png',
    logistics: 'assets/img/logo-bg-free/colors-logistics-logo.png',
    default: 'assets/img/logo.png',
  };

  constructor(@Inject(DOCUMENT) private document: Document) {
    effect(() => {
      const currentTheme = this.currentThemeSignal();
      const themeColor = this.currentThemeColor();

      if (isPlatformBrowser(this.platformId)) {
        this.document.documentElement.style.setProperty(
          '--primary-color',
          themeColor
        );

        if (currentTheme !== 'default') {
          localStorage.setItem('selectedTheme', currentTheme);
        } else {
          localStorage.removeItem('selectedTheme');
        }
      }
    });

    this.initializeTheme();
  }

  public setTheme(service: ServiceTheme): void {
    this.currentThemeSignal.set(service);
  }

  public getCurrentTheme(): ServiceTheme {
    return this.currentThemeSignal();
  }
  private initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem(
        'selectedTheme'
      ) as ServiceTheme | null;

      if (savedTheme && Object.keys(this.themeColors).includes(savedTheme)) {
        this.currentThemeSignal.set(savedTheme);
      }
    }
  }
}
