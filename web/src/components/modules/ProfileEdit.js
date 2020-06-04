import React, { Component } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import SpecialtiesEdit from '../profileEdit/SpecialtiesEdit';
import ProfileUpdate from '../profileEdit/ProfileUpdate';
import RenderImage from '../profileEdit/imageUpload/RenderImage'
import ImageUpload from '../profileEdit/imageUpload/ImageUpload'
import SocialUpdate from '../profileEdit/SocialUpdate';
import FAQUpdate from '../profileEdit/FAQUpdate';

class ProfileEdit extends Component {
	render() {
		const { profile, auth } = this.props
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className="profile-edit">
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
									<Tab>Image</Tab>
									{profile.isPro && (<Tab>Specialties</Tab>)}
									{profile.isPro && (<Tab>Social</Tab>)}
									{profile.isPro && (<Tab>FAQ</Tab>)}
								</TabList>
								<TabPanel>
									<ProfileUpdate />
								</TabPanel>
								<TabPanel>
									<div className="profile-edit__image">
										<RenderImage />
										<ImageUpload />
									</div>
								</TabPanel>
								{profile.isPro && (
									<TabPanel>
										<SpecialtiesEdit />
									</TabPanel>
								)}
								{profile.isPro && (
									<TabPanel>
										<SocialUpdate />
									</TabPanel>
								)}
								{profile.isPro && (
									<TabPanel>
										<FAQUpdate />
									</TabPanel>
								)}
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