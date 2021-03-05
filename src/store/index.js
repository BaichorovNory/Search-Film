export const SEARCH_MOVIES_REQUEST = 'SEARCH_MOVIES_REQUEST'
export const SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS'
export const SEARCH_MOVIES_FAILURE = 'SEARCH_MOVIES_FAILURE'

export const initialState = {
    loading: true,
    movies: [],
    errorMessage: null
  }
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case SEARCH_MOVIES_REQUEST:
        return {
          ...state,
          loading: true,
          errorMessage: null
        }

      case SEARCH_MOVIES_SUCCESS:
        return {
          ...state,
          loading: false,
          movies: action.payload
        }

      case SEARCH_MOVIES_FAILURE:
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        }

      default:
        return state;
    }
  }