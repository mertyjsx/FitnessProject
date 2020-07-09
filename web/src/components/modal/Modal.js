import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as emailjs from 'emailjs-com'
import { ReCaptcha } from 'react-recaptcha-google'


class Modal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false
		}
	}

	onModalOpen = (event) => {
		event.preventDefault();
		document.body.style.overflow = 'hidden'
		this.setState({
			modalOpen: true
		})
	}

	onModalClose = (event) => {
		event&&event.preventDefault();
		document.body.style.overflow = 'unset'
		this.setState({
			modalOpen: false
		})
	}

	render() {
		return (
			<div>
				<div className="jcc">
				<button onClick={this.onModalOpen} className={this.props.buttonStyle ? `modal__trigger ${this.props.buttonStyle}` : `modal__trigger`}>{this.props.buttonIcon ? <FontAwesomeIcon icon={["fa", this.props.buttonIcon]} /> : null}{this.props.buttonText}</button>
				</div>
				
				<div className={this.state.modalOpen ? 'modal modal--active' : 'modal'}>
					<div className="modal__inner">
						<div className="modal__btn">
							<button className="modal__close" onClick={this.onModalClose}>X</button>
						</div>
						<div className="modal__container">
							<div className="modal__content">
								{this.props.content}

								{this.props.declineButton&&
									<button onClick={() => {
										this.props.declineButtonAction()
										this.onModalClose()
									}} className="button button--secondary" style={{ marginBottom: '10px' }}>Decline</button>
								
								}
							</div>
						</div>
					</div>
				</div>
			</div >
		)
	}

}

export default Modal