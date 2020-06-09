import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Form, Radio, Button, Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import moment from 'moment'
import { createInteraction } from '../../store/actions/interactionActions'
import spinner from '../../assets/images/spinner.gif'
import { PayPalButton } from "react-paypal-button-v2";

class Booking extends Component {

	constructor(props) {
		super(props)
		this.state = {
			interactionType: 'booking',
			status: 'pending',
			proFirstName: this.props.pro.firstName,
			proLastName: this.props.pro.lastName,
			proUID: this.props.pro.uid,
			proImage: this.props.pro.photoURL,
			profession: '',
			bookingType: '',
			startDate: '',
			startTime: '',
			endTime: '',
			rate: this.getStartingRates(),
			duration: 0,
			total: 0,
			formSubmitting: false,
			modalOpen: false
		}
	}

	handleOpen = () => this.setState({ modalOpen: true })

	handleClose = () => this.setState({ modalOpen: false })

	renderPriceChange = (profession) => {
		const bookingType = this.state.bookingType

		if (profession === 'chef' && bookingType === 'online') {
			console.log('chef & online checked');
			this.setState({ rate: this.props.pro.rates.chef.online });
		}
		if (profession === 'chef' && bookingType === 'inPerson') {
			console.log('chef & inPerson checked');
			this.setState({ rate: this.props.pro.rates.chef.inPerson });
		}
	}

	handleBookingTypeChange = (e) => {
		// e.preventDefault()
		console.log(e.target.id);

		this.setState({
			bookingType: e.target.id,
			profession: ' '
		})
	}

	handleChange = (e) => {
		const bookingType = this.state.bookingType
		console.log('handle change activated', e.target.value, bookingType);
		if (bookingType === '') {
			alert('Choose a booking Type')
			return
		}

		if (e.target.value === 'chef' && bookingType === 'online') {
			console.log('chef & online checked');
			this.setState({ rate: this.props.pro.ratesOnlineChef, [e.target.id]: e.target.value, });
		}
		if (e.target.value === 'chef' && bookingType === 'inPerson') {
			console.log('chef & inPerson checked');
			this.setState({ rate: this.props.pro.ratesInPersonChef, [e.target.id]: e.target.value, });
		}
		if (e.target.value === 'nutritionist' && bookingType === 'online') {
			console.log('nutritionist & online checked');
			this.setState({ rate: this.props.pro.ratesOnlineNutritionist, profession: e.target.value, });
		}
		if (e.target.value === 'nutritionist' && bookingType === 'inPerson') {
			console.log('nutritionist & inPerson checked');
			this.setState({ rate: this.props.pro.ratesInPersonNutritionist, profession: e.target.value, });
		}
		if (e.target.value === 'massageTherapist' && bookingType === 'online') {
			console.log('massageTherapist & online checked');
			this.setState({ rate: this.props.pro.ratesOnlineMassageTherapist, [e.target.id]: e.target.value, });
		}
		if (e.target.value === 'massageTherapist' && bookingType === 'inPerson') {
			console.log('massageTherapist & inPerson checked');
			this.setState({ rate: this.props.pro.ratesInPersonMassageTherapist, [e.target.id]: e.target.value, });
		}
		if (e.target.value === 'fitnessTrainer' && bookingType === 'online') {
			console.log('fitnessTrainer & online checked');
			this.setState({ rate: this.props.pro.ratesOnlineFitnessTrainer, [e.target.id]: e.target.value, });
		}
		if (e.target.value === 'fitnessTrainer' && bookingType === 'inPerson') {
			console.log('fitnessTrainer & inPerson checked');
			this.setState({ rate: this.props.pro.ratesInPersonFitnessTrainer, [e.target.id]: e.target.value, });
		}
	}

	handleDateChange = date => {
		this.setState({
			startDate: date
		});
	};

	handleStartTimeChange = time => {
		this.setState({
			startTime: time
		});
	}

