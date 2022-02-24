import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  results: Observable<any>;
  searchTerm = '';
  idFromSearch = {
    id: ''
  };
  listClicked = {
    id: ''
  };

  //queries
  // eslint-disable-next-line max-len
  queries: string[] = ['carrot','broccoli','asparagus','cauliflower','corn','cucumber','green pepper',
  'lettuce','mushrooms','onion','potato','pumpkin','red pepper','tomato','beetroot','brussel sprouts',
  'peas','zucchini','radish','sweet potato','artichoke','leek','cabbage','celery','chili','garlic',
  'basil','coriander','parsley','dill','rosemary','oregano','cinnamon','saffron','green bean','bean',
  'chickpea','lentil','apple','apricot','avocado','banana','blackberry','blackcurrant','blueberry',
  'boysenberry','cherry','coconut','fig','grape','grapefruit','kiwifruit','lemon','lime','lychee',
  'mandarin','mango','melon','nectarine','orange','papaya','passion fruit','peach','pear','pineapple',
  'plum','pomegranate','quince','raspberry','strawberry','watermelon','salad','pizza','pasta','popcorn',
  'lobster','steak','bbq','pudding','hamburger','pie','cake','sausage','tacos','kebab','poutine','seafood',
  'chips','fries','masala','paella','som tam','chicken','toast','marzipan','tofu','ketchup','hummus',
  'chili','maple syrup','parma ham','fajitas','champ','lasagna','poke','chocolate','croissant','arepas',
  'bunny chow','pierogi','donuts','rendang','sushi','ice cream','duck','curry','beef','goat','lamb',
  'turkey','pork','fish','crab','bacon','ham','pepperoni','salami','ribs'];


  constructor(private recipeService: RecipeService, private router: Router) { }

  searchChanged(event){
    const search =this.getPotentialQueries(this.searchTerm);
    if(search?.length !==0)
    {
      this.results = this.recipeService.searchData(search);
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

  passRecipeFromCard(id: string)
  {
    this.listClicked.id = id;
    const navExtras: NavigationExtras = {
      state: {
        idFromCardClick: this.listClicked
      }
    };
    this.router.navigate(['recipes-from-cards'], navExtras);
  }

  getPotentialQueries(s: string){
    for (const x of this.queries)
    {
      if(s !== '')
      {
        let i;
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for(i =0; i< s.length; i++)
        {
          if(x[i] !== s[i]){
            break;
          }
        }
        if(i===s.length)
        {
          return x;
        }
      }
      }
    }

}
