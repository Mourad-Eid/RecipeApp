import { Injectable } from '@angular/core';
import {TranslateService } from '@ngx-translate/core';
import {IonicStorageModule, Storage} from '@ionic/storage-angular';

const LNG_KEY ='SELECTED_LANGUAGE';
@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  selected ='';
  //private dataStorage: Storage | null = null;

  constructor(private translate: TranslateService) {
   // this.storageInit();
   }

  //functions
  setInitialAppLanguage()
  {
    const language =this.translate.getBrowserLang();
    this.translate.setDefaultLang('ar');
    console.log(language);
    /*this.dataStorage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });*/
  }

  setLanguage(lng: string) {
    this.translate.use(lng);
    this.selected = lng;
    //this.dataStorage?.set(LNG_KEY, lng);
  }

  getLanguages(){
    return [
      {text: 'English', value: 'en'},
      {text: 'Arabic', value: 'ar'}
    ];
  }
  /* async storageInit()
  {
    const storage = await this.storage.create();
    this.dataStorage = storage;
  }*/
}