	renderStartTime = () => {
		const { startTime } = this.state
		if (startTime === '') { return null }
		var time = moment(startTime).format('hh:mm a')
		console.log(time);
		return 0
		// return moment(time).format()
	}

	handleDurationChange = (e) => {
		this.setState({
			duration: e.target.value
		})
	}

	validate = () => {
	}

	handleSubmit = (details, data) => {
		// console.log('inside func', details, data);
		let $this = this
		this.setState({
			total: this.calculateTotal(),
			formSubmitting: true,
			paypal: {
				timeCreated: details.create_time,
				id: details.id,
				email: details.payer.email_address,
				firstName: details.payer.name.given_name,
				lastName: details.payer.name.surname,
				payerID: details.payer.payer_id,
				status: details.status
			}
		})

		setTimeout(function () {
			// console.log('wait 3 secs', $this.props);
			$this.props.createInteraction($this.state)
			$this.props.history.push('/bookings#1')
		}, 3000)
	}

	getStartingRates = () => {
		const pro = this.props.pro
		const ratesArray = []

		if (pro.ratesInPersonChef) (ratesArray.push(pro.ratesInPersonChef))
		if (pro.ratesOnlineChef) (ratesArray.push(pro.ratesOnlineChef))
		if (pro.ratesInPersonFitnessTrainer) (ratesArray.push(pro.ratesInPersonFitnessTrainer))
		if (pro.ratesOnlineFitnessTrainer) (ratesArray.push(pro.ratesOnlineFitnessTrainer))
		if (pro.ratesInPersonNutritionist) (ratesArray.push(pro.ratesInPersonNutritionist))
		if (pro.ratesOnlineNutritionist) (ratesArray.push(pro.ratesOnlineNutritionist))
		if (pro.ratesInPersonMassageTherapist) (ratesArray.push(pro.ratesInPersonMassageTherapist))
		if (pro.rateOnlineMassageTherapist) (ratesArray.push(pro.rateOnlineMassageTherapist))

		ratesArray.sort((a, b) => a - b);
		return ratesArray[0]
	}

	renderServices = (services) => {
		// console.log(services);
		var servicesArray = []
		if (services.chef) { servicesArray.push(<option value={`chef`} key={'chef'}>Chef</option>) }
		if (services.nutritionist) { servicesArray.push(<option value={`nutritionist`} key={'nutritionist'}>Nutritionist</option>) }
		if (services.massageTherapist) { servicesArray.push(<option value={`massageTherapist`} key={'massageTherapist'}>Massage Therapist</option>) }
		if (services.fitnessTrainer) { servicesArray.push(<option value={`fitnessTrainer`} key={'fitnessTrainer'}>Fitness Trainer</option>) }
		// console.log(servicesArray.splice());
		return (servicesArray.splice(''))
	}

	calculateDuration = () => {
		const { duration } = this.state
		if (duration === 0) { return 0 }
		const hours = (duration / 60);
		return hours;
	}

	calculateTotal = () => {
		// console.log('entered');
		const { rate, duration } = this.state;
		if (typeof rate === 'undefined' || rate === 0) { return 0 }
		const perMinute = rate / 60
		const total = perMinute * duration
		return total
	}

