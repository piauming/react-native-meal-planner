import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  SectionList,
  Button,
  Alert,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import styled from 'styled-components';
import ItemStatic from '../components/ItemStatic';
import {
  DataContext,
  ModalAnimationContext,
  PickerModalAnimationContext,
} from '../App';
const recipes = require('../data/recipes.json');

function PlannerStaticScreen({navigation}) {
  const selectedRecipeID = navigation.getParam('recipeID');
  const modalAnimationContext = useContext(ModalAnimationContext);
  const pickerModalAnimationContext = useContext(PickerModalAnimationContext);
  const dataContext = useContext(DataContext);
  let dataState = dataContext.dataState;

  // state -> start
  const [start, setStart] = useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setStart(true);
    }, 500);
  }, []);

  const dismissModal = () => {
    navigation.dispatch(NavigationActions.back());
    setTimeout(() => {
      modalAnimationContext.modalAnimationDispatch({type: 'hideModal'});
    }, 30);
  };

  React.useEffect(() => {
    console.log('Planner Static Screen launched');

    navigation.setParams({
      dismissModal: dismissModal,
    });
  }, []);

  const onAdd = React.useCallback((weekNum, dayLabel) => {
    console.log('on add...');
    // navigation.navigate('Search', {weekNum: weekNum, dayLabel: dayLabel});

    console.log(
      `weekNum[${weekNum}], dayLabel[${dayLabel}], selectedRecipeID[${selectedRecipeID}]`,
    );

    const data = {
      weekNum: weekNum,
      dayLabel: dayLabel,
      recipeId: selectedRecipeID,
      hasCompleted: hasCompleted,
    };

    navigation.navigate('SelectionModal', data);

    setTimeout(() => {
      pickerModalAnimationContext.pickerModalAnimationDispatch({
        type: 'presentModal',
      });
    }, 0);

    // const data = {
    //   weekNum: weekNum,
    //   dayLabel: dayLabel,
    //   mealGroupLabel: 'breakfast',
    //   recipeId: selectedRecipeID,
    // };

    // dataContext.dataDispatch({type: 'addRecipe', data: data});
    // navigation.dispatch(NavigationActions.back());
    // navigation.navigate('MealPicker');
  }, []);

  const showAlert = (weekNum, dayLabel, recipeId, mealGroupLabel) => {
    console.log('.... showAlert()');
    const dayAndWeek = `"${dayLabel} of Week ${weekNum}"`;
    const message = `${recipes[selectedRecipeID].title} has been added to ${dayAndWeek} for ${mealGroupLabel}`;

    Alert.alert(
      null,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  //hasCompleted(true, weekNum, dayLabel, recipeId);
  const hasCompleted = (
    completed,
    weekNum,
    dayLabel,
    recipeId,
    mealGroupLabel,
  ) => {
    if (completed) {
      console.log('... has completed');
      showAlert(weekNum, dayLabel, recipeId, mealGroupLabel);
    } else {
      console.log('...did not complete');
    }
  };

  return (
    // <SafeAreaView>
    <Container>
      {start && (
        <SectionList
          sections={dataState.plan}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <ItemStatic
              weekNum={item.weekNum}
              dayLabel={item.dayLabel}
              meals={item.meals}
              onAdd={onAdd}
            />
          )}
          //   maxToRenderPerBatch={7}
          //   updateCellsBatchingPeriod={7}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      )}
    </Container>
    // </SafeAreaView>
  );
}

PlannerStaticScreen.navigationOptions = ({navigation}) => ({
  headerRight: (
    <Button
      onPress={() => navigation.getParam('dismissModal')()}
      title="Cancel"
      color="red"
    />
  ),
});

const AddButton = styled.TouchableOpacity`
  padding: 10px 5px;
  background: yellow;
  flex: 1;
`;

const ButtonLabel = styled.Text``;

const Container = styled.View`
  display: flex;
  max-height: 100%;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  header: {
    fontSize: 16,
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 20,
    color: 'grey',
    backgroundColor: 'white',
  },
});

export default PlannerStaticScreen;
