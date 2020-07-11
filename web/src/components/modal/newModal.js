import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import Scroll, { scroller } from 'react-scroll';

var Element = Scroll.Element;



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
			
					<div className="new-inner">
						<div className="modal__btn">
							<button className="modal__close" onClick={this.onModalClose}>X</button>
						</div>
						<div >
							<div >
							<h1 className="filterHeader">Filter</h1>
							<hr className="m-20"></hr>

							<Element name="test7" className="element" id="containerElement" style={{
				position: 'relative',
				height:200,
				overflow: 'scroll',
				marginBottom:20,
				marginTop:20,
		overflowX:"hidden"
		
			}}>



								{this.props.content}

								</Element>

<hr className="m-20"></hr>
								{this.props.declineButton &&
									<button onClick={() => {
										this.props.declineButtonAction()
										this.onModalClose()
									}} className="button button--secondary" style={{ marginBottom: '10px' }}>Decline</button>
								}
	                       


							</div>
							


						</div>











						
						{this.props.View &&
									<button onClick={this.onModalClose} className="button button--secondary " style={{ marginBottom: '10px' }}>View {this.props.View} Pros</button>
								}
					</div>
				</div>
			</div >
		)
	}

}

export default Modal