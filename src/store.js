import {createStore,combineReducers} from 'redux'
import userReducer from './reducers/userReducer'
import workspaceReducer from './reducers/workspacesReducer' 
const RootReducer = combineReducers({
  user: userReducer,
  workspaces: workspaceReducer, 
})

const configureStore = ()=>createStore(RootReducer);
export default configureStore;