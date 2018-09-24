import apiRequest from '../helpers/api';

export const readMentors = () => apiRequest('mentors');

export const readMentorExpertise = () => apiRequest('mentors/expertise');

export const updateMentor = mentor => apiRequest(`mentors/${mentor._id}`, 'POST', mentor);
