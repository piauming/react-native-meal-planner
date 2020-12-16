import React, {useReducer} from 'react';
import RootStack from './screens/RootStack';
import {plannerReducer} from './reducers/plannerReducer';
import {modalAnimationReducer} from './reducers/modalAnimationReducer';
import {pickerModalAnimationReducer} from './reducers/pickerModalAnimationReducer';

export const DataContext = React.createContext();
export const ModalAnimationContext = React.createContext();
export const PickerModalAnimationContext = React.createContext();

const initialDummyData = require('./data/dummyData.json');
const emptyData = require('./data/newData.json');
const initialData = {
  userid: '',
  plan: emptyData,
  fav: [],
  isEditOn: false,
  isActionFinished: false,
  planLastUpdated: '',
};

const initialModalAnimationData = {
  isModalVisible: false,
};

const initialPickerModalAnimationData = {
  isModalVisible: false,
};

const App = () => {
  const [dataState, dataDispatch] = useReducer(plannerReducer, initialData);
  const [modalAnimationState, modalAnimationDispatch] = useReducer(
    modalAnimationReducer,
    initialModalAnimationData,
  );
  const [pickerModalAnimationState, pickerModalAnimationDispatch] = useReducer(
    pickerModalAnimationReducer,
    initialPickerModalAnimationData,
  );

  return (
    <DataContext.Provider
      value={{dataState: dataState, dataDispatch: dataDispatch}}>
      <ModalAnimationContext.Provider
        value={{
          modalAnimationState: modalAnimationState,
          modalAnimationDispatch: modalAnimationDispatch,
        }}>
        <PickerModalAnimationContext.Provider
          value={{
            pickerModalAnimationState: pickerModalAnimationState,
            pickerModalAnimationDispatch: pickerModalAnimationDispatch,
          }}>
          <RootStack></RootStack>
        </PickerModalAnimationContext.Provider>
      </ModalAnimationContext.Provider>
    </DataContext.Provider>
  );
};

export default App;
