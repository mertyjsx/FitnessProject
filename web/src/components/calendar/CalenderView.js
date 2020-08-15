import moment from 'moment';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import Scroll, { scroller } from 'react-scroll';
import { updateCalendar } from '../../store/actions/profileActions';
import CalendarItems from "./calendarItems";
import Modal from "./calendarModal";
import EditHours from "./OperatingHours";

var Element = Scroll.Element;

class CalendarView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			dates: [],
			selectedDate: moment().add(1, 'day').toDate(),
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			modal: false,
			currentTime: ""
		}
	}

	UnblockIt = (dateObject) => {
		let profileObj = this.props.profile
		let letNewArray = []
		const date = `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`
		if (profileObj.blockedArray) {
			letNewArray = profileObj.blockedArray.filter(item => item.date !== date)
			this.props.updateCalendar(letNewArray)
		}
	}

	blockTime = (dateC, obj) => {
		let profileObj = this.props.profile
		let letNewArray = []
		const date = `${dateC.getDate()}-${dateC.getMonth() + 1}-${dateC.getFullYear()}`
		const type = "blockHours"
		const from = obj.from
		const to = obj.to
		const title = obj.title
		const description = obj.description
		const newobj = {
			date, type, to, from, title, description
		}
		if (profileObj.blockedArray) {
			letNewArray = profileObj.blockedArray
			letNewArray.push(newobj)
		} else {
			letNewArray.push(newobj)
		}
		this.props.updateCalendar(letNewArray)
	}

	blockIt = (dateObject) => {
		let profileObj = this.props.profile
		let letNewArray = []
		const date = `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`
		const type = "blockAll"
		const hour = null
		const obj = { date, type, hour }
		if (profileObj.blockedArray) {
			letNewArray = profileObj.blockedArray
			letNewArray.push(obj)
		} else {
			letNewArray.push(obj)
		}
		this.props.updateCalendar(letNewArray)
	}

	openModal = (date) => {
		// console.log("olduuuuuu")
		this.setState({
			modal: true,
			currentTime: date
		})
	}

	componentDidMount() {
		this.getDaysInMonth()
	}

	getDaysInMonth = (n) => {
		console.log(n)
		var y = new Date(n ? n : this.state.selectedDate).getFullYear()
		var m = new Date(n ? n : this.state.selectedDate).getMonth()
		var d = new Date(n ? 1 : this.state.selectedDate).getUTCDate()

		// console.log(y)
		// console.log(m)
		console.log(new Date().getUTCDate())
		var date = new Date(y, m, d);
		var days = [];
		while (date.getMonth() === m) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
		console.log(days)
		this.setState({ dates: days })
	}

	scrollTo = (n) => {
		// console.log(n)
		scroller.scrollTo(n, {
			duration: 800,
			delay: 0,
			containerId: "containerElement",
			smooth: 'easeInOutQuart'
		})
	}

	onChange = e => {
		// console.log("buuuuuuuuuuuuuu", e.target.value)
		this.scrollTo(e.target.value)
		this.getDaysInMonth()
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleDateChange = date => {
		var check = moment(date, 'YYYY/MM/DD');
		console.log("buuuuuuuuuuuuuu", check)
		this.scrollTo(`${date.getDate()}${this.state.months[date.getMonth()]}`)

		this.setState({
			selectedDate: date
		}, () => this.getDaysInMonth());
	};

	setModal = () => {
		this.setState({ modal: false })
	}

	handleDurationChange = (e) => {
		this.getDaysInMonth()
		this.setState({
			duration: e.target.value
		})
	}

	handleStartTimeChange = time => {
		this.getDaysInMonth()
		this.setState({
			startTime: time
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.updateCalendar(this.state);
	}

	onModalOpen = () => {
		document.body.style.overflow = 'hidden'
		this.setState({
			modal: true
		})
	}

	onModalClose = () => {
		document.body.style.overflow = 'unset'
		this.setState({
			modal: false
		})
	}

	render() {
		//console.log(typeof this.state.selectedDate);
		const blockArray = this.props.profile.blockedArray
		//console.log(this.props.profile.blockedArray)
		return (
			<div className={`calender`}>
				<Modal date={this.state.currentTime} onModalClose={this.onModalClose} modal={this.state.modal} onModalClose={this.onModalClose} onClick={this.blockTime}></Modal>
				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col">
							<div className={`bookings__head`}>
								<h1 className={`text--lg text--uppercase`}>Calendar</h1>
							</div>
						</div>
					</div>
					<div className={`divider`}></div>
					<div className="row">
						<div className="col col--4">
							<div className="calendar-wrapper">
								<DatePicker
									className="test"

									selected={this.state.startDate ? this.state.startDate : this.state.selectedDate}
									onChange={this.handleDateChange}
									placeholderText={'Select Date'}
									minDate={moment().add(1, 'day').toDate()}
									dateFormat="MMMM d, yyyy"
									inline
									onMonthChange={(n) => this.getDaysInMonth(n)}
									onYearChange={(n) => this.getDaysInMonth(n)}
								/>
							</div>
							<div className={`divider`}></div>
							<div className="calendar__operating-hours">
								<h2 className="text--uppercase">Operating Hours</h2>
								<div class={`status status--warning`} style={{ marginBottom: '20px' }}>
									<p>Set your operating hours here.</p>
								</div>
								<form className="operating-hours">
									<EditHours></EditHours>
								</form>
							</div>
						</div>
						<div className="col col--8">
							<div className="calendar__block">
								<div className="calendar__title">
									<h2 className="text--uppercase">Block Days</h2>
								</div>
								<div className="calendar__block-day">
									<form>
										<p>Selected Day: <strong>{moment(this.state.selectedDate).format("dddd, MMMM Do YYYY")}</strong></p>
									</form>
								</div>
								<Element name="test7" className="element" id="containerElement" style={{
									position: 'relative',
									height: '600px',
									overflow: 'scroll',
									marginBottom: '100px'
								}}>

									{this.state.dates.map((item) => {
										let dateObj = `${item.getDate()}-${item.getMonth() + 1}-${item.getFullYear()}`
										let Blockedobj = blockArray && blockArray.find((blockitem) => blockitem.date === dateObj)
										// console.log(Blockedobj)
										if (Blockedobj) {
											// console.log("typeeeeeeeeeeeeeee", Blockedobj.type)
											if (Blockedobj.type === "blockAll") {
												return (
													<Element name={`${item.getDate()}${this.state.months[item.getMonth()]}`}>
														<CalendarItems name={`${item.getDate()}${this.state.months[item.getMonth()]}`}
															Element={Element}
															left={`${item.getDate()} ${this.state.months[item.getMonth()]}`}
															item={item}
															blocked={true}
															Click={this.UnblockIt}
														/>
													</Element>
												)
											} else {
												return (
													<Element name={`${item.getDate()}${this.state.months[item.getMonth()]}`}>
														<CalendarItems name={`${item.getDate()}${this.state.months[item.getMonth()]}`}
															Element={Element}
															left={`${item.getDate()} ${this.state.months[item.getMonth()]}`}
															item={item}
															blocked={false}
															blockedobj={Blockedobj}
															Click={this.blockIt}
															Click2={this.UnblockIt}
														/>
													</Element>
												)
											}
										} else {
											return (
												<Element name={`${item.getDate()}${this.state.months[item.getMonth()]}`}>
													<CalendarItems name={`${item.getDate()}${this.state.months[item.getMonth()]}`}
														Element={Element}
														left={`${item.getDate()} ${this.state.months[item.getMonth()]}`}
														item={item}
														blocked={false}
														blockhour={false}
														Click={this.blockIt}
														Click2={this.openModal}
													/>
												</Element>
											)
										}
									}
									)}
								</Element>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateCalendar: (cal) => dispatch(updateCalendar(cal))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView)