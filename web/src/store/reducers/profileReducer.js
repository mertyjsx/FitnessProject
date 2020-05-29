const initState = {}

const profileReducer = (state = initState, action) => {
	switch (action.type) {
		case 'UPDATE_SPECIALTIES':
			console.log('updated specialities', action.interaction)
			return state;
		case 'UPDATE_SPECIALTIES_ERROR':
			console.log('update specialities error', action.error);
			return state;
		default:
			return state;
	}
}

export default profileReducer