import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

function ForgetPasswordScreen() {
  useEffect(() => {
    console.log('Settings screen launched');
  }, []);

  return (
    <Container>
      <DummyLabel>Forget Password Screen</DummyLabel>
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

const DummyLabel = styled.Text`
  font-size: 18px;
`;

export default ForgetPasswordScreen;
