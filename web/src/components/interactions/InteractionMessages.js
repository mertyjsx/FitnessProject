import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Form, Radio, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { setSeconds, setMinutes, setHours, addDays } from "date-fns";
import { db, auth, rtdb } from '../../config/fbConfig';
import TimeRange from 'react-time-range';
import moment from 'moment'
import { createInteraction } from '../../store/actions/interactionActions'
import { renderProfileImage } from '../helpers/HelpersProfile'

class InteractionMessages extends Component {

	constructor(props) {
		super(props)
		this.state = {
			user: auth().currentUser,
			status: '',
			chats: [],
			chatGroup: '',
			content: '',
			readError: null,
			writeError: null
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderMessage = this.renderMessage.bind(this);
	}

	async componentDidMount() {
		this.setState({ readError: null });
		try {
			rtdb.ref(`chats/${this.props.groupID}/msgs`)
				.limitToLast(10)
				.on("value", snapshot => {
					let chats = [];
					snapshot.forEach((snap) => {
						chats.push(snap.val());
					});
					this.setState({ chats });
				});
		} catch (error) {
			this.setState({ readError: error.message });
		}
	}

	handleChange(event) {
		this.setState({
			content: event.target.value
		});
	}

	async handleSubmit(event) {
		event.preventDefault();
		this.setState({ writeError: null });
		try {
			await rtdb.ref(`chats/${this.props.groupID}/msgs`).push({
				content: this.state.content,
				timestamp: Date.now(),
				uid: this.state.user.uid
			});
			this.setState({ content: '' });
		} catch (error) {
			this.setState({ writeError: error.message });
		}
	}

	renderMessage(time, content, sender) {
		var timeOfMessage = typeof time === 'number' ? time : null
		const contentSent = typeof content === 'string' ? content : null
		const senderUID = typeof sender === 'string' ? sender : null
		// const receiver = senderUID !== this.state.user ? 

		return (
			<div key={timeOfMessage} className={`message__item ${senderUID !== this.state.user.uid ? `message__item--receiver` : ''}`}>
				<div className="message__content">
					<div className="message__content-sent">
						<p>{contentSent}</p>
					</div>
					<div className="message__content-time">
						<p>{moment(timeOfMessage).format("dddd, MMMM Do YYYY h:mm A")}</p>
					</div>
				</div>
				<div className="message__sender">
					{this.props.meta.userUID === senderUID ?
						<div>
							{renderProfileImage()}
							<p className="text--capitalize">{this.props.meta.userFirstName + ' ' + this.props.meta.userLastName[0] + '.'}</p>
						</div>
						:
						<div>
							{renderProfileImage(this.props.meta.proImage, `${this.props.meta.proFirstName} + ${this.props.meta.proLastName[0]}`)}
							<p className="text--capitalize">{this.props.meta.proFirstName + ' ' + this.props.meta.proLastName[0] + '.'}</p>
						</div>
					}
				</div>
			</div >
		)
	}

	render() {

		return (
			<div className={`message`}>
				<div className={`message__history`}>
					{this.state.chats.map(chat => {
						return this.renderMessage(chat.timestamp, chat.content, chat.uid)
					})}
				</div>
				{this.props.meta.interactionType !== 'cancelled' ?
					<div className={`message__create`}>
						<form onSubmit={this.handleSubmit}>
							<textarea onChange={this.handleChange} value={this.state.content} placeholder={`Message`}></textarea>
							{this.state.error ? <p>{this.state.writeError}</p> : null}
							<button className="button button--secondary text--uppercase" type="submit">Send</button>
						</form>
					</div>
					: null}
			</div>
		)
	}
}

export default InteractionMessages