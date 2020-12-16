import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

function VerifyEmailScreen({navigation}) {
  useEffect(() => {
    console.log('Settings screen launched');
  }, []);

  const ok = () => {
    console.log('ok');
    navigation.popToTop(); // Reset all modal of modal stacks. (this is available since 1.0.0 I think).
    navigation.goBack(null);
  };

  return (
    <Container>
      <DummyLabel>Go to your email and verify registration</DummyLabel>
      <OkButton onPress={() => ok()}>
        <DummyLabel>OK</DummyLabel>
      </OkButton>
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

const OkButton = styled.TouchableOpacity`
  background-color: navajowhite;
  margin: 20px 0px;
  padding: 10px 15px;
`;

const DummyLabel = styled.Text`
  font-size: 18px;
`;

export default VerifyEmailScreen;
