import {
  Component,
  input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  // currentLang: string = 'English (US)';
  // currentSrc: string = '/images/EN.png';
  // currentAlt: string = 'English language';

  currentLang: WritableSignal<string> = signal('English (US)');
  currentSrc: WritableSignal<string> = signal('/images/EN.png');
  currentAlt: WritableSignal<string> = signal('English language');

  currentLan(e: MouseEvent): void {
    console.log(e.target);
  }

  isLogin = input<boolean>(true);

  // isDarkMode: boolean = false;
  isDarkMode: WritableSignal<boolean> = signal(false);

  ngOnInit() {
    this.isDarkMode.set(localStorage.getItem('darkMode') === 'true');
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    }
  }

  toggleDarkMode() {
    this.isDarkMode.set(!this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode.toString());

    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
