import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styled from 'styled-components';
import {WebView} from 'react-native-webview';
import {
  DataContext,
  ModalAnimationContext,
  PickerModalAnimationContext,
} from '../App';

const sometext =
  "If you've chilled the dough, take it out of the refrigerator approximately 30 minutes ahead to let it come to room temperature. Divide the dough into 3 equal parts and roll each one into a smooth ball. Place the balls on a baking sheet and cover them with a damp towel. Allow the dough to rest for 10 minutes before using. Roll and stretch each ball into a rough 8-inch circle and place them all on baking sheets sprinkled with cornmeal. (You will be able to fit 2 pizzas on each 18 by 13-inch baking sheet.) Light your grill and wait until it's hot and no flame. Place the pizzas directly onto the grill and cook on 1 side for 2-3 minutes. Turn the pizzas over and brush with olive oil or garlic oil. It should be firm and easily picked up. Remove from grill and put your topping on. Drizzle each pizza with 1 tablespoon of olive oil. Put back on the grill with the lid on for 5 more minutes until the crust is crisp and the toppings are cooked.";
const deviceWidth = Dimensions.get('window').width;
const WebViewHeight = deviceWidth * (9 / 16);
const recipes = require('../data/recipes.json');

const height = Dimensions.get('window').height - 88;

const RecipeView = ({recipeID, addToPlan}) => {
  return (
    <RecipeContent>
      <RecipeName>{recipes[recipeID].title}</RecipeName>
      <AddButton onPress={() => addToPlan()}>
        <AddButtonLabel>Add to Plan</AddButtonLabel>
      </AddButton>
    </RecipeContent>
  );
};

function RecipeDetailScreen({navigation}) {
  const pickerModalAnimationContext = useContext(PickerModalAnimationContext);
  const modalAnimationContext = useContext(ModalAnimationContext);

  useEffect(() => {
    console.log(
      `Recipe Detail Screen launched with day[${selDay}] and week[${selWeek}] and recipeID[${recipeID}]`,
    );
  }, []);

  const [visible, setVisible] = useState(true);

  const hideSpinner = () => {
    setVisible(false);
  };

  const dataContext = useContext(DataContext);
  const selWeek = navigation.getParam('week', 'NO-WEEK');
  const selDay = navigation.getParam('day', 'NO-DAY');
  const recipeID = navigation.getParam('recipeID', -1);
  const sourceURL = navigation.getParam('sourceURL', 'NA');
  const isFromRecipesScreen = navigation.getParam('fromRecipesScreen', false);

  // console.log(`sourceURL is ... [${sourceURL}]`);

  const [screenHeight, setScreenHeight] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state

    console.log(`set screen height [${contentHeight}]`);
    setScreenHeight(contentHeight);
  };

  const showAlert = (weekNum, dayLabel, recipeId, mealGroupLabel) => {
    console.log('.... showAlert()');
    const dayAndWeek = `"${dayLabel} of Week ${weekNum}"`;
    const message = `${recipes[recipeId].title} has been added to ${dayAndWeek} for ${mealGroupLabel}`;

    Alert.alert(
      null,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  //hasCompleted(true, weekNum, dayLabel, recipeId);
  const hasCompleted = (
    completed,
    weekNum,
    dayLabel,
    recipeId,
    mealGroupLabel,
  ) => {
    if (completed) {
      console.log('... has completed');
      showAlert(weekNum, dayLabel, recipeId, mealGroupLabel);
    } else {
      console.log('...did not complete');
    }
  };

  useEffect(() => {
    console.log(
      `use effect screenHeight=[${screenHeight}] vs height=[${height}] `,
    );

    if (screenHeight > height) {
      console.log('set scroll true...');
      setScrollEnabled(true);
    } else {
      console.log('set scroll false...');
      setScrollEnabled(false);
    }
  }, [screenHeight]);

  const addToPlan = () => {
    if (isFromRecipesScreen) {
      console.log('is from recipes screen...');
      navigation.navigate('AddToPlan', {
        recipeID: recipeID,
        fromRecipesScreen: true,
      });

      setTimeout(() => {
        modalAnimationContext.modalAnimationDispatch({type: 'presentModal'});
      }, 30);
    } else {
      const data = {
        weekNum: selWeek,
        dayLabel: selDay,
        recipeId: recipeID,
        hasCompleted: hasCompleted,
      };

      navigation.navigate('SelectionModal', data);
      setTimeout(() => {
        pickerModalAnimationContext.pickerModalAnimationDispatch({
          type: 'presentModal',
        });
      }, 0);
    }
  };

  return (
    <SafeAreaView>
      <ScrollableContainer
        // contentContainerStyle={styles.scrollview}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={(contentWidth, contentHeight) =>
          onContentSizeChange(contentWidth, contentHeight)
        }>
        <RecipePlayerView>
          <WebView
            onLoad={() => hideSpinner()}
            style={styles.WebViewStyle}
            source={{uri: sourceURL + '?playsinline=1'}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
          />
          {visible && (
            <ActivityIndicator
              style={{
                position: 'absolute',
                height: WebViewHeight,
                width: deviceWidth,
                backgroundColor: 'whitesmoke',
              }}
              size="large"
            />
          )}
        </RecipePlayerView>
        <RecipeView recipeID={recipeID} addToPlan={addToPlan} />
        <PreparationView>
          <PreparationText>{sometext}</PreparationText>
        </PreparationView>
      </ScrollableContainer>
    </SafeAreaView>
  );
}

const PreparationView = styled.View`
  padding: 15px 20px;
  /* background-color: yellow; */
`;

const PreparationText = styled.Text`
  font-size: 18px;
  line-height: 27;
`;

const RecipeContent = styled.View`
  padding: 20px 16px;

  /* height: 200px; */
  /* background-color: springgreen; */
`;

const RecipeName = styled.Text`
  color: black;
  font-size: 21px;
  font-weight: bold;
`;

const AddButton = styled.TouchableOpacity`
  display: flex;
  margin-top: 15px;
  padding: 10px 10px;
  border-radius: 5px;
  background-color: red;
  width: 120px;
  align-items: center;
`;

const AddButtonLabel = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 17px;
`;

const ScrollableContainer = styled.ScrollView`
  /* max-height: 100%; */
  /* flex: 1; */
  /* position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px; */

  flex-direction: column;
`;

const RecipePlayerView = styled.View`
  height: ${WebViewHeight}px;
  background-color: whitesmoke;
  justify-content: center;
`;

const styles = StyleSheet.create({
  WebViewStyle: {
    height: WebViewHeight,
    width: deviceWidth,
    flex: 1,
  },
});

export default RecipeDetailScreen;
