import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { recipeModel } from '../../Models/recipeModel';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  recipeDetails = null;
  receivedObj = null;
  model: recipeModel = new recipeModel();
  constructor(private activateRoute: ActivatedRoute,private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    if(this.router.getCurrentNavigation().extras.state)
    {
      this.receivedObj= this.router.getCurrentNavigation().extras.state.idFromSearch;
      this.recipeService.getDetails(this.receivedObj.id).subscribe(res =>
        {
          //console.log(res);
          this.recipeDetails = res;
          this.model.recipeImg = this.recipeDetails.recipe.image_url;
          this.model.publisher=this.recipeDetails.recipe.publisher;
          this.model.recipeTitle = this.recipeDetails.recipe.title;
          this.model.recipeSourceURL=this.recipeDetails.recipe.source_url;
          this.model.ingredients=this.recipeDetails.recipe.ingredients;
          //console.log(this.model);

        });
    }

    /*const id =this.activateRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.recipeService.getDetails(id).subscribe(res =>
    {
      console.log(res);
      this.recipeDetails=res;
      console.log(this.recipeDetails);
    });
    /*if(this.activateRoute.snapshot.data.special)
    {
      this.receivedId = this.activateRoute.snapshot.data.special;
      this.recipeService.getDetails(this.receivedId).subscribe(res =>
        {
          console.log(res);
          this.recipeDetails=res;
        });
    }

    /**/
  }

}
