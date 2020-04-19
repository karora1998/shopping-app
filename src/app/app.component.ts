import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	recipeVisible: boolean = true;
	shoppingVisible: boolean = false;

	onHeaderClicked(headerData: {recipeVisible: boolean, shoppingVisible: boolean}){
		this.recipeVisible = headerData.recipeVisible;
		this.shoppingVisible = headerData.shoppingVisible;
	}
}
