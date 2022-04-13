import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { CalcReducer } from './calc.reducer'

const reducers = combineReducers({
  calcState: CalcReducer,
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware()))

export type RootState = ReturnType<typeof reducers>

export default store
