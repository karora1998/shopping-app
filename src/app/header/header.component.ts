import { Component, Output, EventEmitter } from '@angular/core';

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

}