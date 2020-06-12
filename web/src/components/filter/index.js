import React, { Component } from 'react'
import search from '../../assets/images/search.png'
import where from '../../assets/images/where.png'
import dollar from '../../assets/images/dollar.png'


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
	name: '',
	pph: '',
	businessCity: '',
	// sortOrder: '',
	// sortOrders: ['Highest First', 'Lowest First']
}

class Filter extends Component {

	state = Object.assign({}, DefaultState)

	handleChange = (prop, value) => {
		this.setState({
			[prop]: value
		})
	}

	render() {
		const { pph, name, businessCity } = this.state
		const { pphs, postcodes, count, updateFilter } = this.props

		return (
			<aside className="filter">
				<div className="container">
					<form
						autoComplete={false}
						onChange={() => setTimeout(() => updateFilter(this.state), 0)}
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
										this.setState(Object.assign({}, DefaultState))
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