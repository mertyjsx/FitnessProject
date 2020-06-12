import React, { Component } from 'react'
import animationVideo from '../../assets/videos/animation.m4v'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class HowProWorks extends Component {
	render() {
		return (
			<div className="how-it-works page">

				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col">
							<h1 className="text--lg">Join As Pro</h1>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<Carousel className="carousel-about" interval={5000} showStatus={false} showThumbs={false} showArrows={false} autoPlay={true} infiniteLoop={true}>
								<div key="slide1" className="carousel-about">
									<h2>Pro Standards</h2>
									<p className="text--sm">Being a C2Byou Professional (pro) is more than just a way to get clients. A
									C2Byou pro is here to serve, grow in the industry, and educate their clients. Our
									pros are given the opportunity to help someone live a happier and healthier life,
									which is not only significant to them, but also to their loved ones. Always keep in
									mind that as a C2Byouo Pro, you will be responsible for providing a 5-star experience to every client.</p>
								</div>
								<div key="slide2" className="carousel-about">
									<h2>Your Business Made Perfect</h2>
									<p className="text--sm">From attracting new clients to reducing no-shows and providing
									a platform to jumpstart your business, C2Byou helps you be the best pro you can be.</p>
									<Link to="/join-as-pro" className="button button--secondary button--md">Apply Now</Link>
								</div>
								<div key="slide3" className="carousel-about">
									<h2>Match Generation</h2>
									<p className="text--sm">Complete and submit your application and profile. Once accepted, your
									profile will be visible to prospective clients who use our search engine.
									Professionals will also receive client leads via email, text, or call (only Premium members)</p>
								</div>
								<div key="slide4" className="carousel-about">
									<h2>Insurance</h2>
									<p className="text--sm">We encourage all professionals to obtain insurance to be protected against any client claims. Here are a few suggested insurers: IdeaFit, NASM, Hiscox</p>
								</div>
							</Carousel>
						</div>
					</div>
				</div>

				<div className="page__quote">
					<div className="container container--small container--top-bottom-padding text--center">
						<p className="text--center text--md text--bold">Why Choose To Be You?</p>
						<p className="text--center text--sm">Experience an increase in your client base.</p>
						<p className="text--center text--sm">Enhance your brand and marketability.</p>
						<p className="text--center text--sm">Receive rewards and recognition for your efforts.</p>
						<p className="text--center text--sm">Be a part of a motivated, positive culture.</p>
						<p className="text--center text--sm">Choose to win, by choosing Choose To Be You.</p>
						<Link to={'/join-as-pro'} style={{ margin: 'auto' }} className="button button--accent button--md">Join As Pro</Link>
					</div>
				</div>

				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col col--12">
							<Table style={{ width: '100%' }}>
								<Table.Header>
									<Table.HeaderCell className={'text--sm text--bold'} style={{ width: '33%' }}>Features</Table.HeaderCell>
									<Table.HeaderCell className={'text--sm text--bold'} style={{ width: '33%' }}>Premium Listing:<br />$30 per month</Table.HeaderCell>
									<Table.HeaderCell className={'text--sm text--bold'} style={{ width: '33%' }}>Basic Listing:<br />Free</Table.HeaderCell>
								</Table.Header>
								<Table.Row>
									<Table.Cell>Availability Calendar</Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Location</Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Social Links</Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#f08080'} icon={["fa", "times-circle"]} /></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Website Link</Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#f08080'} icon={["fa", "times-circle"]} /></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Rewards</Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Recognition</Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#f08080'} icon={["fa", "times-circle"]} /></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Photos/Videos</Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#f08080'} icon={["fa", "times-circle"]} /></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Reviews</Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Additional Leads</Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#f08080'} icon={["fa", "times-circle"]} /></Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Access to Social Community</Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#1b4588'} icon={["fa", "check-circle"]} /></Table.Cell>
									<Table.Cell style={{ textAlign: 'center', fontSize: '28px' }}><FontAwesomeIcon color={'#f08080'} icon={["fa", "times-circle"]} /></Table.Cell>
								</Table.Row>
							</Table>
						</div>
						<div className="col col--12 text--center" style={{ justifyContent: 'center' }}>
							<Link to={'/join-as-pro'} className="button button--accent button--md">Join As Pro</Link>
						</div>
					</div>
				</div>


			</div>
		)
	}
}

export default HowProWorks