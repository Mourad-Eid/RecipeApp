import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { LanguagesService } from './services/languages.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private languageService: LanguagesService,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController) {}

  getLanguageService(){
    return this.languageService;
  }

  getAuthService(){
    return this.authService;
  }

  async logout()
  {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.authService.logout();
    await loading.dismiss();
    this.router.navigateByUrl('/login');
    }
}
