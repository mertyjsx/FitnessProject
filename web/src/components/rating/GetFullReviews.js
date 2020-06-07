import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { compose } from 'redux';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';

class GetFullReviews extends Component {

	constructor(props) {
		super(props);
		this.state = {}
		this.renderReview = this.renderReview.bind(this)
	}

	renderReview = (review) => {
		console.log(review);

		return (
			<div>
				{review.message}
			</div>
		)
	}

	render() {
		const { reviews, proInteractions } = this.props

		if (reviews) {
			return (
				<div>
					{reviews && reviews.forEach((review) => proInteractions.forEach((pro) => {
						if (review.ratingID === pro) {
							this.renderReview(review)
						}
					}))}
				</div>
			)
		} else {
			return (
				<div>
					No Reviews
				</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		reviews: state.firestore.ordered.reviews
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect((props, store) => {
		// const uid = props.user.uid;
		return [{
			collection: 'reviews'
		}]
	})
)(GetFullReviews)