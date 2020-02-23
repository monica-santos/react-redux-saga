/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux'
import rootReducer from './modules/rootReducer'

const enhancer =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : null

const store = createStore(rootReducer, enhancer)

export default store
