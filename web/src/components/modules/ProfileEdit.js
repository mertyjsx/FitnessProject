import React, { Component } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import SpecialtiesEdit from '../profileEdit/SpecialtiesEdit';
import ProfileUpdate from '../profileEdit/ProfileUpdate';

class ProfileEdit extends Component {
	render() {
		const { profile, auth } = this.props
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className="bookings">
				<div className="container container--top-bottom-padding container--small">
					<div className="row">
						<div className="col">
							<div className={`bookings__head`}>
								<h1 className={`text--lg text--uppercase`}>Profile</h1>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col">
							<Tabs>
								<TabList>
									<Tab>Profile</Tab>
									<Tab>Specialties</Tab>
									<Tab>Image</Tab>
									<Tab>Social</Tab>
									<Tab>FAQ</Tab>
								</TabList>
								<TabPanel>
									<ProfileUpdate />
								</TabPanel>
								<TabPanel>
									<SpecialtiesEdit auth={auth} profile={profile} />
								</TabPanel>
								<TabPanel>
									image
								</TabPanel>
								<TabPanel>
									social
								</TabPanel>
								<TabPanel>
									faq
								</TabPanel>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default connect(mapStateToProps)(ProfileEdit)