
const initState = {}

const settingsReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_SETTINGS':
			console.log('created search', action.settings)
			return state;
		case 'CREATE_SETTINGS_ERROR':
			console.log('create search error', action.error);
			return state;
		default:
			return state;

	}
}

export default settingsReducer