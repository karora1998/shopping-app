import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{

	// @Output() clicked = new EventEmitter<{recipeVisible: boolean, shoppingVisible: boolean}>();

	// onRecipeClicked(){
	// 	this.clicked.emit({ recipeVisible:true, shoppingVisible:false });
	// }

	// onShoppingClicked(){
	// 	this.clicked.emit({ recipeVisible:false, shoppingVisible:true });
	// }
	private userSub: Subscription;
	isAuthenticated = false;

	constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

	ngOnInit() {
		this.userSub = this.authService.user.subscribe(user => {
			this.isAuthenticated = !user ? false : true;
		});
	}

	onSaveData() {
		this.dataStorageService.storedRecipes();
	}

	onFetchData() {
		this.dataStorageService.fetchRecipes().subscribe();
	}

	ngOnDestroy() {
		this.userSub.unsubscribe();
	}
}