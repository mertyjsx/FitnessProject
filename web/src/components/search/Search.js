import React from 'react'
import { connect } from 'react-redux'
import ProList from './ProList'

const Search = (props) => {
	console.log('ssearch console', props);
	const pros = props.pros;

	return (
		<section className={`search`}>
			<div className={`search__profiles`}>
				<ProList pros={pros} />
			</div>
		</section>
	)
}

// const mapStateToProps = (state) => {
// 	return {
// 		auth: state.firebase.auth,
// 		profile: state.firebase.profile
// 	}
// }

// export default connect(mapStateToProps)(Search)
export default Search