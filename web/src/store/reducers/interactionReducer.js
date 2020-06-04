const initState = {}

const interactionReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_INTERACTION':
			console.log('created interaction', action.interaction)
			return state;
		case 'CREATE_INTERACTION_ERROR':
			console.log('create interaction error', action.error);
			return state;
		case 'CONFIRM_BOOKING':
			console.log('confirm booking error', action.interaction);
			return state;
		case 'CONFIRM_BOOKING_CANCEL':
			console.log('confirm booking cancel error', action.error);
			return state;
		case 'SEND_BOOKING_REQ_FROM_INQUIRY':
			console.log('send booking req from inquiry', action.interaction);
			return state;
		case 'SEND_BOOKING_REQ_FROM_INQUIRY_ERROR':
			console.log('send booking req from inquiry error', action.error);
			return state;
		case 'CLOSE_INQUIRY':
			console.log('create interaction error', action.interaction);
			return state;
		case 'CLOSE_INQUIRY_ERROR':
			console.log('create interaction error', action.error);
			return state;
		case 'COMPLETED':
			console.log('completed error', action.interaction);
			return state;
		case 'COMPLETED_ERROR':
			console.log('completed error', action.error);
			return state;
		default:
			return state;
	}
}

export default interactionReducer