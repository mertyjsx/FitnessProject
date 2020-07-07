import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button } from 'semantic-ui-react'
import { ProActiveListingsConsumer, ProActiveListingsProvider } from '../../context/ProActiveListingsProvider'
import Filter from '../filter'
import Map from "../googleMaps/googleMaps"
import ProCard from '../search/ProCard'

class FindAPro extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: null,
			priceRange: null,
			searchingResults: { MapOpen: false },

		};
	}

	searchByName = (e) => {
		let keyword = e.target.value;
		this.setState({
			search: keyword
		})
	}

	filterPrice = (e) => {
		let price = e.target.value
		this.setState({
			priceRange: price
		})
	}


	getPropsChildren = (newState) => {
		console.log(newState)
		this.setState({ searchingResults: newState })

	}


	render() {
		const { users, auth, profile } = this.props
		const { searchingResults } = this.state
		console.log(searchingResults)
		return (
			<div className="find-pro">
				<ProActiveListingsProvider>
					<ProActiveListingsConsumer>
						{({ proActiveListings, allListings, updateFilter }) => {

							let ListPros = searchingResults.filteredResult ? searchingResults.filteredResult : allListings
let notFound=searchingResults.noProsFound
console.log(notFound)
							return (
								<>
									<Filter
										updateFilter={updateFilter}
										count={proActiveListings.length}
										businessCity={proActiveListings
											.map(pro => pro.businessCity)
											.filter((item, i, arr) => arr.indexOf(item) === i)}
										all={allListings}
										updateState={this.getPropsChildren}
										pph={allListings.filter(item => item.rates)}
									/>

									<div className="container" style={{ marginTop: '15px' }}>
										{searchingResults.MapOpen ?
											(
												<>
													<Button style={{ width: '100%' }} onClick={() => this.setState({ searchingResults: { ...searchingResults, MapOpen: false } })}>Close Map</Button>
													<Map
														filteredResult={ListPros}
														open={searchingResults.MapOpen}
													/>
												</>

											) : (<Button className="button--secondary" style={{ width: '100%' }} onClick={() => this.setState({ searchingResults: { ...searchingResults, MapOpen: true } })}>View Map</Button>)}

									</div>

									<div className="container">
										<div className="row">
											{ListPros && ListPros.map(pro => (
												<Link className={`pro-list__card col col--6`} to={'/pro/' + pro.uid} key={pro.uid}>
													<ProCard pro={pro} />
												</Link>
											))}
{

	notFound&&<h1>No Pros Found</h1>
}


										</div>
									</div>
								</>
							)
						}}
					</ProActiveListingsConsumer>
				</ProActiveListingsProvider>
			</div >
		)
	}
}

const mapStateToProps = (state) => {
	// console.log(state.firestore.ordered);
	return {
		users: state.firestore.ordered.users,
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'users' }
	])
)(FindAPro)