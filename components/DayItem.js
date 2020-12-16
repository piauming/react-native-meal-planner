import React from 'react';
import styled from 'styled-components';

const recipesDict = require('../data/recipes.json');

function getMealGroupHTML(
  weekNum,
  dayLabel,
  mealGroupLabel,
  mealGroupRecipes,
  mealGroupRecipesSel,
  onSelect,
  onLongPress,
  meals,
) {
  let html;

  const list = mealGroupRecipes.map((recipeID, index) => {
    const selectionId = `${weekNum}|${dayLabel}|${mealGroupLabel}|${recipeID}|${index}`;
    // let isStrikeThrough = false;
    // if (editIsOn) {
    //   isStrikeThrough = editData.includes(currentKey);
    // }
    const num = Math.floor(Math.random() * 10);

    const toDelete = mealGroupRecipesSel.includes(recipeID);
    const recipeName = recipesDict[recipeID].title;
    return (
      <Li
        key={index}
        onPress={() => onSelect(selectionId, meals)}
        onLongPress={() => onLongPress(selectionId)}
        // onLongPress={() => configEditMode(currentKey)}
        // delayLongPress={0}
      >
        <RecipeLabel toDelete={toDelete}>
          {num} - {recipeName}
        </RecipeLabel>
      </Li>
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
}

const DayItem = React.memo(
  ({
    id,
    weekNum,
    dayLabel,
    meals,
    mealSelection,
    onSelect,
    onLongPress,
    isSelected,
    onAdd,
    addIsDisabled,
  }) => {
    // console.log(`--- DayItem weekNum[${weekNum}], dayLabel[${dayLabel}]`);

    const num = Math.floor(Math.random() * 10);
    let breakfastHTML, lunchHTML, dinnerHTML, snackHTML, supperHTML;
    const breakfastRecipes = meals.breakfast;
    const lunchRecipes = meals.lunch;
    const dinnerRecipes = meals.dinner;
    const snackRecipes = meals.snack;
    const supperRecipes = meals.supper;

    const breakfastRecipesSel = mealSelection.breakfast;
    const lunchRecipesSel = mealSelection.lunch;
    const dinnerRecipesSel = mealSelection.dinner;
    const snackRecipesSel = mealSelection.snack;
    const supperRecipesSel = mealSelection.supper;

    if (breakfastRecipes.length > 0) {
      breakfastHTML = getMealGroupHTML(
        weekNum,
        dayLabel,
        'breakfast',
        breakfastRecipes,
        breakfastRecipesSel,
        onSelect,
        onLongPress,
        meals,
      );
    }

    if (lunchRecipes.length > 0) {
      lunchHTML = getMealGroupHTML(
        weekNum,
        dayLabel,
        'lunch',
        lunchRecipes,
        lunchRecipesSel,
        onSelect,
        onLongPress,
        meals,
      );
    }

    if (dinnerRecipes.length > 0) {
      dinnerHTML = getMealGroupHTML(
        weekNum,
        dayLabel,
        'dinner',
        dinnerRecipes,
        dinnerRecipesSel,
        onSelect,
        onLongPress,
        meals,
      );
    }

    if (snackRecipes.length > 0) {
      snackHTML = getMealGroupHTML(
        weekNum,
        dayLabel,
        'snack',
        snackRecipes,
        snackRecipesSel,
        onSelect,
        onLongPress,
        meals,
      );
    }

    if (supperRecipes.length > 0) {
      supperHTML = getMealGroupHTML(
        weekNum,
        dayLabel,
        'supper',
        supperRecipes,
        supperRecipesSel,
        onSelect,
        onLongPress,
        meals,
      );
    }

    return (
      // <ItemView onPress={() => onSelect(id)}>
      <ItemView>
        <ItemHeader>
          <ItemLabel toDelete={isSelected}>
            {num} - {dayLabel}
          </ItemLabel>
          <AddRecipeButton
            onPress={() => onAdd(weekNum, dayLabel)}
            disabled={addIsDisabled}>
            <AddText disabled={addIsDisabled}>+</AddText>
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
  },
);

const ItemView = styled.View`
  padding: 15px 20px;
  margin: 5px 0px;
  background: white;
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
  background-color: white;
  margin-left: 15px;
  margin-right: 15px;
`;

const MealGroup = styled.View`
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Li = styled.TouchableOpacity`
  padding: 15px 0px;
  border-bottom-width: 0.5px;
  border-style: solid;
  border-bottom-color: lightgray;
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
const MealRecipes = styled.Text`
  padding-left: 10px;
`;

const RecipeLabel = styled.Text`
  color: ${props => (props.toDelete ? 'salmon' : 'black')};
  font-size: 18px;
  text-decoration-line: ${props => (props.toDelete ? 'line-through' : 'none')};
`;

const MealRecipesColumn = styled.View`
  margin-right: 25px;
  padding-left: 10px;
  border-left-width: 2px;
  border-style: solid;
  border-left-color: salmon;
  flex: 1;
`;

const AddRecipeButton = styled.TouchableOpacity`
  padding: 5px 5px;
  margin-right: 0px;
`;
const AddText = styled.Text`
  font-size: 30px;
  /* color: black; */
  color: ${props => (props.disabled ? 'indianred' : 'black')};
  /* font-weight: bold; */
`;

export default DayItem;
