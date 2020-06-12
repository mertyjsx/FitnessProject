import React, { Component } from 'react'
import { Accordion } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FAQClient extends Component {

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
							<h1 className="text--lg">FAQ - Client</h1>
						</div>
					</div>
					<div className="row">
						<Accordion>
							<div class="col">
								<Accordion.Title
									active={activeIndex === 0}
									index={0}
									onClick={this.handleClick}
								>How long are sessions? <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
								<Accordion.Content active={activeIndex === 0}>
									<p>This is dependent on the professional, and can be discussed with them during consultation. Our professionals strive to be flexible and should be able to accommodate your schedule.</p>
								</Accordion.Content>
							</div>

							<div className="col">
								<Accordion.Title
									active={activeIndex === 1}
									index={1}
									onClick={this.handleClick}
								>How often should I take sessions? <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
								<Accordion.Content active={activeIndex === 1}>
									<p>You can take sessions at your own pace, but ultimately it depends on your health &amp; wellness goals. This is something you will be able to discuss with your trainer to ensure that you are taking the right number of sessions per week.</p>
								</Accordion.Content>
							</div>

							<div className="col">
								<Accordion.Title
									active={activeIndex === 2}
									index={2}
									onClick={this.handleClick}
								>Can I start with a trial session? <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
								<Accordion.Content active={activeIndex === 2}>
									<p>If you are not happy after the first session, we offer a 100% money back guarantee. We will also switch you to another professional at any point in your package if you feel like you need something different.</p>
								</Accordion.Content>
							</div>

							<div className="col">
								<Accordion.Title
									active={activeIndex === 3}
									index={3}
									onClick={this.handleClick}
								>How much does it cost? <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
								<Accordion.Content active={activeIndex === 3}>
									<p>The price of training sessions varies depending on the professional you select as well as how many sessions you purchase up front. Each&nbsp;professional’s price varies depending on their experience and area of expertise.</p>
								</Accordion.Content>
							</div>

							<div className="col">
								<Accordion.Title
									active={activeIndex === 4}
									index={4}
									onClick={this.handleClick}
								>I have a friend who wants to take sessions with me, is that OK? <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
								<Accordion.Content active={activeIndex === 4}>
									<p>Yes, we strive to offer private, semi-private sessions (2 people), and group sessions (3 or more). We do not have any set group classes that you can join, but feel free to book sessions with as many people as you want.&nbsp;&nbsp;Discuss potential discounts with the professional(s) during consultation. So taking a session with a friend will not only allow you to find your comfort zone if you have a friend by your side, but you will also save on the hourly rate.</p>
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
								>Do you offer sessions to beginners? <FontAwesomeIcon icon="chevron-down" />
								</Accordion.Title>
								<Accordion.Content active={activeIndex === 6}>
									<p>Of course! Whether you have never been into health &amp; fitness, have neglected health &amp; fitness for years, or are currently on a health &amp; fitness kick, we have a professional who can help. We understand that getting started can be the most daunting part which is why we think it is so important to sign up with a professional who can help in any of our offered categories.</p>
								</Accordion.Content>
							</div>

							<div className="col">
								<Accordion.Title
									active={activeIndex === 7}
									index={7}
									onClick={this.handleClick}
								>What happens if I need to cancel or reschedule a session? <FontAwesomeIcon icon="chevron-down" /></Accordion.Title>
								<Accordion.Content active={activeIndex === 7}>
									<p>Simply contact your coach to reschedule. To give our professionals enough time to reschedule, we request this to be done 24 hours in advance. Regarding more permanent changes such as a new location, time of day, or package plan, you can email us and we will be more than happy to find a time and location that works best for you.</p>
								</Accordion.Content>
							</div>

						</Accordion>
					</div>
				</div>
			</div>
		)
	}
}

export default FAQClient