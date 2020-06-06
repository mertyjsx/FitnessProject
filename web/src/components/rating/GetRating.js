import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { compose } from 'redux';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';

class GetRating extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	getRatingScore = () => {
		const { reviews, proInteractions } = this.props
		const proScores = []

		if (proInteractions.length !== 0) {
			reviews && reviews.forEach((review) => proInteractions.forEach((pro) => {
				if (review.ratingID === pro) {
					proScores.push(review.rating)
				}
			}))

			if (proScores.length > 0) {
				const sum = proScores.reduce((previous, current) => current += previous)
				const avg = sum / proScores.length

				return (
					<div className="stars">
						<div className="stars__rating">
							{avg.toFixed(1)}
						</div>
						<StarRatingComponent
							name="rate1"
							starCount={5}
							editing={false}
							starColor={'#e5c30a'}
							renderStarIcon={() => <FontAwesomeIcon icon={["fa", "star"]} />}
							// emptyStarColor={''}
							value={avg.toFixed(1)}
						/>
					</div>
				)
			}
		}

		return (
			<div className="stars">
				<div className="stars__none">
					No Reviews Yet
				</div>
			</div>
		)

	}

	render() {
		return (
			this.getRatingScore()
		)
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
)(GetRating)