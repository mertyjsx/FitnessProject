import { addDays, setHours, setMinutes } from "date-fns";
import moment from 'moment';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { PayPalButton } from 'react-paypal-button-v2';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Form } from 'semantic-ui-react';
import spinner from '../../assets/images/spinner.gif';
import PaypalConfig from '../../config/paypal.json';
import { createInteraction } from '../../store/actions/interactionActions';
import Modal from '../modal/Modal';


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
			blockedDays: [],
			Blockeddaysname: [],
			Blockedtimes: [],
			From: -1,
			To: 25,
			spesific: [],
			timesExlude: [],
			callType: ""
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
		// e.preventDefault()
		// console.log(e.target.id);
		this.setState({
			bookingType: e.target.id,
			profession: ''
		})
	}





	handleCallType = (e) => {
		// e.preventDefault()
		// console.log(e.target.id);
		this.setState({
			callType: e.target.value
		})
	}


	getHours = () => {



		let Blockeddaysname = []
		let Blockedtimes = []
		console.log(this.props.pro.Hours)


		this.props.pro.Hours &&
			Object.entries(this.props.pro.Hours).forEach(([key, value]) => {
				if (!value.from) {
					//there are no hour Restriction

					if (!value.state) {

						//full day	
						Blockeddaysname.push(key)

					}



				} else {
					//there are hour Restriction
					Blockedtimes.push({ value, key })

				}



			});
		let newArr = []
		let newArr2 = []
		this.props.pro.blockedArray &&
			this.props.pro.blockedArray.map(item => {

				if (item.type === "blockHours") {
					//if there are block hours
					let dat = new Date(`${item.date.split("-")[2]}/${item.date.split("-")[1]}/${item.date.split("-")[0]}`)

					newArr.push({ date: dat, from: item.from, to: item.to })

				}
				else {
					//if this days full blocked
					newArr2.push(new Date(`${item.date.split("-")[2]}/${item.date.split("-")[1]}/${item.date.split("-")[0]}`))
				}



			})

		let blockedDays = [...this.state.blockedDays, ...newArr2]
		let blockDaysWithHours = [...this.state.spesific, ...newArr]


		this.setState({
			Blockeddaysname: Blockeddaysname
			, Blockedtimes: Blockedtimes,
			blockedDays: blockedDays,
			spesific: blockDaysWithHours
		}, () => this.createdaysInweek(new Date()))


	}


	calculateTimes = (date) => {

		//Check selected dates has blocked hours or not and calculate 2Pm to 14:00
		//and we have to determine its regular blocked hours or just spesific blocked hour

		this.setState({ timesExlude: [] })
		let name = moment(date).format('dddd');


		let item = this.state.spesific.find(item => {
			let date1 = `${item.date.getUTCDate()}-${item.date.getMonth()}-${item.date.getFullYear()}`
			let date2 = `${date.getUTCDate()}-${date.getMonth()}-${date.getFullYear()}`
			console.log(date1)
			console.log(date2)
			console.log(date)
			return (date1 === date2)
		})
		let numberFrom;
		let numberTo;

		if (item) {
			console.log(item)

			let from = item.from
			let to = item.to

			if (from.split(" ")[1] === "pm") {

				numberFrom = Number(from.split(":")[0]) + 12

			} else {

				numberFrom = Number(from.split(":")[0])

			}

			if (to.split(" ")[1] === "pm") {

				numberTo = Number(to.split(":")[0]) + 12

			} else {

				numberTo = Number(to.split(":")[0])

			}
			let NA = []
			for (let i = numberFrom; i <= numberTo; i++) {

				NA.push(setHours(setMinutes(new Date(), 0), i))
				if (i != numberTo) {
					NA.push(setHours(setMinutes(new Date(), 30), i))

				}
			}

			this.setState({ timesExlude: NA })

		}


		let itemWorkHours = this.state.Blockedtimes.find(item => item.key === name.toLowerCase())

		let numberFromWorkHours;
		let numberToWorkHours;

		if (itemWorkHours) {
			let FromWorkHours = itemWorkHours.value.from
			let ToWorkHours = itemWorkHours.value.to

			if (FromWorkHours.split(" ")[1] === "pm") {

				numberFromWorkHours = Number(FromWorkHours.split(":")[0]) + 12

			} else {

				numberFromWorkHours = Number(FromWorkHours.split(":")[0])

			}

			if (ToWorkHours.split(" ")[1] === "pm") {

				numberToWorkHours = Number(ToWorkHours.split(":")[0]) + 12

			} else {

				numberToWorkHours = Number(ToWorkHours.split(":")[0])

			}


			this.setState({ From: numberFromWorkHours, To: numberToWorkHours })

		}

	}



	componentDidMount() {


		this.getHours()
	}


	componentDidUpdate(prevProps) {

		if (prevProps !== this.props) {
			console.log("update")
			this.getHours()

		}
	}





	createdaysInweek(n) {

		let NewArray = this.state.blockedDays
		this.state.Blockeddaysname.map(day => {

			//convert DAYS to week numbers to find how many mondays are there  inside a month 
			// so we can blocked all mondays in July
			let selectedday;

			switch (day) {
				case "sunday":
					selectedday = 0;
					break;
				case "monday":
					selectedday = 1;
					break;
				case "tuesday":
					selectedday = 2;
					break;
				case "wednesday":
					selectedday = 3;
					break;
				case "thursday":
					selectedday = 4;
					break;
				case "friday":
					selectedday = 5;
					break;
				case "saturday":
					selectedday = 6;
			}

			console.log(selectedday)




			var d = new Date(n),
				month = d.getMonth(),
				days = [];

			d.setDate(1);

			// Get the first Monday in the month
			while (d.getDay() !== selectedday) {
				d.setDate(d.getDate() + 1);
			}

			// Get all the other Mondays in the month
			while (d.getMonth() === month || d.getMonth() === month + 1) {
				days.push(new Date(d.getTime()));
				d.setDate(d.getDate() + 7);
			}


			NewArray.push(...days)

		})

		this.setState({ blockedDays: NewArray });

	}










	handleChange = (e) => {
		const bookingType = this.state.bookingType
		// console.log('handle change activated', e.target.value, bookingType);
		// if (bookingType === '') {
		// 	alert('Choose a booking Type')
		// 	return
		// }

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
		console.log("date changed")
		console.log(date)
		this.calculateTimes(date)



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
		this.createdaysInweek(time)
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
			callType: this.state.callType,
			formSubmitting: true,
			clientFullAdress: this.props.profile.personalAddress1 + ' ' + this.props.profile.personalCity + ', ' + this.props.profile.personalState + this.props.profile.personalZip,
			proBusinessName: this.props.pro.businessName,
			proFullAddress: this.props.pro.businessAddress1 + ' ' + this.props.pro.businessCity + ', ' + this.props.pro.businessState + this.props.pro.businessZip,
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
			document.body.style.overflow = 'unset'
			$this.props.history.push('/bookings')
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
		let total = perMinute * duration


		return total
	}

	calculateTotalwithOutCall = () => {
		// console.log('entered');
		let total = this.calculateTotal()
		return total + 1
	}
	render() {
		console.log(this.props.profile.personalAddress1 + ' ' + this.props.profile.personalCity + ', ' + this.props.profile.personalState + this.props.profile.personalZip)

		return (
			<div className={`profile__booking ${this.state.formSubmitting ? 'profile__booking--submitting' : ''}`}>
				<div className={`loading ${this.state.formSubmitting ? 'loading--active' : ''}`}>
					<img src={spinner} />
				</div>

				<div className={`profile__booking-price`}>
					<p className={`mb--0`}>Starting at</p>
					<p className={`profile__booking-price-number mb--0 text--font-secondary text--lg`}>${this.getStartingRates()}</p>
					<Form onSubmit={this.validate()}>
						<Form.Field className={'field--inline'}>
							<div className="field--half">
								<input type="radio" id="online" defaultValue="online" name="bookingType" onChange={this.handleBookingTypeChange} />
								<label>Online</label>
							</div>
							<div className="field--half">
								<input type="radio" id="inPerson" defaultValue="inPerson" name="bookingType" onChange={this.handleBookingTypeChange} />
								<label>In Person</label>
							</div>
						</Form.Field>
						{this.state.bookingType === "inPerson" &&
							<Form.Field >
								<select name="inPersonType" id="inPersonType" onChange={this.handleCallType} required>
									<option value="">In Person Type</option>
									<option value="inCall">Go to Pro</option>
									<option value="outCall">Come to me</option>
								</select>
							</Form.Field>
						}

						<Form.Field>
							<label htmlFor="profession">Choose service</label>
							<select className={this.state.callType === '' ? 'inactive' : ''} name="profession" id="profession" value={this.state.profession ? this.state.profession : ''} onChange={this.handleChange} required>
								<option value="">Choose Service</option>
								{this.renderServices(this.props.pro.professions)}
							</select>
						</Form.Field>
						<Form.Field>
							<DatePicker
								className={this.state.profession === '' ? 'inactive date-picker' : 'date-picker'}
								selected={this.state.startDate}
								onYearChange={(t) => this.createdaysInweek(t)}
								onMonthChange={(t) => this.createdaysInweek(t)}
								onChange={this.handleDateChange}
								placeholderText={'Select Date'}
								minDate={addDays(new Date(), 1)}
								maxDate={moment().endOf('month')}
								dateFormat="MMMM d, yyyy"
								required={true}

								excludeDates={this.state.blockedDays}

							/>
						</Form.Field>
						<Form.Field className="field--half">
							<DatePicker
								className={this.state.startDate === '' ? 'inactive time-picker' : 'time-picker'}
								selected={this.state.startTime}
								onChange={this.handleStartTimeChange}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={30}
								timeCaption="Time"
								minTime={setHours(setMinutes(new Date(), 0), this.state.From)}
								maxTime={setHours(setMinutes(new Date(), 0), this.state.To)}
								dateFormat="hh:mm a"
								placeholderText={'Start Time'}
								required={true}
								// excludeDates={[new Date(), subDays(new Date(), 1)]}
								excludeTimes={this.state.timesExlude}
							/>
						</Form.Field>
						<Form.Field className="field--half">
							<select className={this.state.startTime === '' ? 'inactive' : ''} name="duration" id="duration" onChange={this.handleDurationChange} required>
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
								{this.state.callType === "outCall" &&
									<p><span>Pro Travel Fee</span> <span>$1</span></p>
								}
								<p className="field--review-total text--uppercase text--bold">Total<span>${this.state.callType === "outCall" ? this.calculateTotalwithOutCall() : this.calculateTotal()}</span></p>
							</div>
						</div>
						<Form.Field className="field--justify-center">
							{this.state.duration !== 0 && this.state.startDate !== '' && this.state.startTime !== '' ? null : <p style={{ marginBottom: '10px' }}>Please enter all the fields</p>}
							<Modal
								buttonText={!this.props.profile.isOnboardingClientCompleted ? 'you must complete onboarding' : 'Request to book'}
								buttonStyle={`button button--primary text--uppercase text--font-secondary text--sm ${this.state.bookingType !== '' && this.state.profession !== '' && this.state.duration !== 0 && this.state.startDate !== '' && this.state.startTime !== '' && this.props.profile.isOnboardingClientCompleted ? 'button--active' : 'button--inactive'}`}
								content={(
									<div style={{ textTransform: 'none' }}>
										<h2>Complete Booking</h2>
										<p>Your total of ${this.state.callType === "outCall" ? this.calculateTotalwithOutCall() : this.calculateTotal()} will be processed to book the session with <span className="text--capitalize">{this.state.proFirstName}</span>.</p>
										<p>Please choose your preferred method of payment below.</p>
										<PayPalButton
											// amount={this.state.callType === "outCall" ? this.calculateTotalwithOutCall() : this.calculateTotal()}
											amount={1} // testing
											shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
											onSuccess={(details, data) => {
												// alert("Transaction completed by " + details.payer.name.given_name);
												this.handleSubmit(details, data)
											}}
											options={{
												clientId: PaypalConfig.client_id
											}}
										/>
									</div>
								)}
							/>

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
		authError: state.auth.authError,
		profile: state.firebase.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createInteraction: (interaction) => dispatch(createInteraction(interaction))
	}
}




export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection: 'users' }
	])
)(withRouter(Booking))