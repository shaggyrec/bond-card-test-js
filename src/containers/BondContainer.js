import BondCard from '../components/BondCard';
import { fetchBond, fetchBondSuccess, fetchBondFailure, changePeriod, changeType } from '../actions/bond';
import { connect } from 'react-redux';

function mapStateToProps(globalState, ownProps) {
	//let path = window.location.hash
	return {
		bond: globalState.bond,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBond: isin => {
			return dispatch(fetchBond(isin))
				.then((result) => {
					if (result.payload.response && result.payload.response.status !== 200) {
						dispatch(fetchBondFailure(result.payload.response.data));
					} else {
						dispatch(fetchBondSuccess(result.payload))
					}
				})
		},
		changeChartPeriod: period => {
			return dispatch(changePeriod(period))
		},
		changeChartType: type => {
			return dispatch(changeType(type))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(BondCard);