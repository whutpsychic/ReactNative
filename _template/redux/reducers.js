const initializingReducer = (state = true, action) => {
  switch (action.type) {
    case 'INITIALIZING':
      return action.value;
    default:
      return state;
  }
};

const isLoginReducer = (state = false, action) => {
  switch (action.type) {
    case 'ISLOGIN':
      return action.value;
    default:
      return state;
  }
};

export {initializingReducer, isLoginReducer};
