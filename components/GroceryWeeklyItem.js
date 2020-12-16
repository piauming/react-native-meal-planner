import React from 'react';
import styled from 'styled-components';

const recipesDict = require('../data/recipes.json');

const getUpdatedIngredient = (item, count) => {
  const updatedCount = count * parseInt(item.quantity);
  return {name: item.name, quantity: updatedCount, unit: item.unit};
};

const foo = arr => {
  // console.log('--------- array ----------');
  // console.log(arr);
  var result = [];

  arr.map((item, index) => {
    const ingredientName = item.name;
    var index = result.findIndex(obj => obj.name == ingredientName);
    if (index >= 0) {
      // console.log('index = ' + index + ', adding...');
      result[index].quantity = result[index].quantity + item.quantity;
    } else {
      result.push(item);
    }
  });

  return result;
};

const GroceryWeeklyItem = React.memo(results => {
  const data = results.result;

  console.log('--------- GroceryWeeklyItem ----------');

  let array = [];

  for (var key in data) {
    const recipe = recipesDict[key];
    const recipeCount = data[key];
    const recipeIngredient = recipe.recipeIngredient;

    recipeIngredient.map(item => {
      array.push(getUpdatedIngredient(item, recipeCount));
    });
  }

  let temp = [];
  const finalArray = foo(array);

  finalArray.map((item, index) => {
    const str = `${item.name} - ${item.quantity} ${item.unit}`;

    temp.push(
      <RecipeItemView key={index}>
        <RecipeInfoText>{str}</RecipeInfoText>
      </RecipeItemView>,
    );
  });

  return <ItemView>{temp}</ItemView>;
});

const ItemView = styled.View`
  padding: 15px 20px;
  padding-left: 30px;
  margin: 5px 0px;
  /* height: 100px; */
  background: white;
`;

const RecipeItemView = styled.View`
  margin-bottom: 20px;
  /* background-color: yellow; */
`;
const RecipeInfoText = styled.Text`
  font-size: 19px;
`;

export default GroceryWeeklyItem;
