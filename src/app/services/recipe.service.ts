import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

 url = 'https://forkify-api.herokuapp.com/api/';
 searchResultString: string;
 searchResultsObj: any;
 idOfClickedItem: string;
 constructor( private http: HttpClient) {   }

  //searching data method
  searchData(recipeName: string): Observable<any>
  {
    return this.http.get(`${this.url}search?q=${recipeName}`).pipe
   (map(results =>{
     this.searchResultString = JSON.stringify(results);
     this.searchResultsObj = JSON.parse(this.searchResultString);
     return this.searchResultsObj.recipes;
   }));
  }

  getDetails(id: string){
   return this.http.get(`${this.url}get?rId=${id}`);
  }
}
