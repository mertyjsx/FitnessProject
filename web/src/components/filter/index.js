import React, { Component } from 'react'

function getSortOrderValue(sortOrder) {
	return sortOrder.replace(' ', '').toLowerCase()
}

function getPropertiesDisplayText(count) {
	if (count > 1 || count === 0) {
		return 'properties'
	}
	return 'property'
}

const DefaultState = {
	priceFrom: '',
	pph: '',
	businessCity: '',
	sortOrder: '',
	sortOrders: ['Highest First', 'Lowest First']
}

class Filter extends Component {

	state = Object.assign({}, DefaultState)

	handleChange = (prop, value) => {
		this.setState({
			[prop]: value
		})
	}

	render() {
		const { pph, businessCity } = this.state
		const { pphs, postcodes, count, updateFilter } = this.props

		return (
			<aside className="filter">
				<div className="container container--full">
					<form
						onChange={() => setTimeout(() => updateFilter(this.state), 0)}
						noValidate
					>
						<div className="row">
							<div className="col">
								<label htmlFor="name">Where?</label>
								<input id={`businessCity`}
									defaultValue={this.state.businessCity}
									type="text"
									placeholder="Where?"
									onChange={(e) => this.handleChange('businessCity', e.target.value)} />
							</div>
							<div className="col">
								<select
									id={`pph`}
									value={this.state.pph}
									onChange={e => this.handleChange('pph', e.target.value)}>
									<option value="">Price Per Hour</option>
									<option value="49">Up to $49</option>
									<option value="50">$50 - $74</option>
									<option value="75">$75 - $99</option>
									<option value="100">$100 +</option>
								</select>
							</div>
							<div className="col">
								{/* <input type="text" placeholder="Enter item to be searched" onChange={(e) => this.searchByName(e)} /> */}
								<select
									id="sortorder"
									value={this.state.sortOrder}
									onChange={e => this.setState({ sortOrder: e.target.value })} >
									<option value="">Choose...</option>
									{this.state.sortOrders.map(order => (
										<option key={order} value={order.replace(' ', '').toLowerCase()}>
											{order}
										</option>
									))}
								</select>
							</div>
							<div className="col">
								<button>Filters</button>
								<div>
									<button
										data-cy="clear-button"
										type="button"
										onClick={() => {
											this.setState(Object.assign({}, DefaultState))
											updateFilter({})
										}}
									>Clear</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</aside>
		)
	}
}

export default Filter