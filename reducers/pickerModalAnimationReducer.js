const pickerModalAnimationReducer = (state, action) => {
  switch (action.type) {
    case 'hideModal': {
      const newState = {
        ...state,
        isModalVisible: false,
      };

      return newState;
    }
    case 'presentModal': {
      const newState = {
        ...state,
        isModalVisible: true,
      };

      return newState;
    }

    default:
      return state;
  }
};

export {pickerModalAnimationReducer};
