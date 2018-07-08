import { FETCH_BOND, FETCH_BOND_SUCCESS, FETCH_BOND_FAILURE, CHANGE_PERIOD, CHANGE_TYPE } from '../actions/bond'

const INITIAL_STATE = {
	data: null,
	period: 'week',
	type: 'price',
	error: null,
	loading: false
}
export default function(state = INITIAL_STATE, action) {
	let error;
	switch (action.type) {
		case FETCH_BOND:
			return {...state, data: {}, error: null, loading: true}
		case FETCH_BOND_SUCCESS:
			return {...state, data: action.payload, error: null, loading: false}
		case FETCH_BOND_FAILURE:
			error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
			return { ...state, data: null, error:error, loading:false}
		case CHANGE_PERIOD:
			return { ...state, period: action.payload}
		case CHANGE_TYPE:
			return { ...state, type: action.payload}
		default:
			return state
	}
}