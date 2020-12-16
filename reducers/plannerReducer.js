function filterRecipes(array, deleteList) {
  if (deleteList.length == 0) return array;

  const result = array.filter(function(item) {
    return !deleteList.includes(item);
  });

  return result;
}

const checkIsEditOn = updatedPlan => {
  console.log('... checkIsEditOn...');
  let numberOfDelItems = 0;
  updatedPlan.map((currentWeek, index) => {
    currentWeek.data.map((currentDay, index) => {
      const mealSelection = currentDay.mealSelection;
      for (var mealGroup in mealSelection) {
        numberOfDelItems += mealSelection[mealGroup].length;
      }
    });
  });

  return numberOfDelItems > 0 ? true : false;
};

const plannerReducer = (state, action) => {
  switch (action.type) {
    case 'updateStateFromServer': {
      // response = {userid: 1980, plan: initialDummyData};
      const userid = action.response.userid;
      const planData = action.response.plan;

      const newState = {
        ...state,
        plan: planData,
        isEditOn: false,
        userid: userid,
      };

      return newState;
    }
    case 'markItemAsSelected': {
      console.log('mark Item As Selected...');
      const selectionId = action.info.selectionId;
      const token = selectionId.split('|');
      const mealGroupLabel = token[2]; //e.g. breakfast, lunch, etc
      const selectedItemId = token[0] + token[1]; //week,day,group,recipeId

      // const updatedState = state.map((week, index) => {
      const updatedPlan = state.plan.map((week, index) => {
        // following
        // loop items in data (aka Days)
        const updatedData = week.data.map((item, index) => {
          const currentItemId = item.weekNum + item.dayLabel;

          if (currentItemId != selectedItemId) {
            return item;
          } else {
            const boolSel = item.isSelected ? false : true;
            const selRecipeId = token[3];
            let recipesForGroup = item.mealSelection[mealGroupLabel].slice();
            var index = recipesForGroup.indexOf(selRecipeId);

            if (index > -1) {
              recipesForGroup.splice(index, 1);
            } else {
              recipesForGroup.push(selRecipeId);
            }

            let mealSelectionUpdated = {
              ...item.mealSelection,
              [mealGroupLabel]: recipesForGroup,
            };

            let newItem = {
              ...item,
              mealSelection: mealSelectionUpdated,
              isSelected: boolSel,
            };

            return newItem;
          }
        });

        const updatedWeek = {
          ...week,
          data: updatedData,
        };

        return updatedWeek;
      });

      const isEditOn = checkIsEditOn(updatedPlan);
      console.log(`-------- isEditOn = [${isEditOn}]`);

      const newState = {
        ...state,
        plan: updatedPlan,
        isEditOn: isEditOn,
      };

      return newState;
    }

    case 'deleteSelected': {
      console.log('... delete selected');

      // const updatedState = state.map((week, index) => {
      const updatedPlan = state.plan.map((week, index) => {
        // following
        // loop items in data (aka Days)
        const updatedData = week.data.map((item, index) => {
          let breakfastToDel = item.mealSelection.breakfast;
          let lunchToDel = item.mealSelection.lunch;
          let dinnerToDel = item.mealSelection.dinner;
          let snackToDel = item.mealSelection.snack;
          let supperToDel = item.mealSelection.supper;

          if (
            breakfastToDel.length == 0 &&
            lunchToDel.length == 0 &&
            dinnerToDel.length == 0 &&
            snackToDel.length == 0 &&
            supperToDel.length == 0
          ) {
            return item;
          } else {
            const breakfast = item.meals.breakfast.slice();
            const lunch = item.meals.lunch.slice();
            const dinner = item.meals.dinner.slice();
            const snack = item.meals.snack.slice();
            const supper = item.meals.supper.slice();

            const breakfastUpdated = filterRecipes(breakfast, breakfastToDel);
            const lunchUpdated = filterRecipes(lunch, lunchToDel);
            const dinnerUpdated = filterRecipes(dinner, dinnerToDel);
            const snackUpdated = filterRecipes(snack, snackToDel);
            const supperUpdated = filterRecipes(supper, supperToDel);

            const mealsUpdated = {
              breakfast: breakfastUpdated,
              lunch: lunchUpdated,
              dinner: dinnerUpdated,
              snack: snackUpdated,
              supper: supperUpdated,
            };

            let newItem = {
              ...item,
              meals: mealsUpdated,
              mealSelection: {
                breakfast: [],
                lunch: [],
                snack: [],
                dinner: [],
                supper: [],
              },
              isSelected: false,
            };

            return newItem;
          }
        });

        const updatedWeek = {
          ...week,
          data: updatedData,
        };

        return updatedWeek;
      });

      const isEditOn = checkIsEditOn(updatedPlan);
      console.log(`-------- isEditOn = [${isEditOn}]`);

      // return updatedPlan;

      const lastUpdated = new Date().toLocaleString();

      const newState = {
        ...state,
        plan: updatedPlan,
        isEditOn: isEditOn,
        planLastUpdated: lastUpdated,
      };

      return newState;
    }

    case 'addRecipe': {
      console.log('reducer add recipe...');

      console.log(`- weekNum=[${action.data.weekNum}]`);
      console.log(`- dayLabel=[${action.data.dayLabel}]`);
      console.log(`- recipeId=[${action.data.recipeId}]`);
      console.log(`- mealGroupLabel=[${action.data.mealGroupLabel}]`);

      const weekNum = action.data.weekNum;
      const dayLabel = action.data.dayLabel;
      const recipeId = action.data.recipeId;
      const mealGroupLabel = action.data.mealGroupLabel;

      const hasCompleted = action.data.hasCompleted;
      const dissmissModal = action.data.dissmissModal;

      // const selectedItemId = action.data.weekNum + action.data.dayLabel;
      const selectedItemId = weekNum + dayLabel;

      // const updatedState = state.map((week, index) => {
      const updatedPlan = state.plan.map((week, index) => {
        const updatedData = week.data.map((item, index) => {
          const currentItemId = item.weekNum + item.dayLabel;

          if (currentItemId != selectedItemId) {
            return item;
          } else {
            const mealGroupLabel = action.data.mealGroupLabel;
            const recipeId = action.data.recipeId;

            let recipesForGroup = item.meals[mealGroupLabel].slice(); //e.g. meals.lunch
            var index = recipesForGroup.indexOf(recipeId);

            if (index > -1) {
              return item;
            } else {
              recipesForGroup.push(recipeId);
            }

            const mealsUpdated = {
              ...item.meals,
              [mealGroupLabel]: recipesForGroup,
            };

            let newItem = {
              ...item,
              meals: mealsUpdated,
              isSelected: false,
            };

            return newItem;
          }
        });

        const updatedWeek = {
          ...week,
          data: updatedData,
        };

        return updatedWeek;
      });

      // return updatedState;

      const lastUpdated = new Date().toLocaleString();

      const newState = {
        ...state,
        plan: updatedPlan,
        planLastUpdated: lastUpdated,
      };

      console.log('... calling hasCompleted...');
      hasCompleted(true, weekNum, dayLabel, recipeId, mealGroupLabel);

      dissmissModal();

      return newState;
    }

    default:
      return state;
  }
};

export {plannerReducer};
