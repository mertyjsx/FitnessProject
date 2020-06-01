import React, { Component } from 'react'
import Notifications from '../dashboard/Notifications'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import Search from '../search/Search'
import ProList from '../search/ProList'
import ProCard from '../search/ProCard'
import Filter from '../filter'
import {
	ProActiveListingsProvider,
	ProActiveListingsConsumer
} from '../../context/ProActiveListingsProvider'

class FindAPro extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: null,
			priceRange: null
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

	render() {
		const { users, auth, profile } = this.props

		// const profiles = users && users.map(pro => {
		// 	const profileUrl = pro.username ? pro.username : pro.id;
		// 	if (pro.isPro !== true || pro.isApproved !== true) { return null }
		// 	return (
		// 		<Link className={`pro-list__card col col--6`} to={'/pro/' + pro.uid} key={pro.id}>
		// 			<ProCard pro={pro} />
		// 		</Link>
		// 	)
		// })

		return (
			<div className="find-pro">
				<div className="container">
					<ProActiveListingsProvider>
						<ProActiveListingsConsumer>
							{({ proActiveListings, allListings, updateFilter }) => (
								<>
									<Filter
										updateFilter={updateFilter}
										// count={proActiveListings.length}
										pph={allListings.filter(item => item.rates)}
									/>
									<div className="row">
										{proActiveListings && proActiveListings.map(pro => (
											<Link className={`pro-list__card col col--6`} to={'/pro/' + pro.uid} key={pro.uid}>
												<ProCard pro={pro} />
											</Link>
										))}
									</div>
								</>
							)}
						</ProActiveListingsConsumer>
					</ProActiveListingsProvider>
				</div>
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