import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {NavigationActions} from 'react-navigation';

function SettingsScreen({navigation}) {
  useEffect(() => {
    console.log('Settings screen launched');
  }, []);

  const foo = () => {
    // navigation.dispatch(NavigationActions.back());
    console.log('signing out...');
    navigation.navigate('Auth');
  };

  return (
    <Container>
      <LogoutButton onPress={() => foo()}>
        <DummyLabel>Logout</DummyLabel>
      </LogoutButton>
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

const LogoutButton = styled.TouchableOpacity`
  background-color: red;
  margin-bottom: 20px;
  padding: 10px 15px;
`;

const DummyLabel = styled.Text`
  font-size: 18px;
  color: white;
`;

export default SettingsScreen;
