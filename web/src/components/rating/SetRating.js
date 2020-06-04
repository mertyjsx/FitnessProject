import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { completeReview } from '../../store/actions/reviewActions'

class SetRating extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 1,
			ratingMessage: '',
			ratingID: props.iid

		};
		this.onStarClick = this.onStarClick.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onStarClick = (nextValue, prevValue, name) => {
		this.setState({ rating: nextValue });
	}

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault()
		this.props.completeReview(this.state)
	}

	render() {
		const { rating } = this.state;
		const { iid } = this.props;

		return (
			<div className="rating__stars">
				<form onSubmit={this.onSubmit}>
					<StarRatingComponent
						name="rate1"
						starCount={5}
						starColor={'#e5c30a'}
						renderStarIcon={() => <FontAwesomeIcon icon={["fa", "star"]} />}
						// emptyStarColor={''}
						value={rating}
						onStarClick={this.onStarClick}
					/>
					<div className="rating__message">
						<textarea id={'ratingMessage'} onChange={this.onChange} placeholder={'Write about your experience...'}></textarea>
					</div>
					<div className="rating__button">
						<Button className={'button button--accent'}>Send Review</Button>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		completeReview: (onboard) => dispatch(completeReview(onboard))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SetRating)