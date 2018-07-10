const mongoose = require('mongoose');

/**
 * schema (mentorSchema)
 *
 * mongoose schema
 *
 * The configuration for a schema that models what a mentor looks like.
 */
const schema = new mongoose.Schema({
  /**
   * name
   *
   * string
   *
   * A string representing the name of the mentor to create.
   */
  name: {
    type: String,
    required: true,
    default: '',
  },

  /**
   * company
   *
   * string
   *
   * A string representing the company the mentor is employed at.
   */
  company: {
    type: String,
    required: true,
    default: '',
  },

  /**
   * title
   *
   * string
   *
   * The title the mentor has at their company.
   */
  title: {
    type: String,
    required: true,
    default: '',
  },

  /**
   * bio
   *
   * string
   *
   * A bio (usually very long) about the mentor providing details on what they specialize in
   */
  bio: {
    type: String,
    required: true,
    default: '',
  },

  /**
   * characteristics
   *
   * array of strings
   *
   * An array that represents certain characteristics that the mentor has.
   *
   * Example: ['alumni', 'staff', 'faculty']
   */
  characteristics: [{
    type: String,
  }],

  /**
   * expertise
   *
   * array of strings
   *
   * An array that has the expertise for a provided mentor.
   */
  expertise: [{
    type: String,
  }],

  /**
   * meetingTypes
   *
   * array of strings
   *
   * An array that contains the way the mentor is able to meet.
   */
  meetingTypes: [{
    type: String,
  }],

  /**
   * availability
   *
   * array of strings
   *
   * An array that contains the availability for the mentor for meeting.
   */
  availability: [{
    type: String,
  }],
});

// Create a new model using the configured schema
const model = mongoose.model('Mentor', schema);

module.exports = {
  schema,
  model,
};
