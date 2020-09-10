const setURLReducer = (state = 'http://192.168.100.224', action) => {
  switch (action.type) {
    case 'SETURL':
      return action.value;
    default:
      return state;
  }
};

const setPortReducer = (state = '3000', action) => {
  switch (action.type) {
    case 'SETPORT':
      return action.value;
    default:
      return state;
  }
};

export {setURLReducer, setPortReducer};
