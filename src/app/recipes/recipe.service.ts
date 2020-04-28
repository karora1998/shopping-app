import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
	// recipeSelected = new EventEmitter<Recipe>(); 
  recipesChanged = new Subject<Recipe[]>();

	// private recipes: Recipe[] = [
 //  	new Recipe('Chilli Paneer', 'A super tasty paneer - just awesome!', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',[new Ingredient('Paneer', 1), new Ingredient('Onion', 2)]),
	// new Recipe('Chilli Paneer', 'A super tasty paneer - just awesome!', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',[new Ingredient('Paneer', 1), new Ingredient('Onion', 2)])
 //  	];

    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

  	getRecipes(): Recipe[] {
  		return this.recipes.slice();
  	}

    getRecipe(id: number) {
      return this.recipes[id];
    }

  	constructor (private shoppingListService: ShoppingListService) { }

  	addIngredientsToShoppingList(ingredients: Ingredient[]) {
  		this.shoppingListService.addIngredients(ingredients);
  	}

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
      this.recipes[index] = recipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}