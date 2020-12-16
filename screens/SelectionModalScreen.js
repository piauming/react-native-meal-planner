import React, {useEffect, useContext, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Picker,
} from 'react-native';
import styled from 'styled-components';
import {NavigationActions} from 'react-navigation';
import {PickerModalAnimationContext, DataContext} from '../App';

const mealTypes = [
  {label: 'Breakfast', value: 'Breakfast'},
  {label: 'Lunch', value: 'Lunch'},
  {label: 'Snack', value: 'Snack'},
  {label: 'Dinner', value: 'Dinner'},
  {label: 'Supper', value: 'Supper'},
];

function SelectionModalScreen({navigation}) {
  const pickerModalAnimationContext = useContext(PickerModalAnimationContext);
  const dataContext = useContext(DataContext);
  const [selectedMealType, setSelectedMealType] = useState('Lunch');
  const selWeekNum = navigation.getParam('weekNum', 'NA');
  const selDayLabel = navigation.getParam('dayLabel', 'NA');
  const selRecipeId = navigation.getParam('recipeId', '-1');
  const hasCompleted = navigation.getParam('hasCompleted', 'NA');

  const foo = navigation.getParam('foo', 'xyz');

  console.log(`SelectionModalScreen... foo=[${foo}]`);

  const dissmissModal = () => {
    navigation.dispatch(NavigationActions.back());

    setTimeout(() => {
      pickerModalAnimationContext.pickerModalAnimationDispatch({
        type: 'hideModal',
      });
    }, 0);
  };

  const addToPlan = () => {
    console.log(
      `addToPlan... weekNum[${selWeekNum}], dayLabel[${selDayLabel}], recipeId[${selRecipeId}]`,
    );
    const data = {
      weekNum: selWeekNum,
      dayLabel: selDayLabel,
      recipeId: selRecipeId,
      mealGroupLabel: selectedMealType.toLowerCase(),
      dissmissModal: dissmissModal,
      hasCompleted: hasCompleted,
    };

    dataContext.dataDispatch({type: 'addRecipe', data: data});
  };

  useEffect(() => {
    console.log('meal selection modal screen launched');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TopView>
          <Button onPress={() => dissmissModal()}>
            <ButtonLabel>Cancel</ButtonLabel>
          </Button>
        </TopView>

        <Picker
          selectedValue={selectedMealType}
          style={{
            backgroundColor: 'white',
            // marginBottom: 10,
            // marginTop: 15,
          }}
          onValueChange={itemValue => setSelectedMealType(itemValue)}>
          {mealTypes.map((i, index) => (
            <Picker.Item key={index} label={i.label} value={i.value} />
          ))}
        </Picker>
        <BottomView>
          <ConfirmButton onPress={() => addToPlan()}>
            <ConfirmButtonLabel>
              Add to Plan as "{selectedMealType}"
            </ConfirmButtonLabel>
          </ConfirmButton>
        </BottomView>
      </View>
    </SafeAreaView>
  );
}

const Button = styled.TouchableOpacity`
  background-color: whitesmoke;
  margin-right: 20px;
  padding: 10px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: black;
  margin-bottom: 20px;
  padding: 12px 25px;
  border-radius: 9px;
`;

const ButtonLabel = styled.Text`
  font-size: 21px;
`;

const ConfirmButtonLabel = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const BottomView = styled.View`
  /* background-color: yellow; */
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const TopView = styled.View`
  background-color: whitesmoke;
  /* flex: 1; */
  align-items: flex-end;
  justify-content: center;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  innerContainer: {
    // flex: 1,
    // height: 300,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 500,
    backgroundColor: 'white',
  },
});

export default SelectionModalScreen;
