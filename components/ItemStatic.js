import React from 'react';
import styled from 'styled-components';

const recipesDict = require('../data/recipes.json');

const getMealGroupHTML = (mealGroupLabel, mealGroupRecipes) => {
  let html;

  const list = mealGroupRecipes.map((recipeID, index) => {
    const num = Math.floor(Math.random() * 10);
    const recipeName = recipesDict[recipeID].title;
    return (
      <RecipeLabel key={index}>
        {num} - {recipeName}
      </RecipeLabel>
    );
  });

  if (mealGroupRecipes.length > 0) {
    html = (
      <MealGroup>
        <MealLabelColumn>
          <MealLabel>{mealGroupLabel}</MealLabel>
        </MealLabelColumn>
        <MealRecipesColumn>{list}</MealRecipesColumn>
      </MealGroup>
    );
  }

  return html;
};

const ItemStatic = React.memo(({weekNum, dayLabel, meals, onAdd}) => {
  const num = Math.floor(Math.random() * 10);
  let breakfastHTML, lunchHTML, dinnerHTML, snackHTML, supperHTML;
  const breakfastRecipes = meals.breakfast;
  const lunchRecipes = meals.lunch;
  const dinnerRecipes = meals.dinner;
  const snackRecipes = meals.snack;
  const supperRecipes = meals.supper;

  if (breakfastRecipes.length > 0) {
    breakfastHTML = getMealGroupHTML('breakfast', breakfastRecipes);
  }

  if (lunchRecipes.length > 0) {
    lunchHTML = getMealGroupHTML('lunch', lunchRecipes);
  }

  if (dinnerRecipes.length > 0) {
    dinnerHTML = getMealGroupHTML('dinner', dinnerRecipes);
  }

  if (snackRecipes.length > 0) {
    snackHTML = getMealGroupHTML('snack', snackRecipes);
  }

  if (supperRecipes.length > 0) {
    supperHTML = getMealGroupHTML('supper', supperRecipes);
  }

  return (
    // <ItemView onPress={() => onSelect(id)}>
    <ItemView>
      <ItemHeader>
        <ItemLabel>
          {num} - {dayLabel}
        </ItemLabel>
        <AddRecipeButton onPress={() => onAdd(weekNum, dayLabel)}>
          <AddText>+</AddText>
        </AddRecipeButton>
      </ItemHeader>
      <ItemContent>
        {breakfastHTML}
        {lunchHTML}
        {snackHTML}
        {dinnerHTML}
        {supperHTML}
      </ItemContent>
    </ItemView>
  );
});

const ItemView = styled.View`
  padding: 15px 20px;
  padding-top: 0px;
  margin: 5px 0px;
  /* background: salmon; */
`;
const ItemLabel = styled.Text`
  font-size: 21px;
`;

const ItemHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-style: solid;
  border-bottom-color: whitesmoke;
  margin-left: 15px;
  margin-right: 15px;
`;

const ItemContent = styled.View`
  background-color: whitesmoke;
  margin-left: 15px;
  margin-right: 15px;
`;

const MealGroup = styled.View`
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const MealLabelColumn = styled.View`
  width: 90px;
  padding-top: 17px;
  align-items: flex-end;
`;

const MealLabel = styled.Text`
  padding-right: 10px;
  padding-left: 15px;
  color: grey;
`;

const RecipeLabel = styled.Text`
  padding: 15px 0px;
  border-bottom-width: 0.5px;
  border-style: solid;
  border-bottom-color: lightgray;
  color: grey;
  font-size: 18px;
`;

const MealRecipesColumn = styled.View`
  margin-right: 25px;
  padding-left: 10px;
  border-left-width: 2px;
  border-style: solid;
  /* border-left-color: salmon; */
  flex: 1;
`;

const AddRecipeButton = styled.TouchableOpacity`
  padding: 5px 5px;
  margin-right: 0px;
`;
const AddText = styled.Text`
  font-size: 30px;
  /* color: black; */
  color: black;
  /* font-weight: bold; */
`;

export default ItemStatic;
