import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { convertToSenteneCase } from '../../helpers'

class GetFullReviews extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const { reviews, proInteractions } = this.props

		if (proInteractions.length > 0) {
			return (
				<div className="reviews">
					{reviews && reviews.map(review => (
						proInteractions.map(interaction => {
							if (review.id === interaction) {
								return (
									<div className="review" key={review.id}>
										<div className="review__image">
											<img src={review.reviewerImage} />
										</div>
										<div className="review__content">
											<h2 className="text--capitalize">{review.reviewerFirstName} {review.reviewerLastName}</h2>
											<StarRatingComponent
												name="rate1"
												starCount={5}
												editing={false}
												starColor={'#e5c30a'}
												renderStarIcon={() => <FontAwesomeIcon icon={["fa", "star"]} />}
												// emptyStarColor={''}
												value={review.rating}
											/>
											{review.ratingService && (<p><strong>Service:</strong> {convertToSenteneCase(review.ratingService)}</p>)}
											<p>{review.ratingMessage}</p>
										</div>
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
					No Reviews Yet
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