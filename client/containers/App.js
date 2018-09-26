import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMentors, fetchMentorExpertise } from '../redux/actions/mentor';

import AppComponent from '../components/App';

class App extends Component {
  static propTypes = {
    mentors: PropTypes.array,
    expertise: PropTypes.array,
    loading: PropTypes.bool,
    fetchMentors: PropTypes.func.isRequired,
    fetchMentorExpertise: PropTypes.func.isRequired,
  }

  static defaultProps = {
    loading: false,
  }

  componentDidMount = () => {
    this.props.fetchMentors();
    this.props.fetchMentorExpertise();
  }

  render = () => {
    const { mentors, expertise, loading } = this.props;
    if (mentors.length > 0 && expertise.length > 0) {
      return (
        <AppComponent
          mentors={mentors}
          expertise={expertise}
          loading={loading}
        />
      );
    }

    return <p>Loading...</p>;
  }
}

const mapStateToProps = ({ mentor: { mentors, expertise, loading } }) => ({
  mentors,
  expertise,
  loading,
});

const mapDispatchToProps = {
  fetchMentors,
  fetchMentorExpertise,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
