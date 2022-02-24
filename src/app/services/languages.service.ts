import { Injectable } from '@angular/core';
import {TranslateService } from '@ngx-translate/core';
import {IonicStorageModule, Storage} from '@ionic/storage-angular';
import {Platform} from '@ionic/angular';

const LNG_KEY ='SELECTED_LANGUAGE';
@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  selectedLang = '';
  textDir = 'ltr';
  menuDir = 'start';
 // private dataStorage: Storage | null = null;

  constructor(private translate: TranslateService, private platform: Platform) {
   // this.storageInit();
   }

   languageInit() {
    this.translate.setDefaultLang(this.getAppDefaultLanguage());
  }
  //functions
  getAppDefaultLanguage()
  {
    if (this.selectedLang === '') {
      this.selectedLang = 'ar';
      this.setLanguage('ar');
    }
   else{
    /*this.dataStorage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selectedLang = val;
      }
    });*/
  }
    return this.selectedLang;
  }

  setLanguage(lng: string) {
    this.translate.use(lng);
    this.selectedLang = lng;
    //this.dataStorage.set(LNG_KEY, lng);
    this.updateDir(lng);
  }

  getCurrentLanguage(){
    return this.selectedLang;
  }
  getLanguages(){
    return [
      {text: 'English', value: 'en'},
      {text: 'Arabic', value: 'ar'}
    ];
  }

  private updateDir(lang) {
    this.textDir = (lang === 'ar') ? 'rtl' : 'ltr';
    this.menuDir = (lang === 'ar') ? 'end' : 'start';
  }

  /* async storageInit()
  {
    const storage = await this.storage.create();
    this.dataStorage = storage;
  }*/


}
