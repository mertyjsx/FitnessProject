import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as emailjs from 'emailjs-com'
import { ReCaptcha } from 'react-recaptcha-google'


class UserTest extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			modalOpen: false,
			name: '',
			email: 'beta@angelcenteno.com',
			subject: '',
			message: '',
			formSent: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this)
		this.verifyCallback = this.verifyCallback.bind(this)
	}

	componentDidMount() {
		// loadReCaptcha();
		if (this.captchaDemo) {
			console.log("started, just a second...")
			this.captchaDemo.reset();
		}
	}

	onLoadRecaptcha() {
		if (this.captchaDemo) {
			this.captchaDemo.reset();
		}
	}

	verifyCallback(recaptchaToken) {
		// Here you will get the final recaptchaToken!!!  
		console.log(recaptchaToken, "<= your recaptcha token")
	}

	handleSubmit(e) {
		e.preventDefault()
		const { name, email, subject, message } = this.state
		let $this = this
		let templateParams = {
			from_name: email,
			to_name: 'gitdemon+exjvde2uox3abqfm9qcq@boards.trello.com',
			subject: subject,
			message_html: message,
		}
		emailjs.send(
			'gmail',
			'template_OJXxBR6Y',
			templateParams,
			'user_0RYDbFHewHy7s25fAsrIB'
		).then(() => {
			$this.setState({
				formSent: true
			})
		})
		this.resetForm()
	}

	resetForm() {
		this.setState({
			name: '',
			email: '',
			subject: '',
			message: '',
		})
	}

	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value })
	}

	onModalOpen = () => {
		document.body.style.overflow = 'hidden'
		this.setState({
			modalOpen: true
		})
	}

	onModalClose = () => {
		document.body.style.overflow = 'unset'
		this.setState({
			modalOpen: false
		})
	}

	render() {
		return (
			<div className="beta">
				<button onClick={this.onModalOpen} className="beta__feedback-btn"><FontAwesomeIcon icon={["fa", "pencil-alt"]} /> See a bug? Send Feedback</button>
				<div className={this.state.modalOpen ? 'modal modal--active' : 'modal'}>
					<div className="modal__inner">
						<div className="modal__btn">
							<button className="modal__close" onClick={this.onModalClose}>X</button>
						</div>
						<div className="modal__container">
							<div className="modal__content">
								<h2>User Experience / Feedback</h2>
								<p>As we build this website / app, we need your help.  If there is a feature you'd like added or a bug to report, let us know.  Your experience is vital and we strive to deliever the most user friendly web app possible.</p>
								<form encType="multipart/form-data" className="modal__form" onSubmit={this.handleSubmit}>
									{/* <input type="email"
										name="email"
										id="email"
										value={this.state.email}
										onChange={this.handleChange}
										placeholder="Enter email" /> */}

									{/* <input
										type="text"
										name="name"
										id="name"
										value={this.state.name}
										onChange={this.handleChange}
										placeholder="Name"
									/> */}
									<div className="field">
										<label>Enter the subject</label>
										<input
											type="text"
											name="subject"
											id="subject"
											value={this.state.subject}
											onChange={this.handleChange}
											placeholder="Subject"
										/>
									</div>

									<div className="field">
										<label>What's the bug/feature?</label>
										<textarea
											type="textarea"
											name="message"
											id="message"
											value={this.state.message}
											onChange={this.handleChange}
											placeholder="Enter description"
										></textarea>
									</div>

									{/* <div className="field">
										<label htmlFor="attachment">Attach Image / Screenshot</label>
										<input type="file" id="attachment" name="attachment" onChange={this.handleChange} />
									</div> */}

									<button type="submit" className="button button--accent">Report Bug</button>
								</form>
								<div className="modal__status modal__status--sent" style={this.state.formSent ? { display: 'block' } : { display: 'none' }}>Thank you! Report sent.</div>
							</div>
						</div>
					</div>
				</div>
			</div >
		)
	}

}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		// projects: state.firestore.ordered.projects,
		auth: state.firebase.auth,
		// notifications: state.firestore.ordered.notifications,
		profile: state.firebase.profile
	}
}

export default compose(
	connect(mapStateToProps),
	// firestoreConnect([
	// 	{ collection: 'projects', orderBy: ['createdAt', 'desc'] },
	// 	{ collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
	// ])
)(UserTest)