import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { recipeModel } from '../../Models/recipeModel';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes-from-cards',
  templateUrl: './recipes-from-cards.page.html',
  styleUrls: ['./recipes-from-cards.page.scss'],
})
export class RecipesFromCardsPage implements OnInit {

  recipesSearched = null;
  receivedObj = null;
  idFromSearch ={
    id: ''
  };
  models: recipeModel[] = [];
  constructor(private activatedoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    if(this.router.getCurrentNavigation().extras.state)
    {
      this.receivedObj= this.router.getCurrentNavigation().extras.state.idFromCardClick;
      this.recipeService.searchData(this.receivedObj.id).subscribe(res =>
        {
          this.recipesSearched = res;
        });
      }
    }
    passID(id: string){
      this.idFromSearch.id = id;
      const navExtras: NavigationExtras = {
        state: {
          idFromSearch: this.idFromSearch
        }
      };
      this.router.navigate(['details'], navExtras);
    }
  }
