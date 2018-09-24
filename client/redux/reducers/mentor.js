import {
  FETCH_MENTORS_REQUEST,
  FETCH_MENTORS_SUCCESS,
  FETCH_MENTORS_FAILURE,
  FETCH_MENTOR_EXPERTISE_REQUEST,
  FETCH_MENTOR_EXPERTISE_SUCCESS,
  FETCH_MENTOR_EXPERTISE_FAILURE,
} from '../actions/mentor';

const defaultState = {
  loading: false,
  loaded: false,
  mentors: [],
  expertise: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_MENTORS_REQUEST:
    case FETCH_MENTOR_EXPERTISE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MENTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        mentors: action.mentors,
      };
    case FETCH_MENTOR_EXPERTISE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        expertise: action.expertise,
      };
    case FETCH_MENTORS_FAILURE:
    case FETCH_MENTOR_EXPERTISE_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}
