import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
	recipeSelected = new EventEmitter<Recipe>(); 

	private recipes: Recipe[] = [
  	new Recipe('Chilli Paneer', 'A super tasty paneer - just awesome!', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',[new Ingredient('Paneer', 1), new Ingredient('Onion', 2)]),
	new Recipe('Chilli Paneer', 'A super tasty paneer - just awesome!', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',[new Ingredient('Paneer', 1), new Ingredient('Onion', 2)])
  	];

  	getRecipes(): Recipe[] {
  		return this.recipes.slice();
  	}

  	constructor (private shoppingListService: ShoppingListService) { }

  	addIngredientsToShoppingList(ingredients: Ingredient[]) {
  		this.shoppingListService.addIngredients(ingredients);
  	}
}