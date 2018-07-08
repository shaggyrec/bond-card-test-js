import React, { Component } from 'react';
import './Bond.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer} from 'recharts';

class BondCard extends Component {
	state = {
		periodOffset:{
			week:7,
			month:30,
			quarter:61,
			year: 365
		}
	}
	constructor(props) {
		super(props);
		this.changePeriod = this.changePeriod.bind(this);
		this.changeType = this.changeType.bind(this)
	}
	componentWillMount() {
	  const issin = 'issin' // fake issin
		this.props.fetchBond(issin);
	}
	changePeriod(newPeriod){
		this.props.changeChartPeriod(newPeriod);
	}
	changeType(e){
		this.props.changeChartType(e.target.value);
	}
	makeChartData({data,period,type}){
		const { periodOffset } = this.state;
		let chartData = [];
		for(let i=0; i < data.length;){
			let current = data[i];
			const date = new Date(current.date);
			const day = date.getDate();
			const month = date.getMonth()+1;
			const year = date.getFullYear();
			let curData = {
				name: `${day}.${month}.${year}`,
			};
			curData[type] = current[type];
			chartData.push(curData);
			i+=periodOffset[period];
		}
		return chartData;
	}
	renderChart(data){
		if(!data){
			return <div/>
		}
		const { type, period } = this.props.bond;
		let chartData = this.makeChartData({data,period,type});
		
		return(
			<div className="bondChart">
				<ResponsiveContainer>
					<LineChart data={chartData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey={type} stroke="#8884d8" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		)
	}
	renderPeriodChanger(){
		const { period } = this.props.bond;
		return (
			<div className="period">
				<button className={`period__button ${period === 'week' ? 'active' : ''}`} onClick={e => this.changePeriod('week')}>week</button>
				<button className={`period__button ${period === 'month' ? 'active' : ''}`} onClick={e => this.changePeriod('month')}>Month</button>
				<button className={`period__button ${period === 'quarter' ? 'active' : ''}`} onClick={e => this.changePeriod('quarter')}>Quarter</button>
				<button className={`period__button ${period === 'year' ? 'active' : ''}`} onClick={e => this.changePeriod('year')}>Year</button>
			</div>
		)
	}
	renderTypeChanger(){
		return (
			<div className="type">
				<select className="type__select" onChange={this.changeType}>
					<option>price</option>
					<option>spread</option>
					<option>yield</option>
				</select>
			</div>
		)
	}
  render() {
	  const { data, loading, error } = this.props.bond
	  if(loading) {
		  return (
        <div>
          loading
        </div>
		  );
	  } else if (error){
		  return (
        <div>
          error
        </div>
		  );
    }else {
		  return (
        <div className="bondCard">
	        <h1>NII capital</h1>
	        <p>US6702123</p>
	        <hr/>
	        {this.renderPeriodChanger()}
	        {this.renderChart(data)}
	        {this.renderTypeChanger()}
        </div>
		  );
	  }
  }
}

export default BondCard;
