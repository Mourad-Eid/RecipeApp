import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesFromCardsPageRoutingModule } from './recipes-from-cards-routing.module';

import { RecipesFromCardsPage } from './recipes-from-cards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipesFromCardsPageRoutingModule
  ],
  declarations: [RecipesFromCardsPage]
})
export class RecipesFromCardsPageModule {}
