import * as actions from '../actions/bond';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
	it('should create an action to change chart type', () => {
		const newType = 'spread';
		const expectedAction = {
			type: actions.CHANGE_TYPE,
			payload:newType
		}
		expect(actions.changeType(newType)).toEqual(expectedAction)
	})
	it('should create an action to change chart period', () => {
		const newPeriod = 'year';
		const expectedAction = {
			type: actions.CHANGE_PERIOD,
			payload:newPeriod
		}
		expect(actions.changePeriod(newPeriod)).toEqual(expectedAction)
	})
});
describe('async actions', () => {
	afterEach(() => {
		nock.cleanAll()
	})
	
	it('creates FETCH_BOND_SUCCESS when fetching bond has been done', () => {
		let bondData = [];
		const now = +(new Date())
		for(let i=0; i < 365 * 3; i++){
			bondData.push({
				date: now + (1000*3600*24) * i+1,
				price: Math.random() * (100 - 1) + 1,
				yield: Math.random() * (100 - 1) + 1,
				spread: Math.random() * (100 - 1) + 1
			})
		}
		nock('/api')
			.get('/bond')
			.reply(200, { body: bondData});
		
		const expectedActions = [
			{ type: actions.FETCH_BOND },
			{ type: actions.FETCH_BOND_SUCCESS, body: bondData }
		]
		const store = mockStore({ bond: bondData })
		
		return store.dispatch(actions.fetchBond('issin'))
			.then(() => { // return of async actions
				expect(store.getActions()).toEqual(expectedActions)
			})
	})
});