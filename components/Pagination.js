import React from 'react';
import styled from 'styled-components';

const Pagination = React.memo(
  ({meals, selectedRecipeID, isInitial, mealGroupLabel, position}) => {
    console.log('//////////// component/Pagination ////////////');
    let dots = [];

    meals.map((item, index) => {
      const currMealGroup = item.mealGroup;
      const currentRecipeID = item.recipeID;
      let isSelected = false;

      if (isInitial) {
        isSelected =
          currentRecipeID == selectedRecipeID && currMealGroup == mealGroupLabel
            ? 1
            : 0;
      } else {
        isSelected = index == position ? 1 : 0;
      }

      dots.push(<PageCircle key={index} isSelected={isSelected} />);
    });

    return <Container>{dots}</Container>;
  },
);

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const PageCircle = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3;
  margin: 5px 5px;
  background-color: ${props => (props.isSelected ? `orangered` : `gainsboro`)};
`;

export default Pagination;
