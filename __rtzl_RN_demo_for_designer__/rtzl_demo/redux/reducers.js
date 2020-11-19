const initializingReducer = (state = true, action) => {
  switch (action.type) {
    case 'INITIALIZING':
      return action.value;
    default:
      return state;
  }
};

const set_MMBN1_Reducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_MAIN_MENU_BADGE1':
      return action.value;
    default:
      return state;
  }
};

const set_MMBN2_Reducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_MAIN_MENU_BADGE2':
      return action.value;
    default:
      return state;
  }
};

const set_MMBN3_Reducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_MAIN_MENU_BADGE3':
      return action.value;
    default:
      return state;
  }
};

const set_MMBN4_Reducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_MAIN_MENU_BADGE4':
      return action.value;
    default:
      return state;
  }
};

export {
  initializingReducer,
  set_MMBN1_Reducer,
  set_MMBN2_Reducer,
  set_MMBN3_Reducer,
  set_MMBN4_Reducer,
};
