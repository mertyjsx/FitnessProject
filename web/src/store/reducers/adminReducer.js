const initState = {
     adminError: null
}

const adminReducer = (state = initState, action) => {
     switch (action.type) {
          case 'UPDATE_QUOTE_ERROR':
               console.log('login error');
               return {
                    ...state,
                    adminError: 'Login failed'
               }
          default:
               return state

     }
}

export default adminReducer