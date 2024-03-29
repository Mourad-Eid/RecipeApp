import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router) { }

    get email(){
      return this.credentials.get('email');
    }

    get password(){
      return this.credentials.get('password');
    }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  async register()
  {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const user = await this.auth.register(this.credentials.value);
    await loading.dismiss();
    if(user)
    {
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }
    else {
      this.showAlert('Registeration failed', 'Please try again');
    }
  }

  async login()
  {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const user = await this.auth.login(this.credentials.value);
    await loading.dismiss();
    if(user)
    {
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }
    else {
      this.showAlert('Login failed', 'Please try again');
    }
  }

  async showAlert(header, message)
  {
    const alear = await this.alertCtrl.create({
    header,
    message,
    buttons: ['OK']
    });
    await alear.present();
  }

}
