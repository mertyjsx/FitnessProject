const initState = {}

const interactionReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_INTERACTION':
			console.log('created interaction', action.interaction)
			return state;
		case 'CREATE_INTERACTION_ERROR':
			console.log('create interaction error', action.error);
			return state;
		case 'CLOSE_INQUIRY':
			console.log('create interaction error', action.interaction);
			return state;
		case 'CLOSE_INQUIRY_ERROR':
			console.log('create interaction error', action.error);
			return state;
		default:
			return state;
	}
}

export default interactionReducer