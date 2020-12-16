import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

function SplashScreen({navigation}) {
  useEffect(() => {
    console.log('Settings screen launched');
  }, []);

  const signup = () => {
    navigation.navigate('SignUp');
  };

  const login = () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <SignUpButton onPress={() => signup()}>
        <DummyLabel>Sign Up</DummyLabel>
      </SignUpButton>
      <LoginButton onPress={() => login()}>
        <DummyLabel>Login</DummyLabel>
      </LoginButton>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  /* background: palegreen; */
`;

const SignUpButton = styled.TouchableOpacity`
  background-color: navajowhite;
  margin-bottom: 20px;
  padding: 10px 15px;
`;

const LoginButton = styled.TouchableOpacity``;

const DummyLabel = styled.Text`
  font-size: 18px;
`;

export default SplashScreen;
