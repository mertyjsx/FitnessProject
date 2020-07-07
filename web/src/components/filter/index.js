import React, { Component } from 'react';
import where from '../../assets/images/where.png';

function getSortOrderValue(sortOrder) {
	return sortOrder.replace(' ', '').toLowerCase()
}

function getPropertiesDisplayText(count) {
	if (count > 1 || count === 0) {
		return 'properties'
	}
	return 'property'
}


class Filter extends Component {

	constructor(s) {
		super(s)
		this.state = {
			adress: "",
			ptype: '',
			pph: '',
			businessCity: '',
			All: this.props.all,
			filteredResult: this.props.all ? this.props.all : [],
			noProsFound: "No Pros Found"
			// sortOrder: '',
			// sortOrders: ['Highest First', 'Lowest First']
		}
	}

	Filter = () => {
		let Filterresult = this.props.all ? this.props.all : []
		if (this.state.ptype) {
			Filterresult = this.props.all && this.props.all.filter(item => {
				return (item.professions[this.state.ptype])
			})
		}

		if (this.state.businessCity) {
			Filterresult = Filterresult.filter(item => {
				let State = item.businessState ? item.businessState : ""
				let Zip = item.businessZip ? item.businessZip : ""
				let City = item.businessCity ? item.businessCity : ""
				let proAdress = `${State}${Zip}${City}`
				// console.log(proAdress)
				return (proAdress.toLocaleLowerCase().includes(this.state.businessCity.toLocaleLowerCase()))
			})
		}


		if (this.state.pph) {
			Filterresult = Filterresult.filter(pro => {
				var proRates = []
				pro.ratesInPersonChef && proRates.push(parseInt(pro.ratesInPersonChef))
				pro.ratesOnlineChef && proRates.push(parseInt(pro.ratesOnlineChef))
				pro.ratesInPersonFitnessTrainer && proRates.push(parseInt(pro.ratesInPersonFitnessTrainer))
				pro.ratesOnlineFitnessTrainer && proRates.push(parseInt(pro.ratesOnlineFitnessTrainer))
				pro.ratesInPersonMassageTherapist && proRates.push(parseInt(pro.ratesInPersonMassageTherapist))
				pro.ratesOnlineMassageTherapist && proRates.push(parseInt(pro.ratesOnlineMassageTherapist))
				pro.ratesInPersonNutritionist && proRates.push(parseInt(pro.ratesInPersonNutritionist))
				pro.ratesOnlineNutritionist && proRates.push(parseInt(pro.ratesOnlineNutritionist))
				proRates.sort((a, b) => a - b);
				console.log(Number(this.state.pph) > proRates[0])
				return (
					Number(this.state.pph) >= proRates[0]
				)
			})
		}

		if (Filterresult.length > 0) {
			this.setState({ filteredResult: Filterresult }, () => this.props.updateState({ ...this.state, MapOpen: false, noProsFound: "" }))
		} else {
			this.setState({ filteredResult: [] }, () => this.props.updateState({ ...this.state, MapOpen: false, noProsFound: "yep" }))
		}
	}



	handleChange = (prop, value) => {
		this.setState({
			[prop]: value
		}, () => this.Filter())
	}

	resetFilter = () => {
		this.setState({
			filteredResult: this.props.all,
			adress: "",
			ptype: '',
			pph: '',
			businessCity: '',
			All: this.props.all,
		}, () => this.Filter())
	}

	renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
		<div className="autocomplete-root">
			<input {...getInputProps()} />
			<div className="autocomplete-dropdown-container">
				{loading && <div>Loading...</div>}
				{suggestions.map(suggestion => (
					<div {...getSuggestionItemProps(suggestion)}>
						<span>{suggestion.description}</span>
					</div>
				))}
			</div>
		</div>
	);

	render() {
		const { all, pphs, postcodes, count, updateFilter } = this.props
		return (
			<aside className="filter">
				<div className="container">
					<form autoComplete={false} noValidate>
						<div className="row">
							<div className="col">
								<label htmlFor="ptype" className="screen-reader-text">Pro type</label>
								<select
									id={`ptype`}
									// style={{ backgroundImage: `url(${dollar})` }}
									value={this.state.ptype}
									onChange={e => this.handleChange('ptype', e.target.value)}>
									<option value="">Pro Type</option>
									<option value="fitnessTrainer">Fitness Trainer</option>
									<option value="chef">Chef</option>
									<option value="massageTherapist">Message Therapist</option>
									<option value="nutritionist">Nutritionist</option>

								</select>
							</div>
							<div className="col">
								<label htmlFor="businessCity" className="screen-reader-text">Search By City,ZipCode,State</label>
								<input id={`businessCity`}
									style={{ backgroundImage: `url(${where})` }}
									value={this.state.businessCity}
									type="text"
									name="businessCity"
									placeholder="Search By City"
									onChange={(e) => this.handleChange('businessCity', e.target.value)} />
							</div>


							<div className="col">
								<label htmlFor="pph" className="screen-reader-text">Search By Price</label>
								<select
									id={`pph`}
									// style={{ backgroundImage: `url(${dollar})` }}
									value={this.state.pph}
									onChange={e => this.handleChange('pph', e.target.value)}>
									<option value="">Price Per Hour</option>
									<option value="25">Up to $25</option>
									<option value="50">Up to $50</option>
									<option value="75">Up to $75</option>
									<option value="100">Up to $100</option>
									<option value="10000">$101 +</option>
								</select>
							</div>

							<div className="col">
								<button
									className="button"
									data-cy="clear-button"
									type="button"
									onClick={() => {
										this.resetFilter()
									}}
								>Reset Filter</button>
							</div>
						</div>
					</form>
				</div>
			</aside>
		)
	}
}

export default Filter