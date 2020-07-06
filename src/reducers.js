export default (previousState = {}, action) => {
  if (action.type === "UPDATE_USER") {
    return { ...previousState, user: { ...action.user } };
  } else if (action.type === "UPDATE_WORKSPACES") {
    return { ...previousState, workspaces: { ...action.workspaces } };
  } else if (action.type === "ADD_SNIP") { 
  } else if (action.type === "ADD_TAG") {
  } else if (action.type === "DELETE_TAG") {
  } else if (action.type === "REMOVE_FOLDER") {
      
  } else return previousState;
};
