import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import StarRatingComponent from 'react-star-rating-component';
import { compose } from 'redux';

class GetSingleReview extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
          const { iid, reviews } = this.props
          if(iid && iid.length > 0) {
               return (
                    <div className="review-single">
                         {/* { reviews } */}
                         { reviews && reviews.map(review => (
                              review.id === iid ? (
                                   <div className="review-single__content">
                                        <StarRatingComponent
                                             name="rate1"
                                             starCount={5}
                                             editing={false}
                                             starColor={'#e5c30a'}
                                             renderStarIcon={() => <FontAwesomeIcon icon={["fa", "star"]} />}
                                             // emptyStarColor={''}
                                             value={review.rating}
                                        />
                                        <p>{review.ratingMessage}</p>
                                   </div>
                              ) : null
                         ))}
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
)(GetSingleReview)