import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Button,
  Animated,
  Keyboard,
  Dimensions,
} from 'react-native';
import styled from 'styled-components';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationActions} from 'react-navigation';
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';
import _ from 'lodash';
import RecipeImageThumbnail from '../components/RecipeImageThumbnail';

const initialRecipesState = require('../data/recipes.json');
FlatListItemSeparator = () => {
  return <FlatListItemSeparatorView />;
};

const Recipe = React.memo(({item, viewRecipe}) => {
  const num = Math.floor(Math.random() * 10);
  return (
    <RecipeItem onPress={() => viewRecipe(item.id, item.uri)}>
      <RecipeContent>
        <RecipeImageThumbnail imageURL={item.img} />
        <RecipeLabel>
          {num} - {item.title}
        </RecipeLabel>
      </RecipeContent>
    </RecipeItem>
  );
});

const deviceWidth = Dimensions.get('window').width;
console.log(`deviceWidth = [${deviceWidth}]`);

function RecipesScreen({navigation}) {
  const dismissModal = () => {
    navigation.dispatch(NavigationActions.back());
    // navigation.goBack();
  };

  const [recipes, setRecipes] = useState(initialRecipesState);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [search, setSearch] = useState('');
  const selWeek = navigation.getParam('weekNum', 'NO-WEEK');
  const selDay = navigation.getParam('dayLabel', 'NO-DAY');
  // searchBarRef = React.createRef();

  const initialSearchBarWidth = new Animated.Value(deviceWidth);
  const [searchBarWidth, setSearchBarWidth] = useState(initialSearchBarWidth);
  // const [buttonWidth, setButtonWidth] = useState(72);
  const buttonWidth = 72;

  useEffect(() => {
    console.log('Search Screen launched');
    Icon.loadFont();

    navigation.setParams({
      dismissKeyboard: dismissKeyboard,
      fromRecipesScreen: true,
    });
  }, []);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      keyboardWillShow,
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      keyboardWillHide,
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const keyboardWillShow = () => {
    console.log('KEYBOARD DID Show');
    const temp = deviceWidth - buttonWidth;
    console.log(`... width = [${temp}]`);
    Animated.timing(searchBarWidth, {
      toValue: temp,
      duration: 100,
    }).start();
  };

  const keyboardWillHide = () => {
    console.log('kEYBOARD DID Hide');
    const temp = deviceWidth - buttonWidth;
    Animated.timing(searchBarWidth, {
      toValue: deviceWidth,
      duration: 100,
    }).start();
  };

  const dismissKeyboard = () => {
    console.log('dismiss keyboard...');
    Keyboard.dismiss();
    // navigation.dispatch(NavigationActions.back());
    // navigation.goBack();
  };

  const filterRecipes = React.useCallback(
    _.debounce(text => {
      console.log(`... filter Recipes [${text}]`);

      if (text == '') setRecipes(initialRecipesState);
      else {
        let rs = [];

        recipes.map((recipe, index) => {
          if (recipe.title.includes(text)) {
            rs.push(recipe);
          }
        });

        setRecipes(rs);
      }
    }, 1000),
    [],
  );

  const viewRecipe = React.useCallback((recipeID, sourceURL) => {
    navigation.navigate('RecipeDetail', {
      recipeID: recipeID,
      fromRecipesScreen: true,
      sourceURL: sourceURL,
    });
  }, []);

  return (
    <Container>
      <SearchBarView>
        <AnimatedFooView style={[{width: searchBarWidth}]}>
          <SearchBar
            inputContainerStyle={{backgroundColor: 'white'}}
            placeholder="Type Here..."
            onChangeText={text => {
              setSearch(text);
              filterRecipes(text);
            }}
            value={search}
            lightTheme={true}
          />
        </AnimatedFooView>
        <CancelButton
          // onLayout={event => setCancelButtonWidth(event)}
          onPress={() => {
            dismissKeyboard();
          }}>
          <CancelButtonLabel>Cancel</CancelButtonLabel>
        </CancelButton>
      </SearchBarView>
      <FlatList
        style={{paddingTop: 0}}
        data={recipes}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        renderItem={({item}) => <Recipe item={item} viewRecipe={viewRecipe} />}
        keyExtractor={item => item.id}
      />
    </Container>
  );
}

RecipesScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Recipes',
  };
};

const FlatListItemSeparatorView = styled.View`
  height: 1px;
  margin-left: 20px;
  margin-right: 20px;
  background: lightgray;
`;

const Container = styled.View`
  display: flex;
  /* flex-grow: 1; */
  /* height: 100%; */
  flex: 1;
`;

const RecipeContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RecipeItem = styled.TouchableOpacity`
  padding: 20px 0px;
  margin: 8px 20px;
`;

const RecipeLabel = styled.Text`
  font-size: 19px;
  /* font-weight: bold; */
`;

//search
const FooView = styled.View`
  background-color: springgreen;
  /* flex: 1; */
  /* width: 200px; */
  /* width: ${props => props.deviceWidth}; */
`;

const AnimatedFooView = Animated.createAnimatedComponent(FooView);

const SearchBarView = styled.View`
  flex-direction: row;
  display: flex;
  background-color: #e1e8ee;
  align-items: center;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: #e1e8ee;
  padding: 10px 10px;
  padding-left: 5px;
`;

const CancelButtonLabel = styled.Text`
  font-size: 18px;
`;

export default RecipesScreen;
