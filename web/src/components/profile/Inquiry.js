import { addDays, setHours, setMinutes } from "date-fns";
import moment from 'moment';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from 'react-router-dom';
import { compose } from "redux";
import { Button, Form } from 'semantic-ui-react';
import spinner from '../../assets/images/spinner.gif';
import { createInteractionInquiry } from '../../store/actions/interactionActions';
import AutoComplete from "./AutoComplete";


class Inquiry extends Component {

	constructor(props) {
		super(props)
		this.state = {
			interactionType: 'inquiry',
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
			message: '',
			blockedDays: [],
			blockedDaysName: [],
			blockedTimes: [],
			From: -1,
			To: 25,
			spesific: [],
			timesExlude: [],
			callType: "",
			addressType: "onFile",
			googleAddress: ""
		}
	}

	validate = () => {
	}

	handleSubmit = () => {
		let $this = this
		$this.setState({
			total: $this.calculateTotal(),
			callType: $this.state.callType,
			addressType: $this.state.addressType,
			googleAddress: $this.state.googleAddress,
			formSubmitting: true,
			clientPhoneNumber: $this.props.profile.phoneNumber,
			proPhoneNumber: $this.props.pro.phoneNumber,
			clientFullAdress: $this.props.profile.personalAddress1 + ' ' + this.props.profile.personalCity + ', ' + this.props.profile.personalState + this.props.profile.personalZip,
			proBusinessName: $this.props.pro.businessName,
			proFullAddress: $this.props.pro.businessAddress1 + ' ' + this.props.pro.businessCity + ', ' + this.props.pro.businessState + this.props.pro.businessZip,
			userUpdate: true,
			proUpdate:true
		})
		setTimeout(function () {
			// console.log('wait 3 secs', $this.props);
			$this.props.createInteractionInquiry($this.state)
			document.body.style.overflow = 'unset'
			$this.props.history.push('/inbox')
		}, 3000)
	}

	handleBookingTypeChange = (e) => {
		this.setState({
			bookingType: e.target.value,
			profession: '',
			startDate: '',
			startTime: '',
			endTime: '',
			callType:'',
		})
	}

	handleCallType = (e) => {
		this.setState({
			callType: e.target.value
		})
	}

	handleAddressType = (e) => {
		this.setState({
			addressType: e.target.value
		})
	}

	getHours = () => {
		let blockedDaysName = []
		let blockedTimes = []
		// console.log(this.props.pro.Hours)
		this.props.pro.Hours &&
			Object.entries(this.props.pro.Hours).forEach(([key, value]) => {
				if (!value.from) {
					//there are no hour Restriction
					if (!value.state) {
						//full day	
						blockedDaysName.push(key)
					}
				} else {
					//there are hour Restriction
					blockedTimes.push({ value, key })
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
			blockedDaysName: blockedDaysName
			, blockedTimes: blockedTimes,
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
			// console.log(item)
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
				if (i !== numberTo) {
					NA.push(setHours(setMinutes(new Date(), 30), i))
				}
			}
			this.setState({ timesExlude: NA })
		}

		let itemWorkHours = this.state.blockedTimes.find(item => item.key === name.toLowerCase())
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

	createdaysInweek(n) {

		let NewArray = this.state.blockedDays
		this.state.blockedDaysName.map(day => {
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
					break;
				default:
					selectedday = 0;
			}
			// console.log(selectedday)
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

	handleMessage = (e) => {
		this.setState({
			message: e.target.value
		})
	}

	handleChange = (e) => {
		const bookingType = this.state.bookingType

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

	onSelectAdress = (val) => {
		this.setState({
			googleAddress: val
		})
	}

	renderStartTime = () => {
		const { startTime } = this.state
		if (startTime === '') { return null }
		var time = moment(startTime).format('hh:mm a')
		// console.log(time);
		this.createdaysInweek(time)
		return 0
		// return moment(time).format()
	}

	calculateDuration = () => {
		const { duration } = this.state
		if (duration === 0) { return 0 }
		const hours = (duration / 60);
		return hours;
	}

	handleDurationChange = (e) => {
		this.setState({
			duration: e.target.value
		})
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
		if (pro.ratesOnlineMassageTherapist) (ratesArray.push(pro.ratesOnlineMassageTherapist))

		ratesArray.sort((a, b) => a - b);
		return ratesArray[0]
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

	componentDidMount() {
		this.getHours()
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			// console.log("s")
			this.getHours()
		}
	}

	render() {
		// const { pro, user } = this.props;
		console.log(this.state)
		return (
			<div className={`profile__booking profile__booking--inquiry ${this.state.formSubmitting ? 'profile__booking--submitting' : ''}`}>
				<div className={`loading ${this.state.formSubmitting ? 'loading--active' : ''}`}>
					<img src={spinner} alt="" />
				</div>

				<div className={`profile__booking-price`}>
					<p className={`mb--0`}>Starting at</p>
					<p className={`profile__booking-price-number mb--0 text--font-secondary text--lg`}>${this.getStartingRates()}</p>
					<Form onSubmit={this.handleSubmit}>
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
						{this.state.bookingType === "inPerson" && this.state.callType === "outCall" &&
							<Form.Field >
								<select name="addressType" id="addressType" onChange={this.handleAddressType} required>
									<option value="onFile">Personal address on file</option>
									<option value="otherAddress">Other address/landmark</option>
								</select>
							</Form.Field>
						}
						{this.state.bookingType === "inPerson" && this.state.callType === "outCall" && this.state.addressType === "otherAddress" &&
							<Form.Field>
								<AutoComplete onSelected={this.onSelectAdress}></AutoComplete>
							</Form.Field>
						}
						<Form.Field>
							<label htmlFor="profession">Choose service</label>
							<select className={this.state.bookingType === 'online' || this.state.callType !== '' ? '' : 'inactive'} name="profession" id="profession" value={this.state.profession ? this.state.profession : ''} onChange={this.handleChange} required>
								<option value="">Choose Service</option>
								{this.renderServices(this.props.pro.professions)}
							</select>
						</Form.Field>
						<Form.Field>
							<DatePicker
								className={this.state.profession === ''||(this.state.addressType==="otherAddress"?this.state.googleAddress==='':false) ? 'inactive date-picker' : 'date-picker'}
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
						<Form.Field>
							<textarea name="message" id="message" onChange={this.handleMessage} required></textarea>
						</Form.Field>
						<Form.Field>
							<Button className={'button button--primary text--uppercase text--font-secondary text--sm'}>Send Inquiry</Button>
						</Form.Field>
					</Form>
				</div>
			</div>
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
		createInteractionInquiry: (interaction) => dispatch(createInteractionInquiry(interaction))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection: 'users' }
	])
)(withRouter(Inquiry))