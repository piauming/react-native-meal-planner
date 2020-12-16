import React, {useState, useContext} from 'react';
import {SafeAreaView, Animated, StatusBar} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import TodayScreen from '../screens/TodayScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SearchScreen from '../screens/SearchScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import RecipesForDayScreen from '../screens/RecipesForDayScreen';
import PlannerScreen from '../screens/PlannerScreen';
import PlannerStaticScreen from '../screens/PlannerStaticScreen';
import RecipesScreen from '../screens/RecipesScreen';
import GroceryScreen from '../screens/GroceryScreen';

import Icon from 'react-native-ionicons';

import styled from 'styled-components';

import {ModalAnimationContext} from '../App';

// Grocery List
const GroceryStack = createStackNavigator({
  Grocery: {
    screen: GroceryScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Grocery List',
    }),
  },
});

GroceryStack.navigationOptions = {
  tabBarLabel: 'Grocery',
  tabBarOptions: {
    tabStyle: {
      paddingTop: 10,
      marginBottom: -10,
    },
  },
};

// Today
const TodayStack = createStackNavigator({
  Today: {
    screen: TodayScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Today',
    }),
  },
});

TodayStack.navigationOptions = {
  tabBarLabel: 'Today',
  tabBarIcon: ({tintColor}) => (
    <Icon
      name="ios-home"
      // containerStyle={{marginBottom: 6}}
      color={tintColor}
    />
  ),
  tabBarOptions: {
    tabStyle: {
      paddingTop: 10,
      marginBottom: -10,
    },
  },
};

// Recipes
const RecipesStack = createStackNavigator({
  Recipes: {
    screen: RecipesScreen,
    navigationOptions: ({navigation}) => ({
      // title: 'Recipes',
    }),
  },
  RecipeDetail: {
    screen: RecipeDetailScreen,
    navigationOptions: ({navigation}) => ({
      // title: 'Settings',
    }),
  },
});

RecipesStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarOptions: {
    tabStyle: {
      paddingTop: 10,
      marginBottom: -10,
    },
  },
};

// Settings
const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Settings',
    }),
  },
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarOptions: {
    tabStyle: {
      paddingTop: 10,
      marginBottom: -10,
    },
  },
};

// Planner
const PlannerStack = createStackNavigator(
  {
    Planner: {
      screen: PlannerScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Planner',
      }),
    },
    RecipesForDay: {
      screen: RecipesForDayScreen,
      navigationOptions: ({navigation}) => ({
        // title: 'Settings',
      }),
    },
  },
  //   {headerMode: 'none'},
);

PlannerStack.navigationOptions = {
  tabBarLabel: 'Planner',
  tabBarOptions: {
    tabStyle: {
      paddingTop: 10,
      marginBottom: -10,
    },
  },
};

const BottomTabNavigator = createBottomTabNavigator({
  TodayStack,
  RecipesStack,
  PlannerStack,
  GroceryStack,
  SettingsStack,
});

function TabNavigator({navigation}) {
  const modalAnimationContext = useContext(ModalAnimationContext);
  let modalAnimationState = modalAnimationContext.modalAnimationState;

  const initialScale = new Animated.Value(1);
  const [scale, setScale] = useState(initialScale);
  const [barStyle, setBarStyle] = useState('light-content');

  const [fadeAnim] = useState(new Animated.Value(1));

  //   const isModalVisible = false;

  React.useEffect(() => {
    if (modalAnimationState.isModalVisible) {
      Animated.spring(scale, {toValue: 0.9}).start();

      Animated.timing(fadeAnim, {
        toValue: 0.6,
        duration: 500,
      }).start();

      setBarStyle('light-content');
    } else {
      setBarStyle('dark-content');
      Animated.spring(scale, {toValue: 1}).start();

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
      }).start();
    }
  }, [modalAnimationState.isModalVisible]);

  return (
    <RootView>
      <StatusBar barStyle={barStyle} />
      <AnimatedContainer
        style={{opacity: fadeAnim, transform: [{scale: scale}]}}>
        <ContentView>
          <BottomTabNavigator navigation={navigation} />
        </ContentView>
      </AnimatedContainer>
    </RootView>
  );
}

TabNavigator.router = BottomTabNavigator.router;

const RootView = styled.View`
  display: flex;
  flex: 1;
  background-color: black;
`;

const HeaderView = styled.View`
  height: 54px;
  /* background-color: red; */
  /* border-top-left-radius: 10px; */
  /* border-top-right-radius: 10px; */
`;

const Container = styled.View`
  flex: 1;
  /* background-color: red; */
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const ContentView = styled.View`
  flex: 1;
  /* background-color: red; */
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
`;

const CustomSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: blue;
`;

export default createAppContainer(TabNavigator);
