var initialState = []
export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_WORKSPACES':  
    state = action.workspaces 
      return state;
    default:
      return state;
  }
};