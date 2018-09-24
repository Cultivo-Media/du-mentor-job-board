import apiRequest from '../helpers/api';

export const readMentors = () => apiRequest('mentors');

export const readMentorExpertise = () => apiRequest('mentors/expertise');