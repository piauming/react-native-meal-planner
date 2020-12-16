import React, {useState, useEffect, useContext} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {
  SafeAreaView,
  View,
  InteractionManager,
  Text,
  Animated,
  Picker,
} from 'react-native';

import styled from 'styled-components';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SearchScreen from '../screens/SearchScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import SelectionModalScreen from '../screens/SelectionModalScreen';

import {PickerModalAnimationContext} from '../App';

//Search
const SearchStack = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Search',
        // headerStyle: {
        //   height: 100,
        // },
        // headerForceInset: {top: 'never', bottom: 'never'},
      }),
    },
    RecipeDetail: {
      screen: RecipeDetailScreen,
      navigationOptions: ({navigation}) => ({
        // title: 'Settings',
        // headerForceInset: {top: 'never', bottom: 'never'},
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerForceInset: {top: 'never', bottom: 'never'},
    },

    // mode: 'modal',
    // headerMode: 'none',
  },
);

const TopView = styled.View`
  background-color: white;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const DummyLabel = styled.Text`
  font-size: 13px;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  top: 6%;
  left: 0px;
  bottom: 0px;
  right: 0px;
  border-radius: 10px;
  background-color: black;
`;

const ContentView = styled.View`
  height: 100%;
  width: 100%;
`;

const AnimatedContainer = Animated.createAnimatedComponent(ContentView);

const RootView = styled.View``;

function SearchComponent({navigation}) {
  const pickerModalAnimationContext = useContext(PickerModalAnimationContext);
  let pickerModalAnimationState =
    pickerModalAnimationContext.pickerModalAnimationState;

  const [fadeAnim] = useState(new Animated.Value(1));

  const dayLabel = navigation.getParam('dayLabel', '-');
  const weekNum = navigation.getParam('weekNum', '-');
  const message = `Add Recipe to "${dayLabel} of Week ${weekNum}"`;

  React.useEffect(() => {
    if (pickerModalAnimationState.isModalVisible) {
      console.log('............... picker is visible');
      Animated.timing(fadeAnim, {
        toValue: 0.85,
        duration: 100,
      }).start();
    } else {
      console.log('............... picker is NOT visible');
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
      }).start();
    }
  }, [pickerModalAnimationState.isModalVisible]);

  return (
    // <SafeAreaView>
    // <RootView>
    <Container>
      <AnimatedContainer style={{opacity: fadeAnim}}>
        <TopView>
          <DummyLabel>{message}</DummyLabel>
        </TopView>
        <SearchStack navigation={navigation} />
      </AnimatedContainer>
    </Container>
    // </RootView>
  );
}

SearchComponent.router = SearchStack.router;

export default createAppContainer(SearchComponent);
