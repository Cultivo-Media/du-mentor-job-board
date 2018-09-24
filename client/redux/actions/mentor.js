import { readMentors, readMentorExpertise } from '../api/mentor';

export const FETCH_MENTORS_REQUEST = 'mentor/FETCH_MENTORS_REQUEST';
export const FETCH_MENTORS_SUCCESS = 'mentor/FETCH_MENTORS_SUCCESS';
export const FETCH_MENTORS_FAILURE = 'mentor/FETCH_MENTORS_FAILURE';

export const FETCH_MENTOR_EXPERTISE_REQUEST = 'mentor/FETCH_MENTOR_EXPERTISE_REQUEST';
export const FETCH_MENTOR_EXPERTISE_SUCCESS = 'mentor/FETCH_MENTOR_EXPERTISE_SUCCESS';
export const FETCH_MENTOR_EXPERTISE_FAILURE = 'mentor/FETCH_MENTOR_EXPERTISE_FAILURE';

export const FETCH_MENTOR_UPDATE_REQUEST = 'mentor/FETCH_MENTOR_UPDATE_REQUEST';
export const FETCH_MENTOR_UPDATE_SUCCESS = 'mentor/FETCH_MENTOR_UPDATE_SUCCESS';
export const FETCH_MENTOR_UPDATE_FAILURE = 'mentor/FETCH_MENTOR_UPDATE_FAILURE';

// ACTIONS FOR FETCHING ALL MENTORS

const fetchMentorsRequest = () => ({
  type: FETCH_MENTORS_REQUEST,
});

const fetchMentorsSuccess = mentors => ({
  type: FETCH_MENTORS_SUCCESS,
  mentors,
});

const fetchMentorsFailure = error => ({
  type: FETCH_MENTORS_FAILURE,
  error,
});

export const fetchMentors = () => (dispatch) => {
  dispatch(fetchMentorsRequest());

  return readMentors()
    .then(mentors => dispatch(fetchMentorsSuccess(mentors)))
    .catch(err => dispatch(fetchMentorsFailure(err)));
};

const fetchMentorExpertiseRequest = () => ({
  type: FETCH_MENTOR_EXPERTISE_REQUEST,
});

const fetchMentorExpertiseSuccess = expertise => ({
  type: FETCH_MENTOR_EXPERTISE_SUCCESS,
  expertise,
});

const fetchMentorExpertiseFailure = error => ({
  type: FETCH_MENTOR_EXPERTISE_FAILURE,
  error,
});

export const fetchMentorExpertise = () => (dispatch) => {
  dispatch(fetchMentorExpertiseRequest());

  return readMentorExpertise()
    .then(expertise => dispatch(fetchMentorExpertiseSuccess(expertise)))
    .catch(err => dispatch(fetchMentorExpertiseFailure(err)));
};

const fetchMentorUpdateRequest = () => ({
  type: FETCH_MENTOR_UPDATE_REQUEST,
});

const fetchMentorUpdateSuccess = mentor => ({
  type: FETCH_MENTOR_UPDATE_SUCCESS,
  updatedMentor: mentor,
});

const fetchMentorUpdateFailure = error => ({
  type: FETCH_MENTOR_UPDATE_FAILURE,
  error,
});

export const fetchMentorUpdate = mentor => (dispatch) => {
  dispatch(fetchMentorUpdateRequest());

  return updateMentor(mentor)
    .then(m => dispatch(fetchMentorUpdateSuccess(m)))
    .catch(err => dispatch(fetchMentorUpdateFailure(err)));
};
