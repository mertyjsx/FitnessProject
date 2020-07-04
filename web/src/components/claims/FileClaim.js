import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class FileClaim extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: 'beta@angelcenteno.com',
			subject: '',
			message: '',
			formSent: false
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value })
	}

	render() {
		const { profile } = this.props
		return (
			<div className="settings">
				<div className="container container--top-bottom-padding container--small">
					<div className="row">
						<div className="col">
							<div className={`dashboard__head`}>
								<h1 className={`text--lg text--uppercase`}>File a Claim</h1>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col" style={{ marginBottom: '50px' }}>
							<div>
								{/* <p>As we build this website / app, we need your help.  If there is a feature you'd like added or a bug to report, let us know.  Your experience is vital and we strive to deliever the most user friendly web app possible.</p> */}

								<form className="modal__form" action="https://choosetobeyou.us20.list-manage.com/subscribe/post" method="POST" noValidate>
									<input type="hidden" name="u" value="0c2f5384fdef29a5a9b9956dd" />
									<input type="hidden" name="id" value="441bbab02d" />

									<div className="field-shift" aria-label="Please leave the following three fields empty" style={{ display: 'none' }}>
										<label for="b_name">Name: </label>
										<input type="text" name="b_name" tabindex="-1" value="" placeholder="Freddie" id="b_name" />

										<label for="b_email">Email: </label>
										<input type="email" name="b_email" tabindex="-1" value="" placeholder="youremail@gmail.com" id="b_email" />

										<label for="b_comment">Comment: </label>
										<textarea name="b_comment" tabindex="-1" placeholder="Please comment" id="b_comment"></textarea>
									</div>

									<div className="form">
										<div className="field">
											<label>Select the Session *</label>
											<select id="SESSIONID" name="SESSIONID" required>
												<option value="">Choose Session</option>
												{
													profile.userInteractions && profile.userInteractions.map(interaction => {
														console.log(interaction);
														return (
															<option key={interaction} value={interaction}>Interaction ID: {interaction}</option>
														)
													})
												}
											</select>
										</div>

										<div className="field field--half">
											<label for="MERGE1">First Name <span class="req asterisk">*</span></label>
											<input type="text" name="MERGE1" id="MERGE1" size="25" defaultValue={profile.firstName} />
										</div>

										<div className="field field--half">
											<label for="MERGE2">Last Name</label>
											<input type="text" name="MERGE2" id="MERGE2" size="25" defaultValue={profile.lastName} />
										</div>

										<div className="field">
											<label for="MERGE0">Email Address <span class="req asterisk">*</span></label>
											<input type="email" autocapitalize="off" autocorrect="off" name="MERGE0" id="MERGE0" size="25" defaultValue={this.props.auth.email} />
										</div>

										<div className="field">
											<label>Explain the issue</label>
											<textarea
												type="textarea"
												name="message"
												id="message"
												value={this.state.message}
												onChange={this.handleChange}
												placeholder="Enter description"
											></textarea>
										</div>
										<div className="field">
											<button type="submit" className="button button--accent">Report Claim</button>
										</div>
									</div>
									<input type="hidden" name="ht" value="55209d6062e11710190fe24f97a2eb8dca147b51:MTU5Mzg2NzEyNS43ODIx" />
									<input type="hidden" name="mc_signupsource" value="hosted" />
								</form>
								<div className="modal__status modal__status--sent" style={this.state.formSent ? { display: 'block' } : { display: 'none' }}>Thank you! The report has been sent. Please allow up to 2 business days for our team to review.</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default compose(
	connect(mapStateToProps),
	// firestoreConnect([
	// 	{collection: 'interactions', orderBy: ['createdAt', 'desc'] }
	// ])
)(withRouter(FileClaim))