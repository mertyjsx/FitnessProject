import React, { Component } from 'react'
import { Accordion } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FAQPro extends Component {

	constructor(props) {
		super(props)
		this.state = { activeIndex: 0 }
	}

	handleClick = (e, titleProps) => {
		const { index } = titleProps
		const { activeIndex } = this.state
		const newIndex = activeIndex === index ? -1 : index

		this.setState({ activeIndex: newIndex })
	}

	render() {
		const { activeIndex } = this.state
		return (
			<div className="about page">
				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col">
							<h1 className="text--lg">FAQ - Pro</h1>
						</div>
					</div>
					<div className="row">
						<Accordion>
							<div class="col">
								<Accordion.Title
									active={activeIndex === 0}
									index={0}
									onClick={this.handleClick}
								>Do I need to be a certified? <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
								<Accordion.Content active={activeIndex === 0}>
									<p>While it is not a requirement to be listed as a certified professional, we strongly recommend going through a certification process. For example, fitness trainers can utilize NASM or ACE certification process. Not only will you learn new techniques but you’ll also appeal to a wider client base searching for pros.</p>
								</Accordion.Content>
							</div>

							<div className="col">
								<Accordion.Title
									active={activeIndex === 1}
									index={1}
									onClick={this.handleClick}
								>How does C2B help me acquire clients? <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
								<Accordion.Content active={activeIndex === 1}>
									<p>Using the information you provide in your application, C2B creates a unique profile and features it to clients in your area. We take care of all the marketing, advertising, and client bookings on your behalf. By creating the most comprehensive online marketplace, we represent the premier source of prospective clients.</p>
								</Accordion.Content>
							</div>

							<div className="col">
								<Accordion.Title
									active={activeIndex === 2}
									index={2}
									onClick={this.handleClick}
								>How much do I get paid? <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
								<Accordion.Content active={activeIndex === 2}>
									<p>We allow you to set your own contract rate. C2B will deduct a revenue share of 25% for the value and benefits pros receive from the site.</p>
								</Accordion.Content>
							</div>

							<div className="col">
								<Accordion.Title
									active={activeIndex === 3}
									index={3}
									onClick={this.handleClick}
								>How do I get paid? <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
								<Accordion.Content active={activeIndex === 3}>
									<p>You are paid as an independent contractor. All payments are sent securely through PayPal.</p>
								</Accordion.Content>
							</div>

							<div className="col">
								<Accordion.Title
									active={activeIndex === 4}
									index={4}
									onClick={this.handleClick}
								>How many clients should I expect to get? <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
								<Accordion.Content active={activeIndex === 4}>
									<p>There are many factors that can impact how many clients you receive…</p>
									<ul><li>Your qualification</li><li>The area you live in</li><li>The number of locations you have and your willingness to travel</li><li>Your session rate (the more reasonable the rate, the more clients you should expect)</li><li>The quality of your profile picture</li></ul>
								</Accordion.Content>
							</div>

							<div className="col">
								<Accordion.Title
									active={activeIndex === 5}
									index={5}
									onClick={this.handleClick}
								>How do I let you know that I have conducted a session? <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
								<Accordion.Content active={activeIndex === 5}>
									<p>Once your application is approved, you’ll have access to the C2B Dashboard, where you can manage bookings and sessions. It is your responsibility as a pro to schedule and confirm all sessions. Once you and client confirm a session has been completed we know to send you a payment for that particular period.</p>
								</Accordion.Content>
							</div>

							<div className="col">
								<Accordion.Title
									active={activeIndex === 6}
									index={6}
									onClick={this.handleClick}
								>What are important contract details I should know?
								
								<FontAwesomeIcon icon="chevron-down" />
								</Accordion.Title>
								<Accordion.Content active={activeIndex === 6}>
									<p>Working with C2B is non-exclusive, so you are free to work with outside clients or facilities. Clients acquired through the system however, cannot be taken on the side. Soliciting students from C2B will result in the termination of our services.</p>
								</Accordion.Content>
							</div>

							<div className="col">
								<Accordion.Title
									active={activeIndex === 7}
									index={7}
									onClick={this.handleClick}
								>Where do I conduct my sessions?
								<FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
								<Accordion.Content active={activeIndex === 7}>
									<p>We rely on you to identify your own training locations. You can either meet clients at your own facility, or often the client will request that you come to them. And this depends on the services you are providing.</p>
								</Accordion.Content>
							</div>

						</Accordion>
					</div>
				</div>
			</div>
		)
	}
}

export default FAQPro