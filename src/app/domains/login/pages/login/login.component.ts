import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  socialButtons = [
    { label: 'Google', image: '/images/logo/google-logo.5867462c.svg' },
    { label: 'Microsoft', image: '/images/logo/microsoft-logo.c73d8dca.svg' },
    { label: 'Apple', image: '/images/logo/apple-logo.54e0d711.svg' },
    { label: 'Slack', image: '/images/logo/slack-logo.5d730c10.svg' },
  ];
}
