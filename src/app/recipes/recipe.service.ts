import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [
    new Recipe(
      "Chicken Whopper",
      "One bite of this flavourful burger, starring a flame-grilled.",
      "http://bk-apac-prd.s3.amazonaws.com/sites/burgerkingindia.in/files/ChickenWhopper-Detail_1.png",
      [
        new Ingredient('Chicken', 10),
        new Ingredient('Chilli Powder', 1),
      ]),
    new Recipe(
      "Hot & Crispy Chicken",
      "A big bucket for buddies who like to share Hot & Crispy.",
      "https://ih1.redbubble.net/image.459636875.1569/flat,800x800,070,f.u7.jpg",
      [
        new Ingredient('Chicken', 10),
        new Ingredient('Chilli Powder', 1),
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {

  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}