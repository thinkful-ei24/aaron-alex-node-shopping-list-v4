'use strict';

const express = require('express');
const morgan = require('morgan');
const shoppingListRouter = require('./routers/shopping-list.routes');
const recipesRouter = require('./routers/recipes.routes');

const { ShoppingList, Recipes } = require('./models');

const app = express();


app.use(morgan('common'));
app.use(express.static('public'));


ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);


Recipes.create(
  'boiled white rice', ['1 cup white rice', '2 cups water', 'pinch of salt']);
Recipes.create(
  'milkshake', ['2 tbsp cocoa', '2 cups vanilla ice cream', '1 cup milk']);


app.use('/shopping-list', shoppingListRouter.router);
app.use('/recipes', recipesRouter.router);



app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
