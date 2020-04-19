import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() ingredient = new EventEmitter<Ingredient>();
  @ViewChild('nameInput', { static:false }) nameInput: ElementRef;
  @ViewChild('amountInput', { static:false }) amountInput: ElementRef; 

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient() {
  	this.ingredient.emit(new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value));
  }

}
