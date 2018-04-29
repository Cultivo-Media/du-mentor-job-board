import { loadingState, loadedState, errorState, createReducer } from '../reducers';
import createApiRequest from '../helpers/api';

const FETCH_JOBS = 'jobs/FETCH_JOBS';
const FETCH_JOBS_REQUEST = 'jobs/FETCH_JOBS_REQUEST';
const FETCH_JOBS_SUCCESS = 'jobs/FETCH_JOBS_SUCCESS';
const FETCH_JOBS_FAILURE = 'jobs/FETCH_JOBS_FAILURE';

export default createReducer({}, {
  [FETCH_JOBS_REQUEST]: state => ({
    ...state,
    ...loadingState,
  }),
  [FETCH_JOBS_SUCCESS]: (state, { response }) => ({
    ...state,
    ...loadedState,
    jobs: response,
  }),
  [FETCH_JOBS_FAILURE]: (state, { response }) => ({
    ...state,
    ...errorState,
    error: response,
  }),
});

export const fetchJobsRequest = () => ({
  type: FETCH_JOBS,
  promise: createApiRequest(),
});
