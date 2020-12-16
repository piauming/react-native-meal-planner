import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  View,
  InteractionManager,
  Text,
  Animated,
  Picker,
} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import PlannerStaticScreen from '../screens/PlannerStaticScreen';
import styled from 'styled-components';
import {PickerModalAnimationContext} from '../App';

const recipes = require('../data/recipes.json');

const AddToPlanStack = createStackNavigator(
  {
    AddToPlan: {
      screen: PlannerStaticScreen,
      navigationOptions: ({navigation}) => ({
        // title: 'Search',
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

function AddToPlanComponent({navigation}) {
  //pickerModal
  const pickerModalAnimationContext = useContext(PickerModalAnimationContext);
  let pickerModalAnimationState =
    pickerModalAnimationContext.pickerModalAnimationState;
  const [fadeAnim] = useState(new Animated.Value(1));

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

  //getParams
  const recipeIndex = navigation.getParam('recipeID', '-1');
  const message = `Select Day to add "${recipes[recipeIndex].title}"`;

  return (
    // <SafeAreaView>
    // <RootView>
    <Container>
      <AnimatedContainer style={{opacity: fadeAnim}}>
        <TopView>
          <DummyLabel>{message}</DummyLabel>
        </TopView>
        <AddToPlanStack navigation={navigation} />
      </AnimatedContainer>
    </Container>
    // </RootView>
  );
}

AddToPlanComponent.router = AddToPlanStack.router;

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

const AnimatedContainer = Animated.createAnimatedComponent(ContentView);

export default createAppContainer(AddToPlanComponent);
