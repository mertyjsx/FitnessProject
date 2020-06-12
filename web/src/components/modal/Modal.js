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
			<div>
				<button onClick={this.onModalOpen} className={this.props.buttonStyle ? `modal__trigger ${this.props.buttonStyle}` : `modal__trigger`}>{this.props.buttonIcon ? <FontAwesomeIcon icon={["fa", this.props.buttonIcon]} /> : null}{this.props.buttonText}</button>
				<div className={this.state.modalOpen ? 'modal modal--active' : 'modal'}>
					<div className="modal__inner">
						<div className="modal__btn">
							<button className="modal__close" onClick={this.onModalClose}>X</button>
						</div>
						<div className="modal__container">
							<div className="modal__content">
								{this.props.content}
							</div>
						</div>
					</div>
				</div>
			</div >
		)
	}

}

export default Modal