import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import PaypalModal from '../paypal/paypalModal';
import FAQUpdate from '../profileEdit/FAQUpdate';
import ImageUpload from '../profileEdit/imageUpload/ImageUpload';
import RenderImage from '../profileEdit/imageUpload/RenderImage';
import InterestsUpdate from '../profileEdit/InterestsUpdate';
import ProfileUpdate from '../profileEdit/ProfileUpdate';
import SocialUpdate from '../profileEdit/SocialUpdate';
import SpecialtiesEdit from '../profileEdit/SpecialtiesEdit';
import PhotosVideos from "./PhotosVideos";


class ProfileEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.getUrlTabIndex = this.getUrlTabIndex.bind(this)
	}

	getUrlTabIndex = (hash) => {
		var initHash = hash
		if (initHash.startsWith('#')) {
			var removeHash = initHash.replace('#', '')
			return parseInt(removeHash)
		}
		return parseInt(initHash)
	}

	render() {
		const { profile, auth, history } = this.props
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className="profile-edit">
				<Helmet>
					<title>Profile</title>
					{/* <meta name="description" content="Helmet application" /> */}
				</Helmet>

				{profile.isApproved !== true && profile.isPro ?
					<div className="status status--warning">
						<div className="container">
							<p>Your profile is currently being reviewed by one our admins. <Link to="/contact">Contact us</Link> if you have any questions.</p>
						</div>
					</div>
					: null}

				<div className="container container--top-bottom-padding container--small">

					<div className="row">
						<div className="col">
							<div className={`bookings__head`}>
								<h1 className={`text--lg text--uppercase`}>Profile</h1>
							</div>
						</div>
					</div>

					{profile.isPro && !profile.isProPremium && (
						<div className={`row`}>
							<div className={`col`}>
								<div className={`status status--secondary status--success`} style={{ width: '100%', marginBottom: '20px' }}>
									{/* <Link to={`upgrade-pro`} className={`link link--light`}>Want to become a Pro Premium? <strong>Click here</strong> to upgrade your account today.</Link> */}
									<PaypalModal
										buttonText={`Want to become a Pro Premium? Click here to upgrade your account today.`}
										buttonClass={`link link--light`}
									/>
								</div>
							</div>
						</div>
					)}

					{profile.isPro && profile.isProPremium && (
						<div className={`row`}>
							<div className={`col`}>
								<div className={``} style={{ width: '100%', marginBottom: '20px' }}>
									<p>You're a Pro Premium! Enjoy the benefits of Premium with Video, Galleries, and adding your social accounts!</p>
								</div>
							</div>
						</div>
					)}

					<div className="row">
						<div className="col">
							<Tabs defaultIndex={this.getUrlTabIndex(history.location.hash)}>
								<TabList>
									<Tab>Profile</Tab>
									<Tab>Image</Tab>
									<Tab>Interests</Tab>
									{profile.isPro && (<Tab>Specialties</Tab>)}
									{profile.isPro && (<Tab>Social</Tab>)}
									{profile.isPro && (<Tab>FAQ</Tab>)}
									{profile.isPro && (<Tab>Photos/Videos</Tab>)}
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
								<TabPanel>
									<InterestsUpdate />
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
								{profile.isPro && (
									<TabPanel>
										<PhotosVideos />
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