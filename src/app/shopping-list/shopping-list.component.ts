import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit , OnDestroy {
  private igChangeSub : Subscription;
  ingredients :Ingredient[];

  constructor(private slService:ShoppingListService){}
 
  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientChanged.subscribe(
      (ingredients:Ingredient[]) =>{
        this.ingredients = ingredients;
      }
    )
  }
  ngOnDestroy(): void {
      this.igChangeSub.unsubscribe();
  }
  onEditItem(index:number){
    this.slService.startedEditing.next(index);
  }
}
