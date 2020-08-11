import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class Modal extends Component {

	constructor(props) {
		super(props)
		this.state = {
			title: '',
			description: '',
			from: "6:00 pm",
			to: "6:00 pm"
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	blockTıme = () => {
		console.log(this.props.date)
		this.props.onClick(this.props.date, this.state)
	}

	render() {
		// console.log(this.props.date)
		return (
			<div>
				{/* <button onClick={this.props.onModalOpen} className={this.props.buttonStyle ? `modal__trigger ${this.props.buttonStyle}` : `modal__trigger`}>{this.props.buttonIcon ? <FontAwesomeIcon icon={["fa", this.props.buttonIcon]} /> : null}{this.props.buttonText}</button> */}
				<div className={this.props.modal ? 'modal modal--active' : 'modal'}>
					<div className="modal__inner">
						<div className="modal__btn">
							<button className="modal__close" onClick={this.props.onModalClose}>X</button>
						</div>
						<div >
							<h2>When are you busy?</h2>
						</div>
						<div className="form__inner">
							<Form.Field>
								<label htmlFor="details" className="ml">Title</label>
								<input name="title" id="title" placeholder="Name this so you will remember" onChange={this.handleChange}></input>
							</Form.Field>
							<Form.Field>
								<label htmlFor="details" className="ml" >Details</label>
								<input name="details" id="details" placeholder="Details" onChange={this.handleChange}></input>
							</Form.Field>
							<Form.Field className="field--half">
								<select id={'from'} onChange={this.handleChange}>
									<option>From</option>
									<option value={'12:00 am'}>12:00 am</option>
									<option value={'1:00 am'}>1:00 am</option>
									<option value={'2:00 am'}>2:00 am</option>
									<option value={'3:00 am'}>3:00 am</option>
									<option value={'4:00 am'}>4:00 am</option>
									<option value={'5:00 am'}>5:00 am</option>
									<option value={'6:00 am'}>6:00 am</option>
									<option value={'7:00 am'}>7:00 am</option>
									<option value={'8:00 am'}>8:00 am</option>
									<option value={'9:00 am'}>9:00 am</option>
									<option value={'10:00 am'}>10:00 am</option>
									<option value={'11:00 am'}>11:00 am</option>
									<option value={'12:00 pm'}>12:00 pm</option>
									<option value={'1:00 pm'}>1:00 pm</option>
									<option value={'2:00 pm'}>2:00 pm</option>
									<option value={'3:00 pm'}>3:00 pm</option>
									<option value={'4:00 pm'}>4:00 pm</option>
									<option value={'5:00 pm'}>5:00 pm</option>
									<option value={'6:00 pm'}>6:00 pm</option>
									<option value={'7:00 pm'}>7:00 pm</option>
									<option value={'8:00 pm'}>8:00 pm</option>
									<option value={'9:00 pm'}>9:00 pm</option>
									<option value={'10:00 pm'}>10:00 pm</option>
									<option value={'11:00 pm'}>11:00 pm</option>
								</select>
							</Form.Field>
							<Form.Field className="field--half">
								<select id={'to'} onChange={this.handleChange} className="m20">
									<option>To</option>
									<option value={'12:00 am'}>12:00 am</option>
									<option value={'1:00 am'}>1:00 am</option>
									<option value={'2:00 am'}>2:00 am</option>
									<option value={'3:00 am'}>3:00 am</option>
									<option value={'4:00 am'}>4:00 am</option>
									<option value={'5:00 am'}>5:00 am</option>
									<option value={'6:00 am'}>6:00 am</option>
									<option value={'7:00 am'}>7:00 am</option>
									<option value={'8:00 am'}>8:00 am</option>
									<option value={'9:00 am'}>9:00 am</option>
									<option value={'10:00 am'}>10:00 am</option>
									<option value={'11:00 am'}>11:00 am</option>
									<option value={'12:00 pm'}>12:00 pm</option>
									<option value={'1:00 pm'}>1:00 pm</option>
									<option value={'2:00 pm'}>2:00 pm</option>
									<option value={'3:00 pm'}>3:00 pm</option>
									<option value={'4:00 pm'}>4:00 pm</option>
									<option value={'5:00 pm'}>5:00 pm</option>
									<option value={'6:00 pm'}>6:00 pm</option>
									<option value={'7:00 pm'}>7:00 pm</option>
									<option value={'8:00 pm'}>8:00 pm</option>
									<option value={'9:00 pm'}>9:00 pm</option>
									<option value={'10:00 pm'}>10:00 pm</option>
									<option value={'11:00 pm'}>11:00 pm</option>
								</select>
							</Form.Field>
							<button onClick={this.blockTıme} className={`button button--secondary text--uppercase text--bold text--font-secondary m20`}>Mark as unavailable</button>
						</div>
					</div>
				</div>
			</div >
		)
	}
}

export default Modal