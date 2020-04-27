import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static:false }) nameInput: ElementRef;
  // @ViewChild('amountInput', { static:false }) amountInput: ElementRef; 
  @ViewChild('f', {static: true}) form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    // const i = new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value);
  	// this.shoppingListService.onIngredientAdded(i);
    const value = form.value;
    const i = new Ingredient(value.name, value.amount);
    this.shoppingListService.onIngredientAdded(i);
  }
}
