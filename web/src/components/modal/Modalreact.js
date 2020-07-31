import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import Modal from 'react-modal';


const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-30%',
		transform: 'translate(-50%, -50%)',
		
	}
};
const customStylesFullScreen = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-30%',
		transform: 'translate(-50%, -50%)',
		width:"90%"
	}
};

class Modalreact extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modalOpen: props.isOpen ? true : false,
			toggleFullscreen: false
		}
	}








	onModalOpen = (event) => {

		//this.setState({modalOpen:true})

		if (this.props.openEvent) this.props.openEvent()
	}

	onModalClose = (event) => {


		// this.setState({modalOpen:false})
		if (this.props.closeEvent) this.props.closeEvent()
	}

	toggleFullscreen = (event) => {

		// document.body.style.overflow = ''
		const currentState = this.state.toggleFullscreen;
		this.setState({
			toggleFullscreen: !currentState
		})
	}

	render() {
		console.log(this.state.modalOpen)
		return (
			<div>
				<button onClick={this.onModalOpen} className={this.props.buttonStyle ? `modal__trigger ${this.props.buttonStyle}` : `modal__trigger`}>{this.props.buttonIcon ? <FontAwesomeIcon icon={["fa", this.props.buttonIcon]} /> : null}{this.props.buttonText}</button>

				<Modal
					isOpen={this.props.isOpen}
					style={this.state.toggleFullscreen?customStylesFullScreen:customStyles}
					contentLabel="Example Modal"
				
				>

					<div className="modal__btn">
						{this.props.fullScreenOptions && (
							<button className="modal__expand-btn" onClick={this.toggleFullscreen}>
								{this.state.toggleFullscreen ?
									<div>
										Minimize <FontAwesomeIcon icon="compress-arrows-alt" />
									</div>
									:
									<div>
										Expand <FontAwesomeIcon icon="expand-arrows-alt" />
									</div>}
							</button>
						)}
						<button className="modal__close" onClick={this.onModalClose}><FontAwesomeIcon icon="times" /></button>
					</div>

					<div className={`modal__content ${this.state.toggleFullscreen ? 'modal--fullscreen-new' : ''}`}>
						{this.props.content}
						{this.props.declineButton &&
							<button onClick={() => {
								this.props.declineButtonAction()
								this.onModalClose()
							}} className="button button--secondary" style={{ marginBottom: '10px' }}>Decline</button>
						}
					</div>

					{this.props.View &&
						<button onClick={this.onModalClose} className="button button--secondary " style={{ marginBottom: '10px' }}>View {this.props.View} Pros</button>
					}

				</Modal>
			</div >
		)
	}
}

export default Modalreact