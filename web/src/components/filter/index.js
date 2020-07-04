import React, { Component } from 'react';
import search from '../../assets/images/search.png';
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
			name: '',
			pph: '',
			businessCity: '',
			All: this.props.all,
			filteredResult: this.props.all ? this.props.all : []

			// sortOrder: '',
			// sortOrders: ['Highest First', 'Lowest First']
		}



	}


	Filter = () => {
		let Filterresult = this.props.all ? this.props.all : []

		if (this.state.name) {
			Filterresult = this.props.all && this.props.all.filter(item => {
				console.log(item.firstName)

				console.log(item.firstName.includes(this.state.name.toLocaleLowerCase()))

				return (item.firstName.includes(this.state.name.toLocaleLowerCase()))


			}


			)



		}

		if (this.state.businessCity) {



			Filterresult = Filterresult.filter(item => {

				return (item.businessCity.toLocaleLowerCase().includes(this.state.businessCity.toLocaleLowerCase()))

			}
			)



		}


		console.log(Filterresult)
		if (Filterresult.length > 0) {

			this.setState({ filteredResult: Filterresult }, () => this.props.updateState({ ...this.state, MapOpen: false }))

		} else {
			this.setState({ filteredResult: this.props.all }, () => this.props.updateState({ ...this.state, MapOpen: false }))

		}




	}



	handleChange = (prop, value) => {


		this.setState({
			[prop]: value
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
		const { pph, name, businessCity } = this.state
		const { all, pphs, postcodes, count, updateFilter } = this.props
		console.log(this.state)
		return (
			<aside className="filter">
				<div className="container">
					<form
						autoComplete={false}

						noValidate
					>
						<div className="row">
							<div className="col">
								<label htmlFor="name" className="screen-reader-text">Search By Name</label>
								<input id={`name`}
									style={{ backgroundImage: `url(${search})` }}
									autoComplete={false}
									value={this.state.name}
									type="text"
									name="name"
									placeholder="Search By Name"
									onChange={(e) => this.handleChange('name', e.target.value)} />
							</div>
							<div className="col">
								<label htmlFor="businessCity" className="screen-reader-text">Search By City</label>
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
										this.setState(this.state)
										updateFilter({})
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