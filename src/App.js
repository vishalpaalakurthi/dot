import React from "react"; 
import { Provider } from "react-redux"; 
import { createBrowserHistory } from "history";

import AppRouter from "./AppRouter.js";
import configureStore from "./store";
   
  const history = createBrowserHistory();
  const store = configureStore();
 
const App = () => (
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>
);

export default App;
