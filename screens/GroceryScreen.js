import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  SectionList,
  Button,
  Animated,
  Easing,
  View,
  StatusBar,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';
import GroceryWeeklyItem from '../components/GroceryWeeklyItem';
import {DataContext, ModalAnimationContext} from '../App';
import styled from 'styled-components';

function GroceryScreen({navigation}) {
  const dataContext = useContext(DataContext);
  let dataState = dataContext.dataState;
  const [start, setStart] = useState(true);
  const [weeks, setWeeks] = useState([]);

  const groceryData = [];

  const generateWeeklyItem = (weekLabel, recipesArray) => {
    return {title: weekLabel, data: [{recipeIds: recipesArray}]};
  };

  const getWeekObj = (weekLabel, week) => {
    var temp = [];
    var recipesInWeek = [];
    const daysInWeek = week.data;

    daysInWeek.forEach(day => {
      const mealsInDay = day.meals;

      const recipesInDay = temp.concat(
        mealsInDay.breakfast,
        mealsInDay.lunch,
        mealsInDay.snack,
        mealsInDay.dinner,
        mealsInDay.supper,
      );

      recipesInWeek = recipesInWeek.concat(recipesInDay);
    });

    result = {};
    for (var i = 0; i < recipesInWeek.length; ++i) {
      if (!result[recipesInWeek[i]]) result[recipesInWeek[i]] = 0;
      ++result[recipesInWeek[i]];
    }

    for (var key in result) {
      // console.log(`---- key = ${key}, val = ${result[key]}`);
    }

    // console.log(result);
    return {title: weekLabel, data: [result]};
  };

  const prep = () => {
    const weeks = dataState.plan;
    let foo = [];

    weeks.map(week => {
      console.log(`------------ ${week.title} --------------`);
      foo.push(getWeekObj(week.title, week));
      //week.title, recipesArrayInWeek
    });

    setWeeks(foo);
  };

  useEffect(() => {
    console.log('Settings screen launched');
    prep();
  }, [dataState.planLastUpdated]);

  // {"name": "salt", "quantity": "1/4", "unit": "teaspoon"},

  return (
    <RootView hasStarted={start}>
      {start && (
        <Container>
          <CustomSafeAreaView>
            <ContentView>
              <SectionList
                sections={weeks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <GroceryWeeklyItem result={item} />}
                // maxToRenderPerBatch={4}
                // updateCellsBatchingPeriod={4}
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

const RootView = styled.View`
  /* background-color: black; */
  display: flex;
  flex: 1;
  background-color: ${props => (props.hasStarted ? 'black' : 'white')};
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
  /* border-top-left-radius: 10px;
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

export default GroceryScreen;
