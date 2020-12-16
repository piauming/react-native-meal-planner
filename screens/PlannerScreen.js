import React, {useState, useContext} from 'react';
import {StyleSheet, Text, SectionList, Animated} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';
import styled from 'styled-components';
import DayItem from '../components/DayItem';
import {DataContext, ModalAnimationContext} from '../App';
const recipes = require('../data/recipes.json');

// const getRecipeIndex = recipeID => {
//   console.log('getting index for recipeID = [' + recipeID + ']');

//   const i = recipes.findIndex(function(item, i) {
//     return item.id == recipeID;
//   });

//   console.log('index = ' + i);

//   return i;
// };

function PlannerScreen({navigation}) {
  const dataContext = useContext(DataContext);
  const modalAnimationContext = useContext(ModalAnimationContext);

  let dataState = dataContext.dataState;
  // let modalAnimationState = modalAnimationContext.modalAnimationState;

  // state -> start
  const [start, setStart] = useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setStart(true);
    }, 500);
  }, []);

  // isEditOn
  React.useEffect(() => {
    console.log('useEffect..');

    if (dataState.isEditOn) {
      setRightBar(rightBarEdit);
    } else {
      setRightBar(rightBarDefault);
    }
  }, [dataState.isEditOn]);

  React.useEffect(() => {
    navigation.setParams({
      onDelete: onDelete,
    });
  }, []);

  const [rightBar, setRightBar] = useState(rightBarDefault);

  const rightBarDefault = () => {
    return null;
    // <Button
    //   // onPress={() => navigation.getParam('dismissModal')()}
    //   title="Default"
    //   color="black"
    // />
  };

  const rightBarEdit = () => {
    return (
      // <Button
      //   onPress={() => navigation.getParam('onDelete')()}
      //   title="Delete"
      //   color="red"
      //   style={{marginRight: 50}}
      // />
      <HeaderButtons>
        <Item
          title="Delete"
          color="red"
          onPress={() => navigation.getParam('onDelete')()}
        />
      </HeaderButtons>
    );
  };

  React.useEffect(() => {
    navigation.setParams({
      rightBar: rightBar,
    });
  }, [rightBar]);

  const onSelect = React.useCallback(
    (id, meals) => {
      console.log('...on select...');
      if (dataState.isEditOn) {
        const editInfo = {selectionId: id};
        dataContext.dataDispatch({type: 'markItemAsSelected', info: editInfo});
      } else {
        console.log('navigating to... RecipesForDay');
        // console.log('meals is.. ' + meals);

        // id = weekNum|dayLabel|mealGroupLabel|recipeID
        const token = id.split('|');
        const recipeID = token[3];

        // const recipeIndex = getRecipeIndex(recipeID);
        console.log('id.. ' + id);
        navigation.navigate('RecipesForDay', {
          selectedRecipeID: id,
          recipeIndex: recipeID,
          meals: meals,
        });
      }
    },
    [dataState.isEditOn],
  );

  const onLongPress = React.useCallback(
    id => {
      console.log('...on long press...');

      const editInfo = {selectionId: id};
      dataContext.dataDispatch({type: 'markItemAsSelected', info: editInfo});
    },
    [dataState.isEditOn],
  );

  const onDelete = React.useCallback(() => {
    dataContext.dataDispatch({type: 'deleteSelected'});
  }, []);

  const onAdd = React.useCallback((weekNum, dayLabel) => {
    modalAnimationContext.modalAnimationDispatch({type: 'presentModal'});

    navigation.navigate('Search', {weekNum: weekNum, dayLabel: dayLabel});
    // setTimeout(() => {
    //   // dataContext.dataDispatch({type: 'presentModal'});
    //   modalAnimationContext.modalAnimationDispatch({type: 'presentModal'});
    // }, 10);
  }, []);

  return (
    <RootView hasStarted={start}>
      {start && (
        <Container>
          <CustomSafeAreaView>
            <ContentView>
              {/* <HeaderView></HeaderView> */}
              <SectionList
                sections={dataState.plan}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <DayItem
                    id={item.id}
                    weekNum={item.weekNum}
                    dayLabel={item.dayLabel}
                    meals={item.meals}
                    mealSelection={item.mealSelection}
                    onSelect={onSelect}
                    onLongPress={onLongPress}
                    isSelected={item.isSelected}
                    onAdd={onAdd}
                    addIsDisabled={dataState.isEditOn}
                  />
                )}
                maxToRenderPerBatch={4}
                updateCellsBatchingPeriod={4}
                renderSectionHeader={({section: {title}}) => (
                  <Text style={styles.header}>{title}</Text>
                )}
              />
            </ContentView>
          </CustomSafeAreaView>
        </Container>
      )}
    </RootView>
  );
}

PlannerScreen.navigationOptions = ({navigation}) => {
  return {
    // title: navigation.getParam('headerTitle'),
    headerRight: navigation.getParam('rightBar'),
  };
};

const RootView = styled.View`
  /* background-color: black; */
  display: flex;
  flex: 1;
  background-color: ${props => (props.hasStarted ? 'black' : 'white')};
`;

const TopView = styled.View`
  height: 40px;
  background: whitesmoke;
  align-items: center;
`;

const DeleteButton = styled.TouchableOpacity`
  padding: 10px 5px;
  background: yellow;
  flex: 1;
`;

const AddButton = styled.TouchableOpacity`
  padding: 10px 5px;
  background: yellow;
  flex: 1;
`;

const ButtonLabel = styled.Text``;

const Container = styled.View`
  flex: 1;
  background-color: white;
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
`;

const HeaderView = styled.View`
  height: 40px;
  /* background-color: red;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
`;

const ContentView = styled.View`
  flex: 1;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const CustomSafeAreaView = styled.SafeAreaView`
  flex: 1;
  /* background-color: blue; */
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
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
    backgroundColor: 'whitesmoke',
  },
});

export default PlannerScreen;
