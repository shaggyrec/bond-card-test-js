import reducer from '../reducers/bond';
import * as actions from '../actions/bond';

describe('bond reducer', () => {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual(
			{
				data: null,
				period: 'week',
				type: 'price',
				error: null,
				loading: false
			}
		)
	})
});