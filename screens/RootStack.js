import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//auth
import SplashScreen from '../screens/auth/SplashScreen';
import ForgetPasswordScreen from './auth/ForgetPasswordScreen';
import LoginScreen from './auth/LoginScreen';
import SignUpScreen from './auth/SignUpScreen';
import VerifyEmailScreen from './auth/VerifyEmailScreen';

import SearchContainer from './SearchContainer';
import AddToPlanContainer from './AddToPlanContainer';
import TabContainer from './TabContainer';
import SelectionModalScreen from '../screens/SelectionModalScreen';

//Sign up stack
const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({navigation}) => ({
      // title: 'Planner',
    }),
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: ({navigation}) => ({
      // title: 'Settings',
    }),
  },
});

const SignUpStack = createStackNavigator({
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: ({navigation}) => ({
      // title: 'Planner',
    }),
  },
  VerifyEmail: {
    screen: VerifyEmailScreen,
    navigationOptions: ({navigation}) => ({
      // title: 'Settings',
    }),
  },
});

const AuthStack = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },
    Login: {
      screen: LoginStack,
    },
    SignUp: {
      screen: SignUpStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const MainStack = createStackNavigator(
  {
    Tab: {
      screen: TabContainer,
    },
    Search: {
      screen: SearchContainer,
    },
    AddToPlan: {
      screen: AddToPlanContainer,
    },
    SelectionModal: {
      screen: SelectionModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transparentCard: true,
    cardStyle: {
      // backgroundColor: 'transparent',
      // makes transparentCard work for android
      opacity: 1,
    },
  },
);

const App = createSwitchNavigator({
  Auth: {
    screen: AuthStack,
  },
  Main: {
    screen: MainStack,
  },
});

export default createAppContainer(App);
