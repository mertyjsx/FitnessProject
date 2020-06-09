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
		this.renderReviews = this.renderReviews.bind(this)
	}

	renderReviews = (reviews, proInteractions) => {
		// console.log(reviews);
		var allReviews = []

		// console.log(allReviews);


		return (
			<div>

				{/* {reviews && reviews.map((review) => proInteractions.map((interaction) => {
					if (review.ratingID === interaction) {
						// allReviews.push(
						return (
							<div key={review.id}>
								{review.message}
							</div>
						)
						// )
					}
				}))} */}
			</div>
		)
	}

	render() {
		const { reviews, proInteractions } = this.props

		if (reviews) {
			return (
				<div>
					{reviews && reviews.map(review => (
						proInteractions.map(interaction => {
							if (review.id === interaction) {
								return (
									<div>
										{review.id}
									</div>
								)
							}
						})
					))}
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