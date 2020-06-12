import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import moment from 'moment'
import { Form, Radio, Button, Checkbox, Input, TextArea, Label } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { updateCalendar } from '../../store/actions/profileActions'

class CalendarView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedDate: new Date(),
		}
	}

	onChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleDateChange = date => {
		this.setState({
			selectedDate: date
		});
	};

	handleDurationChange = (e) => {
		this.setState({
			duration: e.target.value
		})
	}

	handleStartTimeChange = time => {
		this.setState({
			startTime: time
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.updateCalendar(this.state);
	}


	render() {
		console.log(typeof this.state.selectedDate);

		return (
			<div className={`calender`}>
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
									selected={this.state.startDate}
									onChange={this.handleDateChange}
									placeholderText={'Select Date'}
									minDate={new Date()}
									dateFormat="MMMM d, yyyy"
									inline
								/>
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
										<button className="button" style={{ width: '100%' }}>Block Day</button>
									</form>
								</div>

								<div className={`divider`}></div>

								<div className="calendar__operating-hours">
									<form>
										<div className="field">
											<label>Sunday</label>

										</div>
									</form>
								</div>
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