	render() {

		return (
			<div className={`profile__booking ${this.state.formSubmitting ? 'profile__booking--submitting' : ''}`}>
				<div className={`loading ${this.state.formSubmitting ? 'loading--active' : ''}`}>
					<img src={spinner} />
				</div>

				<div className={`profile__booking-price`}>
					<p className={`mb--0`}>Starting at</p>
					<p className={`profile__booking-price-number mb--0 text--font-secondary text--lg`}>${this.state.rate}</p>
					<Form onSubmit={this.validate()}>
						<Form.Field className={'field--inline'}>
							<Radio className="field--half" id={'online'} label={'Online'} name={'bookingType'} onChange={this.handleBookingTypeChange} />
							<Radio className="field--half" id={'inPerson'} label={'In person'} name={'bookingType'} onChange={this.handleBookingTypeChange} />
						</Form.Field>
						<Form.Field>
							<label htmlFor="profession">Choose service</label>
							<select name="profession" id="profession" onChange={this.handleChange} required>
								<option value="">Choose Service</option>
								{this.renderServices(this.props.pro.professions)}
							</select>
						</Form.Field>
						<Form.Field>
							<DatePicker
								className="date-picker"
								selected={this.state.startDate}
								onChange={this.handleDateChange}
								placeholderText={'Select Date'}
								minDate={addDays(new Date(), 1)}
								dateFormat="MMMM d, yyyy"
								required={true}
							/>
						</Form.Field>
						<Form.Field className="field--half">
							<DatePicker
								className="time-picker"
								selected={this.state.startTime}
								onChange={this.handleStartTimeChange}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={30}
								timeCaption="Time"
								dateFormat="hh:mm a"
								placeholderText={'Start Time'}
								required={true}
							// excludeDates={[new Date(), subDays(new Date(), 1)]}
							// excludeTimes={[
							// 	setHours(setMinutes(new Date(), 0), 17),
							// 	setHours(setMinutes(new Date(), 30), 18),
							// 	setHours(setMinutes(new Date(), 30), 19),
							// 	setHours(setMinutes(new Date(), 30), 17)
							// ]}
							/>
						</Form.Field>
						<Form.Field className="field--half">
							<select name="duration" id="duration" onChange={this.handleDurationChange} required>
								<option value="">Duration</option>
								<option value="30">30 Minutes</option>
								<option value="60">1 Hour</option>
								<option value="90">1.5 Hours</option>
								<option value="120">2 Hours</option>
							</select>
						</Form.Field>
						<div className={'field field--review text--left'}>
							<div style={{ width: '100%' }}>
								<h3 className="text--uppercase">Price</h3>
								<p><span className="text--lowercase">${this.state.rate} x {this.calculateDuration()} hours</span> <span>${this.calculateTotal()}</span></p>
								<p className="field--review-total text--uppercase text--bold">Total<span>${this.calculateTotal()}</span></p>
							</div>
						</div>
						<Form.Field className="field--justify-center">
							{this.state.duration !== 0 && this.state.startDate !== '' && this.state.startTime !== '' ? null : <p style={{ marginBottom: '10px' }}>Please enter all the fields</p>}
							<Modal
								trigger={
									<Button
										type="submit"
										onClick={this.state.bookingType !== '' && this.state.profession !== '' && this.state.duration !== 0 && this.state.startDate !== '' && this.state.startTime !== '' ? this.handleOpen : null}
										className={`button button--primary text--uppercase text--font-secondary text--sm ${this.state.bookingType !== '' && this.state.profession !== '' && this.state.duration !== 0 && this.state.startDate !== '' && this.state.startTime !== '' ? 'button--active' : 'button--inactive'}`} >Request to book</Button>}
								open={this.state.modalOpen}
								onClose={this.handleClose}
							>
								<Modal.Content>
									<Modal.Actions>
										<Button class="button__close" onClick={this.handleClose}>X</Button>
									</Modal.Actions>
									<Modal.Description className="modal-description__container">
										<h2>Complete Booking</h2>
										<p>Your total of ${this.calculateTotal()} will be processed to book the session with <span className="text--capitalize">{this.state.proFirstName}</span>.</p>
										<p>Please choose your preferred method of payment below.</p>
										<PayPalButton
											amount={'0.01'}
											shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
											onSuccess={(details, data) => {
												// alert("Transaction completed by " + details.payer.name.given_name);
												this.handleSubmit(details, data)
											}}
											options={{
												clientId: "AdnGkXFLEzUBky5CsXg-LToFxF9xTiJFH6jEz5vBXffma53lY5JVu4wzKPM1B1AlEZWYAlCpZDc25Dnu"
											}}
										/>
									</Modal.Description>
								</Modal.Content>
							</Modal>

						</Form.Field>
					</Form>
				</div>
			</div >
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		authError: state.auth.authError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createInteraction: (interaction) => dispatch(createInteraction(interaction))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Booking))