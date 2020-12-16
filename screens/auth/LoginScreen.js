import React, {useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import styled from 'styled-components';
import {NavigationActions} from 'react-navigation';
import {DataContext} from '../../App';
const initialDummyData = require('../../data/dummyData.json');
// const initialDummyData = require('../data/newData.json');
import KeyboardShift from '../../components/KeyboardShift';

function LoginScreen({navigation}) {
  const dataContext = useContext(DataContext);
  let dataState = dataContext.dataState;
  const dismissModal = () => {
    navigation.dispatch(NavigationActions.back());
    // navigation.goBack();
  };
  useEffect(() => {
    console.log('Login screen launched');

    navigation.setParams({
      dismissModal: dismissModal,
    });
  }, []);

  const login = () => {
    //with email n password, returns
    // userid
    // and any data (if exists)

    // const initialData = {userid: '', plan: emptyData, fav: [], isEditOn: false};

    const response = {userid: 1980, plan: initialDummyData};

    dataContext.dataDispatch({
      type: 'updateStateFromServer',
      response: response,
    });

    navigation.navigate('Main');
  };

  return (
    <KeyboardShift>
      <Container>
        <HeaderView></HeaderView>
        <TextInputStyled placeholder="A" />
        <TextInputStyled placeholder="B" />
        <TextInputStyled placeholder="C" />
        <TextInputStyled placeholder="Username" />
        <TextInputStyled placeholder="Email" />
        <TextInputStyled placeholder="Password" />
        <TextInputStyled placeholder="Confirm Password" />
        <LoginButton onPress={() => login()}>
          <DummyLabel>Sign In</DummyLabel>
        </LoginButton>
      </Container>
    </KeyboardShift>
  );
}

LoginScreen.navigationOptions = ({navigation}) => ({
  title: 'Login',
  headerRight: (
    <Button
      onPress={() => navigation.getParam('dismissModal')()}
      title="Done"
      color="red"
    />
  ),
});

const HeaderView = styled.View`
  height: 180px;
`;

const TextInputStyled = styled.TextInput`
  flex: 1;
  width: 90%;
  background-color: pink;
  /* height: 70px; */
  margin-bottom: 60px;
  padding: 25px 20px;
  font-size: 19px;
`;

const Container = styled.View`
  flex-grow: 1;
  justify-content: space-around;
  padding: 20px;
  align-items: center;
  width: 100%;
  background: whitesmoke;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: navajowhite;
  margin-bottom: 20px;
  padding: 20px 15px;
  align-items: center;
  width: 150px;
`;

const DummyLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export default LoginScreen;
