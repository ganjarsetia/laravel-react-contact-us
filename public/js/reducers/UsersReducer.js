export default function reducer(state={
    users: [],
    user: null,
    fetched: false,
    error: null
}, action){

  switch (action.type){

    case "FETCH_USERS_REJECTED": {
      return {
        ...state,
        fetched: false,
        error: action.payload
      }
    }

    case "FETCH_USERS_FULFILLED": {
      return {
        ...state,
        fetched: true,
        users: action.payload.data.users,
      }
    }

    case "FETCH_USER_REJECTED": {
      return {
        ...state,
        fetched: false,
        error: action.payload
      }
    }

    case "FETCH_USER_FULFILLED": {
      return {
        ...state,
        fetched: true,
        user: action.payload
      }
    }

  }

  return state;

}
