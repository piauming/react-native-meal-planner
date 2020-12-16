import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  InteractionManager,
  StyleSheet,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import nextId from 'react-id-generator';
import WebViewCustom from '../components/WebViewCustom';
import Pagination from '../components/Pagination';

const deviceWidth = Dimensions.get('window').width;
const CarouselHeight = deviceWidth * (9 / 16);
const recipes = require('../data/recipes.json');

const RecipeView = React.memo(({recipeID}) => {
  console.log(`displaying recipe info for recipeID=[${recipeID}]-------`);
  const recipe = recipes[recipeID];

  return (
    <RecipeContent>
      <RecipeName>{recipe.title}</RecipeName>
    </RecipeContent>
  );
});

function RecipesForDayScreen({navigation}) {
  console.log('//////////// RecipesForDayScreen ////////////');
  scrollRef = React.createRef();

  const dataString = navigation.getParam('selectedRecipeID');
  // id = weekNum|dayLabel|mealGroupLabel|recipeID|index
  var token = dataString.split('|');
  const mealGroupLabel = token[2];
  const initialSelectedRecipeID = token[3];

  const [recipeID, setRecipeID] = useState(initialSelectedRecipeID);
  const [mealsArray, setMealsArray] = useState([]);
  const [isInitial, setIsInitial] = useState(true);
  const [viewsJSX, setViewsJSX] = useState([]);
  const [position, setPosition] = useState(0);

  const getMealsArray = () => {
    const meals = navigation.getParam('meals');
    let array = [];

    Object.keys(meals).forEach(function(mealGroup) {
      meals[mealGroup].map((recipeID, index) => {
        const mealObj = {id: index, mealGroup: mealGroup, recipeID: recipeID};
        array.push(mealObj);
      });
    });

    return array;
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const meals = getMealsArray();
      prepareScrollViewContent(meals);
      setMealsArray(meals);
    });
  }, []);

  const scrollIsReady = () => {
    console.log('scrollview is ready..setting scrollview initial position');
    mealsArray.map((item, index) => {
      const currMealGroup = item.mealGroup;
      const currentRecipeID = item.recipeID;
      let flag = currMealGroup == mealGroupLabel ? 1 : 0;
      const isSelected = currentRecipeID == recipeID && flag ? 1 : 0;

      if (isSelected) {
        this.scrollRef.current.scrollTo({
          animated: false,
          x: deviceWidth * index,
          y: 0,
        });
      }
    });
  };

  const updatePagination = event => {
    console.log(`update pagination`);
    const position = event.nativeEvent.contentOffset.x / deviceWidth;
    const recipeId = mealsArray[position].recipeID;

    setPosition(position);
    setRecipeID(recipeId);
    setIsInitial(false);
  };

  const prepareScrollViewContent = meals => {
    console.log(`prepare scrollview content`);
    let views = [];
    meals.map((item, index) => {
      const currentRecipeURI = recipes[item.recipeID].uri + '?playsinline=1';
      const id = nextId();
      views.push(
        <WebViewCustom key={id} sourceURL={currentRecipeURI} index={index} />,
      );
    });
    setViewsJSX(views);
  };

  return (
    <SafeAreaView>
      <ContainerView>
        <Carousel>
          <ScrollView
            ref={this.scrollRef}
            horizontal
            pagingEnabled
            onContentSizeChange={() => scrollIsReady()}
            onMomentumScrollEnd={event => {
              updatePagination(event);
            }}>
            {viewsJSX}
          </ScrollView>
        </Carousel>
        <Pagination
          meals={mealsArray}
          selectedRecipeID={recipeID}
          isInitial={isInitial}
          mealGroupLabel={mealGroupLabel}
          position={position}
        />
        <RecipeView recipeID={recipeID} />
      </ContainerView>
    </SafeAreaView>
  );
}

const ContainerView = styled.View`
  max-height: 100%;
  flex: 1;
  flex-direction: column;
`;
const Carousel = styled.View`
  height: ${CarouselHeight}px;
  background-color: salmon;
`;

const RecipeContent = styled.View`
  padding: 20px 16px;
  height: 450px;
`;

const RecipeName = styled.Text`
  color: black;
  font-size: 21px;
  font-weight: bold;
`;

export default RecipesForDayScreen;
