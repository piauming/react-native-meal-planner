import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Button,
  Image,
  Keyboard,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';
import {SearchBar} from 'react-native-elements';
import _ from 'lodash';
import styled from 'styled-components';
import {NavigationActions} from 'react-navigation';
import RecipeImageThumbnail from '../components/RecipeImageThumbnail';
import {DataContext, ModalAnimationContext} from '../App';

const initialRecipesState = require('../data/recipes.json');
FlatListItemSeparator = () => {
  return <FlatListItemSeparatorView />;
};

const deviceWidth = Dimensions.get('window').width;
console.log(`deviceWidth = [${deviceWidth}]`);

const RecipeItem = React.memo(({item, viewRecipe}) => {
  const num = Math.floor(Math.random() * 10);
  return (
    <RecipeContainer onPress={() => viewRecipe(item.id, item.uri)}>
      <RecipeContent>
        <RecipeImageThumbnail imageURL={item.img} />
        <RecipeLabel>
          {num} - {item.title}
        </RecipeLabel>
      </RecipeContent>
    </RecipeContainer>
  );
});

function SearchScreen({navigation}) {
  const dataContext = useContext(DataContext);
  const modalAnimationContext = useContext(ModalAnimationContext);

  const initialSearchBarWidth = new Animated.Value(deviceWidth);
  const [searchBarWidth, setSearchBarWidth] = useState(initialSearchBarWidth);
  // const [buttonWidth, setButtonWidth] = useState(72);
  const buttonWidth = 72;

  // state -> start
  const [start, setStart] = useState(false);
  const [recipes, setRecipes] = useState(initialRecipesState);
  const [search, setSearch] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // const setCancelButtonWidth = event => {
  //   var {x, y, width, height} = event.nativeEvent.layout;
  //   console.log(`cancel button width = [${width}]`);
  //   // setButtonWidth(width);
  // };

  React.useEffect(() => {
    setTimeout(() => {
      setStart(true);
    }, 1000);
  }, []);

  const dismissModal = () => {
    navigation.dispatch(NavigationActions.back());

    setTimeout(() => {
      modalAnimationContext.modalAnimationDispatch({type: 'hideModal'});
    }, 30);
  };

  const rightBarEnabled = () => {
    return (
      <HeaderButtons>
        <Item
          title="Cancel"
          color="red"
          onPress={() => navigation.getParam('dismissModal')()}
        />
      </HeaderButtons>
    );
  };

  const rightBarDisabled = () => {
    return (
      <HeaderButtons>
        <Item
          title="Cancel"
          color="red"
          onPress={() => navigation.getParam('dismissModal')()}
          disabled={true}
        />
      </HeaderButtons>
    );
  };

  const [rightBar, setRightBar] = useState(rightBarDisabled);

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

  useEffect(() => {
    console.log(`Search Screen launched with start = [${start}]`);

    navigation.setParams({
      dismissModal: dismissModal,
    });
    setRightBar(rightBarDisabled);
  }, []);

  React.useEffect(() => {
    console.log('useEffect..');

    if (start) {
      setRightBar(rightBarEnabled);
    }
  }, [start]);

  React.useEffect(() => {
    navigation.setParams({
      rightBar: rightBar,
    });
  }, [rightBar]);

  const selWeek = navigation.getParam('weekNum', 'NO-WEEK');
  const selDay = navigation.getParam('dayLabel', 'NO-DAY');
  // const plannerContext = useContext(PlannerContext);

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

  const dismissKeyboard = () => {
    console.log('dismiss keyboard');
    Keyboard.dismiss();
  };

  const viewRecipe = (recipeID, sourceURL) => {
    navigation.navigate('RecipeDetail', {
      recipeID: recipeID,
      sourceURL: sourceURL,
      week: selWeek,
      day: selDay,
    });
  };

  return (
    <Container>
      {start && (
        <View>
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
            style={{paddingTop: 16}}
            data={recipes}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({item}) => (
              <RecipeItem item={item} viewRecipe={viewRecipe} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </Container>
  );
}

SearchScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Search',
    headerRight: navigation.getParam('rightBar'),
  };
};

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

const FlatListItemSeparatorView = styled.View`
  height: 1px;
  margin-left: 20px;
  margin-right: 20px;
  background: lightgray;
`;

const Container = styled.View`
  display: flex;
  flex-grow: 1;
`;

const RecipeContainer = styled.TouchableOpacity`
  padding: 20px 0px;
  margin: 8px 20px;
`;

const RecipeContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RecipeLabel = styled.Text`
  font-size: 19px;
  /* font-weight: bold; */
`;

export default SearchScreen;
