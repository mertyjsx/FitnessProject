import React, { Component } from 'react'
import Notifications from '../dashboard/Notifications'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Home extends Component {
	render() {
		// console.log(this.props)
		const { projects, auth, notifications } = this.props
		// if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className="home">

				<div className="home__hero">
					<div className="container">
						<div className="row">
							<div className="col">
								<div className="home__hero-inner">
									<div className="home__hero-content">
										<h2 className="text--uppercase text--lg">We send health &amp; fitness pros<br />
										right to your door</h2>
									</div>
									<div className="home__hero-search">

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="home__works">
					<div className="container">
						<div className="row">
							<div className="col">
								<div className="home__works-content text--center">
									<h2>How it works</h2>
									<p className="text--sm mb--0">Choose your category. Browse profiles. Find your match.</p>
									<p className="text--sm">Then get ready to achieve your health and fitness goals.</p>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Carousel className="carousel-content" showStatus={false} showThumbs={false} showArrows={true} autoPlay={true}>
									<div key="slide1" className="carousel-content__slide">
										<FontAwesomeIcon size="4x" icon="user" />
										<p className="text--md">Find nearby fitness professionals in your area</p>
									</div>
									<div key="slide2" className="carousel-content__slide">
										<FontAwesomeIcon size="4x" icon="dollar-sign" />
										<p className="text--md">The Right Pro, For the Right Price</p>
									</div>
									<div key="slide3" className="carousel-content__slide">
										<FontAwesomeIcon size="4x" icon="users" />
										<p className="text--md">Community You Can Rely On</p>
									</div>
									<div key="slide4" className="carousel-content__slide">
										<FontAwesomeIcon size="4x" icon="check-circle" />
										<p className="text--md">C2B Certified</p>
									</div>
									<div key="slide5" className="carousel-content__slide">
										<FontAwesomeIcon size="4x" icon="book" />
										<p className="text--md">Resources to Support Your Fitness Journey</p>
									</div>
									<div key="slide6" className="carousel-content__slide">
										<FontAwesomeIcon size="4x" icon="handshake" />
										<p className="text--md">Security Through Using Our Platform</p>
									</div>
									<div key="slide7" className="carousel-content__slide">
										<FontAwesomeIcon size="4x" icon="hand-peace" />
										<p className="text--md">Positivity, Always</p>
									</div>
								</Carousel>
							</div>
						</div>
					</div>
				</div>


				<div className="container">
					<div className="row">
						<div className="col">
							<ProjectList projects={projects} />
						</div>
					</div>
					<div className="row">
						<div className="col">
							<Notifications notifications={notifications} />
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
		projects: state.firestore.ordered.projects,
		auth: state.firebase.auth,
		notifications: state.firestore.ordered.notifications
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'projects', orderBy: ['createdAt', 'desc'] },
		{ collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
	])
)(Home)