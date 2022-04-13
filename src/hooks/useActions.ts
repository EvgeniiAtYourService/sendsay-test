import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CalcActionCreators from '../redux/calc.action-creators'

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(CalcActionCreators, dispatch)
}
