export const FETCH_BOND = 'FETCH_BOND';
export const FETCH_BOND_SUCCESS = 'FETCH_BOND_SUCCESS';
export const FETCH_BOND_FAILURE = 'FETCH_BOND_FAILURE';
export const CHANGE_PERIOD = 'CHANGE_PERIOD';
export const CHANGE_TYPE = 'CHANGE_TYPE';

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

export function fetchBond(isin) {
	const request = new Promise((resolve, reject) => {
		setTimeout(()=>{
			resolve(bondData);
		}, 1000);
	});
	return {
		type: FETCH_BOND,
		payload: request
	};
}

export function fetchBondSuccess(bond){
	return {
		type: FETCH_BOND_SUCCESS,
		payload: bond
	}
}
export function fetchBondFailure(error) {
	return {
		type: FETCH_BOND_FAILURE,
		payload: error
	};
}

export function changePeriod(period) {
	return {
		type: CHANGE_PERIOD,
		payload: period
	};
}
export function changeType(type) {
	return {
		type: CHANGE_TYPE,
		payload: type
	};
}
