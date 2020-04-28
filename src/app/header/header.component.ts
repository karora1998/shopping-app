import { Component, Output, EventEmitter } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})

export class HeaderComponent{

	// @Output() clicked = new EventEmitter<{recipeVisible: boolean, shoppingVisible: boolean}>();

	// onRecipeClicked(){
	// 	this.clicked.emit({ recipeVisible:true, shoppingVisible:false });
	// }

	// onShoppingClicked(){
	// 	this.clicked.emit({ recipeVisible:false, shoppingVisible:true });
	// }
	constructor(private dataStorageService: DataStorageService) {}

	onSaveData() {
		this.dataStorageService.storedRecipes();
	}

	onFetchData() {
		this.dataStorageService.fetchRecipes().subscribe();
	}
}