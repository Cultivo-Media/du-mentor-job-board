import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMentors, fetchMentorExpertise } from '../redux/actions/mentor';

import AppComponent from '../components/App';

class App extends Component {
  static propTypes = {
    mentor: PropTypes.object.isRequired,
    fetchMentors: PropTypes.func.isRequired,
    fetchMentorExpertise: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.props.fetchMentors();
    this.props.fetchMentorExpertise();
  }

  render = () => (
    <AppComponent
      mentors={this.props.mentor.mentors}
      expertise={this.props.mentor.expertise}
      loading={this.props.mentor.loading}
    />
  )
}

const mapStateToProps = ({ mentor }) => ({
  mentor,
});

const mapDispatchToProps = {
  fetchMentors,
  fetchMentorExpertise,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
