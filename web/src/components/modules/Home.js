import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Link } from 'react-router-dom'
import { compose } from 'redux'

class Home extends Component {
	render() {
		// console.log(this.props)
		const { projects, auth, notifications, splash } = this.props
		// if (!auth.uid) return <Redirect to='/signin' />
		if (splash === true) {
			return (
				<div className="home">
					<div className="home__hero">
						<div className="container">
							<div className="row">
								<div className="col">
									<div className="home__hero-inner">
										<div className="home__hero-content">
											<h2 className="text--uppercase text--lg">Work on being a better you.</h2>
											<p className="text--uppercase text--sm">Coming Soon.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="home">

					<div className="home__hero">
						<div className="container">
							<div className="row">
								<div className="col">
									<div className="home__hero-inner">
										<div className="home__hero-content">
											<h2 className="text--uppercase text--lg">Be the best version of you.</h2>
											<p className="text--uppercase text--sm">Connect with local health &amp; wellness pros</p>
											<div className="home__hero-search">
												<Link to={'/find-a-pro'} className={'button button--accent button--md'}>Search Pros</Link>
											</div>
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
								<div className="col" style={{ width: '100%', padding: '0' }}>
									<Carousel className="carousel-content" showStatus={false} showThumbs={false} showArrows={true} autoPlay={true}>
										<div key="slide1" className="carousel-content__slide">
											<FontAwesomeIcon size="4x" icon="user" />
											<p className="text--md text--bold">Search for a health &amp; wellness service in your zip code or city.</p>
											<p className="text--sm">Find nearby fitness professionals in your area</p>
										</div>
										<div key="slide2" className="carousel-content__slide">
											<FontAwesomeIcon size="4x" icon="dollar-sign" />
											<p className="text--md text--bold">Choose the right pro for you.</p>
											<p className="text--sm">You can browse different profiles, compare prices, bookmark your favorites, and use filters to find pros who match your needs</p>
										</div>
										<div key="slide3" className="carousel-content__slide">
											<FontAwesomeIcon size="4x" icon="users" />
											<p className="text--md text--bold">Check availability and book pros right through our platform.</p>
											<p className="text--sm">You can message your pro to discuss more details.</p>
										</div>
										{/* <div key="slide4" className="carousel-content__slide">
											<FontAwesomeIcon size="4x" icon="check-circle" />
											<p className="text--md text--bold">Get ready to experience a positive, motivating lifestyle.</p>
											<p className="text--sm">You can earn “points” towards bonuses like free sessions, vacation trips, and fresh gear, every time you book through us</p>
										</div> */}
									</Carousel>
								</div>
							</div>
						</div>
					</div>

					<div className="home__pro">
						<div className="container">
							<div className="row">
								<div className="col col--5"></div>
								<div className="col col--7">
									<h2 className="text--lg text--uppercase">Are you a five-star pro?</h2>
									<p className="text--sm" style={{ flex: '0 1 100%' }}>Join our platform to reach thousands of potential clients.</p>
									<Link to="/join-as-pro" className="button button--accent button--md">Learn More</Link>
								</div>
							</div>
						</div>
					</div>

					<div className="home__about">
						<div className="container">
							<div className="row">
								<div className="col col--1"></div>
								<div className="col col--10 text--center">
									<h2 className="text--lg text--uppercase" style={{ flex: '0 1 100%' }}>Who We Are</h2>
									<p className="text--sm">We created Choose To Be You (C2Byou) to help people lead a healthier
									lifestyle -- and we haven’t stopped building since. C2Byou is a platform
									where you can book health &amp; wellness pros instantly online, based on
									your convenience, and get the resources you need to live a healthy &amp;
									happy life.</p>
									<Link to="/about" style={{ margin: 'auto' }} className="button button--accent button--md">About C2Byou</Link>
								</div>
							</div>
						</div>
					</div>


					{/* <div className="container">
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
				</div> */}
				</div>
			)
		}
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