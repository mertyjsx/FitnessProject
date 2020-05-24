import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Form, Radio, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { setSeconds, setMinutes, setHours } from "date-fns";
import { db } from '../../config/fbConfig';
// import { signUpPro } from '../../../store/actions/authActions'

class Booking extends Component {

	constructor(props) {
		super(props)
		this.state = {
			profession: '',
			bookingType: '',
			startDate: '',
			startTime: '',
			endTime: '',
			rate: this.getStartingRates(),
			total: this.getStartingRates()
		}
	}

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
		this.setState({
			bookingType: e.target.value
		})
	}

	handleChange = (e) => {
		const bookingType = this.state.bookingType
		console.log('handle change activated', e.target.value, bookingType);
		if (bookingType === '') {
			alert('Choose a booking Type')
		}

		if (e.target.value === 'chef' && bookingType === 'online') {
			console.log('chef & online checked');
			this.setState({ rate: this.props.pro.rates.chef.online, [e.target.id]: e.target.value, });
		}
		if (e.target.value === 'chef' && bookingType === 'inPerson') {
			console.log('chef & inPerson checked');
			this.setState({ rate: this.props.pro.rates.chef.inPerson, [e.target.id]: e.target.value, });
		}
		if (e.target.value === 'nutritionist' && bookingType === 'online') {
			console.log('nutritionist & online checked');
			this.setState({ rate: this.props.pro.rates.nutritionist.online, [e.target.id]: e.target.value, });
		}
		if (e.target.value === 'nutritionist' && bookingType === 'inPerson') {
			console.log('nutritionist & inPerson checked');
			this.setState({ rate: this.props.pro.rates.nutritionist.inPerson, [e.target.id]: e.target.value, });
		}
		if (e.target.value === 'massageTherapist' && bookingType === 'online') {
			console.log('massageTherapist & online checked');
			this.setState({ rate: this.props.pro.rates.massageTherapist.online, [e.target.id]: e.target.value, });
		}
		if (e.target.value === 'massageTherapist' && bookingType === 'inPerson') {
			console.log('massageTherapist & inPerson checked');
			this.setState({ rate: this.props.pro.rates.massageTherapist.inPerson, [e.target.id]: e.target.value, });
		}
		if (e.target.value === 'fitnessTrainer' && bookingType === 'online') {
			console.log('fitnessTrainer & online checked');
			this.setState({ rate: this.props.pro.rates.fitnessTrainer.online, [e.target.id]: e.target.value, });
		}
		if (e.target.value === 'fitnessTrainer' && bookingType === 'inPerson') {
			console.log('fitnessTrainer & inPerson checked');
			this.setState({ rate: this.props.pro.rates.fitnessTrainer.inPerson, [e.target.id]: e.target.value, });
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
	};

	handleEndTimeChange = time => {
		this.setState({
			endTime: time
		});
	};

	getStartingRates = () => {
		const rates = this.props.pro.rates
		const ratesArray = []

		if (rates.chef && rates.chef.inPerson) (ratesArray.push(rates.chef.inPerson))
		if (rates.chef && rates.chef.online) (ratesArray.push(rates.chef.online))
		if (rates.fitnessTrainer && rates.fitnessTrainer.inPerson) (ratesArray.push(rates.fitnessTrainer.inPerson))
		if (rates.fitnessTrainer && rates.fitnessTrainer.online) (ratesArray.push(rates.fitnessTrainer.online))
		if (rates.nutritionist && rates.nutritionist.inPerson) (ratesArray.push(rates.nutritionist.inPerson))
		if (rates.nutritionist && rates.nutritionist.online) (ratesArray.push(rates.nutritionist.inPerson))
		if (rates.massageTherapist && rates.massageTherapist.inPerson) (ratesArray.push(rates.massageTherapist.inPerson))
		if (rates.massageTherapist && rates.massageTherapist.online) (ratesArray.push(rates.massageTherapist.online))

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

	render() {

		return (
			<div className={`profile__booking`}>
				<div className={`profile__booking-price`}>
					<p className={`mb--0`}>Starting at</p>
					<p className={`profile__booking-price-number mb--0 text--font-secondary text--lg`}>${this.state.rate}</p>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field className={'field--inline'}>
							<Radio className="field--half" id={'bookingType'} label={'Online'} name={'bookingType'} value='online' checked={this.state.bookingType === 'online'} onChange={this.handleBookingTypeChange} />
							<Radio className="field--half" id={'bookingType'} label={'In person'} name={'bookingType'} value='inPerson' checked={this.state.bookingType === 'inPerson'} onChange={this.handleBookingTypeChange} />
						</Form.Field>
						<Form.Field>
							<label htmlFor="profession">Choose service</label>
							<select name="profession" id="profession" onChange={this.handleChange}>
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
								dateFormat="MMMM d, yyyy"
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
								placeholderText={'Start Time'}
								excludeTimes={[
									setHours(setMinutes(new Date(), 0), 17),
									setHours(setMinutes(new Date(), 30), 18),
									setHours(setMinutes(new Date(), 30), 19),
									setHours(setMinutes(new Date(), 30), 17)
								]}
								dateFormat="h:mm aa"
							/>
						</Form.Field>
						<Form.Field className="field--half">
							<DatePicker
								className="time-picker"
								selected={this.state.endTime}
								onChange={this.handleEndTimeChange}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={30}
								timeCaption="Time"
								placeholderText={'End Time'}
								excludeTimes={[
									setHours(setMinutes(new Date(), 0), 17),
									setHours(setMinutes(new Date(), 30), 18),
									setHours(setMinutes(new Date(), 30), 19),
									setHours(setMinutes(new Date(), 30), 17)
								]}
								dateFormat="h:mm aa"
							/>
						</Form.Field>
						<div className={'field field--review text--left'}>
							<h3 className="text--uppercase">Price</h3>
							<p>${this.state.rate} x hours <span>${this.state.total}</span></p>
							<p className="field--review-total text--uppercase text--bold">Total<span>${this.state.total}</span></p>
						</div>
						<Form.Field>
							<Button className={'button button--primary text--uppercase text--font-secondary text--sm'}>Request to book</Button>
						</Form.Field>
					</Form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	// console.log(state);

	return {
		auth: state.firebase.auth,
		authError: state.auth.authError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// booking: (newUser) => dispatch(signUpPro(newUser))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking)