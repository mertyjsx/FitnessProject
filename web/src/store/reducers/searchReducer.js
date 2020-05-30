const initState = {}

const searchReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_SEARCH':
			console.log('created search', action.project)
			return state;
		case 'CREATE_SEARCH_ERROR':
			console.log('create search error', action.error);
			return state;
		default:
			return state;

	}
}

export default searchReducer