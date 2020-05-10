export const createProject = (project) => {
	return (dispatch, getState) => {
		// Make async call to db
		dispatch({ type: 'CREATE_PROJECT', project });
	}
}