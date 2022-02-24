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
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideStorage,getStorage } from '@angular/fire/storage';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function createTranslateLoader(http: HttpClient)
{
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
     provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
     IonicStorageModule.forRoot(),
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
     }),
      provideAuth(() => getAuth()),
      provideDatabase(() => getDatabase()),
      provideStorage(() => getStorage()),
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, LanguagesService],
  bootstrap: [AppComponent],
})
export class AppModule {
  selectedLanguage = '';
  constructor( private languageService: LanguagesService){
    this.initializeApp();
  }
  initializeApp()
  {
    this.languageService.languageInit();
    this.selectedLanguage = this.languageService.getCurrentLanguage();
  }
}
