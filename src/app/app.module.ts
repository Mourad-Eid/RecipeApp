import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {IonicStorageModule } from '@ionic/storage-angular';
import { LanguagesService } from './services/languages.service';
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function createTranslateLoader(http: HttpClient)
{
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
      IonicStorageModule.forRoot(),
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
     })
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, LanguagesService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor( private languageService: LanguagesService){
    this.initializeApp();
  }
  initializeApp()
  {
    this.languageService.setInitialAppLanguage();
  }
}
