import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';


class Modal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modalOpen: props.isOpen?true:false
		}
	}

	onModalOpen = (event) => {
		event.preventDefault();
		document.body.style.overflow = 'hidden'
		this.setState({
			modalOpen: true
		})
		if (this.props.openEvent) this.props.openEvent()
	}

	onModalClose = (event) => {
		event && event.preventDefault();
		document.body.style.overflow = 'unset'
		this.setState({
			modalOpen: false
		})
		if (this.props.closeEvent) this.props.closeEvent()
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

								{this.props.declineButton &&
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