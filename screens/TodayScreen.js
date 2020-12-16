import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {DataContext} from '../App';

function getWeekOfMonth(date) {
  let adjustedDate = date.getDate() + date.getDay();
  let prefixes = ['0', '1', '2', '3', '4', '5'];
  return parseInt(prefixes[0 | (adjustedDate / 7)]) + 1;
}

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function TodayScreen({navigation}) {
  const dataContext = useContext(DataContext);
  const mealPlan = dataContext.dataState.plan;

  const [week, setWeek] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    const userid = dataContext.dataState.userid;
    console.log(`Today screen launched with userid = [${userid}]`);

    const d = new Date();
    const weekOfMonth = getWeekOfMonth(d);
    const dayofWeek = weekday[d.getDay()];

    setWeek(weekOfMonth);
    setDay(dayofWeek);

    const weekInt = parseInt(weekOfMonth);

    // if (mealPlan) {
    //   const weekData = mealPlan[weekInt - 1].data;

    //   let todaysMealData = {};

    //   weekData.some(function(currentWeekData) {
    //     if (currentWeekData.dayLabel == day) {
    //       todaysMealData = currentWeekData.meals;
    //     }

    //     return;
    //   });

    //   console.log(todaysMealData);
    // }
  }, [week, day]);

  // having setWeek() and setDay outside of useEffect will casuse infinite re-renders..?
  // setWeek(week);
  // setDay(day);

  const gotoPlan = () => {
    navigation.navigate('Planner');
  };

  return (
    <Container>
      <DummyLabel>
        Today is {day} of Week {week}
      </DummyLabel>
      <Button onPress={() => gotoPlan()}>
        <DummyLabel>Start your Plan</DummyLabel>
      </Button>
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

const Button = styled.TouchableOpacity`
  background-color: yellow;
  margin-top: 20px;
`;

const DummyLabel = styled.Text`
  /* font-weight: bold; */
  font-size: 18px;
`;

export default TodayScreen;
