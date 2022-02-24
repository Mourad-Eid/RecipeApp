import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../../services/languages.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  selectedLanguage = '';
  constructor(private languageService: LanguagesService, private translateService: TranslateService) { }

  changeLanguage(lang)
  {
    this.selectedLanguage =lang.detail.value;
    this.languageService.setLanguage(this.selectedLanguage);
  }

  getLanguageService(){
    return this.languageService;
  }
  ngOnInit() {
    this.selectedLanguage=this.languageService.getCurrentLanguage();
  }

}
