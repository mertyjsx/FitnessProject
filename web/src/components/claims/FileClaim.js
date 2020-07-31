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
	componentWillMount() {
		let script = document.createElement('script');
		script.setAttribute('id', '_agile_min_js');
		script.onload = (function (a) {
			var b = a.onload;
			var p = false;
			var isCaptcha = false;
			if (p) {
				a.onload = "function" != typeof b ?
					function () { try { this._agile_load_form_fields() } catch (a) { } }
					:
					function () { b(); try { this._agile_load_form_fields() } catch (a) { } }
			};
			var formLen = document.forms.length;
			for (var i = 0; i < formLen; i++) {
				if (document.forms.item(i).getAttribute("id") == "agile-form") {
					a.document.forms.item(i).onsubmit = function (a) {
						a.preventDefault();
						try { this._agile_synch_form_v5(this) }
						catch (b) { this.submit() }
					}
				}
			}
		})(window);
		document.getElementsByTagName('head')[0].appendChild(script);
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

					{/* // <script type="text/javascript">
		// 	(function(a){var b=a.onload,p=false;isCaptcha=false;if(p){a.onload="function"!=typeof b?function(){try{_agile_load_form_fields()}catch(a){}}:function(){b();try{_agile_load_form_fields()}catch(a){}}};var formLen=document.forms.length;for(i=0;i<formLen;i++){if(document.forms.item(i).getAttribute("id")== "agile-form"){a.document.forms.item(i).onsubmit=function(a){a.preventDefault();try{_agile_synch_form_v5(this)}catch(b){this.submit()}}}}})(window);
		// </script> */}
					<div className="row">
						<div className="col" style={{ marginBottom: '50px' }}>
							{/* <p>As we build this website / app, we need your help.  If there is a feature you'd like added or a bug to report, let us know.  Your experience is vital and we strive to deliever the most user friendly web app possible.</p> */}
							<form className="form form-view agile-form-blck-transparent " id="agile-form" action="https://choosetobeyou.agilecrm.com/formsubmit" method="GET" style={{ width: '100%' }}>
								<legend className="screen-reader-text agile-hide-formname">File a Claim Form</legend>
								<p className="screen-reader-text agile-form-description">This form is intended to capture all the claims filed on ChooseToBeYou.com</p>
								<div style={{ display: 'none', height: '0px', width: '0px' }}>
									<input type="hidden" id="_agile_form_name" name="_agile_form_name" value="File a Claim" />
									<input type="hidden" id="_agile_domain" name="_agile_domain" value="choosetobeyou" />
									<input type="hidden" id="_agile_api" name="_agile_api" value="3h6emnq5000gjh577j9gk2ca9n" />
									<input type="hidden" id="_agile_redirect_url" name="_agile_redirect_url" value="http://ctby.angelcenteno.com/file-claim" />
									<input type="hidden" id="_agile_document_url" name="_agile_document_url" value="" />
									<input type="hidden" id="_agile_confirmation_msg" name="_agile_confirmation_msg" value="Great! Thanks for filling out the form." />
									<input type="hidden" id="_agile_form_id_tags" name="tags" value="" />
									<input type="hidden" id="_agile_form_id" name="_agile_form_id" value="4741466289143808" />
								</div>
								<div className="field agile-group required-control">
									<label className="agile-label" htmlFor="agilefield-7">Interaction ID<span className="agile-span-asterisk"> *</span></label>
									<div className="agile-field-xlarge agile-field">
										<select id="SESSIONID" name="SESSIONID" onChange={this.handleChange} required>
											<option value="">Choose Session</option>
											{
												profile.userInteractions && profile.userInteractions.map(interaction => {
													console.log(interaction);
													return (
														<option key={interaction} value={interaction}>{interaction}</option>
													)
												})
											}
										</select>
										<input type="hidden" id="agilefield-7" name="interaction_id" placeholder="Interaction ID" className="agile-height-default" required="" defaultValue={this.state.SESSIONID} />
									</div>
								</div>
								<div className="field field--half agile-group required-control">
									<label className="agile-label" htmlFor="agilefield-3">First Name<span className="agile-span-asterisk"> *</span></label>
									<div className="agile-field-xlarge agile-field">
										<input id="agilefield-3" name="first_name" type="text" placeholder="First Name" className="agile-height-default" required="" defaultValue={profile.firstName} />
									</div>
								</div>
								<div className="field field--half agile-group required-control">
									<label className="agile-label" htmlFor="agilefield-5">Last Name<span className="agile-span-asterisk"> *</span></label>
									<div className="agile-field-xlarge agile-field">
										<input id="agilefield-5" name="last_name" type="text" placeholder="Last Name" className="agile-height-default" required="" defaultValue={profile.lastName} />
									</div>
								</div>

								<div className="field agile-group required-control">
									<label className="agile-label" htmlFor="agilefield-6">Email<span className="agile-span-asterisk"> *</span></label>
									<div className="agile-field-xlarge agile-field">
										<input id="agilefield-6" name="email" type="email" placeholder="Email" className="agile-height-default" required="" defaultValue={this.props.auth.email} />
									</div>
									<div className="agile-custom-clear"></div>
								</div>

								<div className="field agile-group required-control">
									<label className="agile-label" htmlFor="agilefield-8">Explain the issue<span className="agile-span-asterisk"> *</span></label>
									<div className="agile-field-xlarge agile-field">
										<textarea id="agilefield-8" name="Claim Comments" placeholder="Explain the issue" required="" className="agile-height-default"></textarea>
									</div>
									<div className="agile-custom-clear"></div>
								</div>

								<div className="field agile-group">
									<label className="agile-label screen-reader-text">Submit</label>
									<div className="agile-field agile-button-field">
										<button type="submit" className="button button--primary agile-button">Submit</button>
										<br /><span id="agile-error-msg"></span>
									</div>
								</div>
							</form>

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