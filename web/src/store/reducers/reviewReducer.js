
const initState = {}

const reviewReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_REVIEW':
			console.log('created search', action.project)
			return state;
		case 'CREATE_REVIEW_ERROR':
			console.log('create search error', action.error);
			return state;
		default:
			return state;

	}
}

export default reviewReducer