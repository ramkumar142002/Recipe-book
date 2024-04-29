import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipes.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.services";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
    recipeSelected = new Subject<Recipe>();
    private recipes:Recipe[] = [
        new Recipe('CHIPOTLE PINTO BEAN TACOS','Don’t these chipotle pinto bean tacos by Scotty from Plant-Based Scotty look super delicious? They’re very easy to make and they’re packed with protein. Don’t forget to top them off with some guacamole!','https://plantbasedscotty.com/wp-content/uploads/2018/08/DSC1221.jpg',
        [new Ingredient('chipotle ',1),
        new Ingredient('tomato',4)
        ]),
        new Recipe('VEGETABLE POTATO FRITTERS','These potato fritters with red lentils are super easy to make and so delicious! They’re best with spicy sriracha mayonnaise. The recipe for these fritters is of course 100 % vegan!','https://veganheaven.org/wp-content/uploads/2018/03/Vegetable-Potato-Fritters-4.jpg',[
            new Ingredient('red lentils',2),
            new Ingredient('garlic',2)
        ])
    ];
    // private recipes:Recipe[] = [];

    constructor(private slService : ShoppingListService){}

    setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index:number,newrecipe:Recipe){
        this.recipes[index] = newrecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}