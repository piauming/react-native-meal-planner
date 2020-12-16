import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, Button} from 'react-native';
import styled from 'styled-components';
import {NavigationActions} from 'react-navigation';

function SignUpScreen({navigation}) {
  const dismissModal = () => {
    navigation.dispatch(NavigationActions.back());
    // navigation.goBack();
  };
  useEffect(() => {
    console.log('Sign-up screen launched');

    navigation.setParams({
      dismissModal: dismissModal,
    });
  }, []);

  const signup = () => {
    navigation.navigate('VerifyEmail');
  };

  return (
    <Container>
      <DummyLabel>Enter your email / password and...</DummyLabel>
      <SignUpButton onPress={() => signup()}>
        <DummyLabel>Sign-Up</DummyLabel>
      </SignUpButton>
    </Container>
  );
}

SignUpScreen.navigationOptions = ({navigation}) => ({
  title: 'Sign Up',
  headerRight: (
    <Button
      onPress={() => navigation.getParam('dismissModal')()}
      title="Cancel"
      color="red"
    />
  ),
});

const Container = styled.View`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background: palegreen;
`;

const SignUpButton = styled.TouchableOpacity`
  background-color: navajowhite;
  margin: 20px 0px;
  padding: 10px 15px;
`;

const DummyLabel = styled.Text`
  font-size: 18px;
`;

export default SignUpScreen;
