import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

import { Subject, Subscription } from "rxjs";

export class ShoppingListService{

    
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    ingredients :Ingredient[] = [
        new Ingredient('Apple',5),
        new Ingredient('Tomatoes',10)
    ];  

    getIngredients(){
        return this.ingredients.slice();
    }
    getIngredient(index:number){
        return this.ingredients[index];
    }
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }
    addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }
    updateInredient(index:number,newIngredient:Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}