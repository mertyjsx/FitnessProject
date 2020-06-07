import React, { Component } from 'react'
import animationVideo from '../../assets/videos/animation.m4v'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

class HowItWorks extends Component {
	render() {
		return (
			<div className="how-it-works page">

				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col">
							<h1 className="text--lg">How It Works</h1>
						</div>
					</div>
					<div className="row">
						<div className="col col--12">
							<p className="text--sm">Experience health &amp; wellness in all aspects of your life; make it a lifestyle. Choose your category. Browse profiles. Book your pro. Reach your goal. It’s that convenient and easy. C2Byou, work on being a better you.</p>
						</div>
						<div className="col col--12">
							<div className="video video--responsive video--small">
								<video class="video__source" preload="metadata" controls="controls">
									<source type="video/mp4" src={animationVideo} />
								</video>
							</div>
						</div>
						<div className="col col--12 text--center" style={{ justifyContent: 'center' }}>
							<Link to={'/signup'} className="button button--accent button--md">Sign Up Today</Link>
						</div>
					</div>
				</div>

				<div className="page__quote">
					<div className="container container--small container--top-bottom-padding">
						<p className="text--center text--md">Why “C2Byou” and “Them”?</p>
					</div>
				</div>

				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col col--12">
							<Table>
								<Table.Header>
									<Table.HeaderCell>Value &amp; Benefits</Table.HeaderCell>
									<Table.HeaderCell>Them</Table.HeaderCell>
									<Table.HeaderCell>C2Byou</Table.HeaderCell>
								</Table.Header>
								<Table.Row>
									<Table.Cell>Pricing</Table.Cell>
									<Table.Cell>Strict</Table.Cell>
									<Table.Cell>Flexible</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Rewards</Table.Cell>
									<Table.Cell>None</Table.Cell>
									<Table.Cell>Receive Vacations, Free Sessions or Merch</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Service Model</Table.Cell>
									<Table.Cell>Receive session through their business location</Table.Cell>
									<Table.Cell>Receive session anywhere you choose; your home, their business, or online</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Availability</Table.Cell>
									<Table.Cell>Dependant on their schedule</Table.Cell>
									<Table.Cell>Dependant on life of your device’s battery</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Pro Review Rating System</Table.Cell>
									<Table.Cell>Nonexistent</Table.Cell>
									<Table.Cell>Exists</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>100% Satisfaction</Table.Cell>
									<Table.Cell>Maybe</Table.Cell>
									<Table.Cell>We got your back, every time</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Hours of Operation</Table.Cell>
									<Table.Cell>Only on weekdays from 5am to 11pm</Table.Cell>
									<Table.Cell>Till the internet stops working</Table.Cell>
								</Table.Row>
							</Table>
						</div>
						<div className="col col--12 text--center" style={{ justifyContent: 'center' }}>
							<Link to={'/signup'} className="button button--accent button--md">Sign Up Today</Link>
						</div>
					</div>
				</div>


			</div>
		)
	}
}

export default HowItWorks