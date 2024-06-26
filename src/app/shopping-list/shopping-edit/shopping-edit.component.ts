import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.services';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm :NgForm;
  subscription : Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;

  // @ViewChild('nameInput') nameInputRef : ElementRef;
  // @ViewChild('amountInput') amountInputRef : ElementRef;

  constructor(private slService:ShoppingListService){}

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    )
  }

  onSubmit(form : NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);

    if(this.editMode) this.slService.updateInredient(this.editedItemIndex , newIngredient);
    else this.slService.addIngredient(newIngredient);
    this.editMode = false;
    form.reset();
  } 
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
