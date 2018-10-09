import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-grid-system';
import Box from 'react-box-size';
import { Container, Header, SectionHeader } from 'du-board-design-system';

import MentorCard from '../components/MentorCard';
import Navbar from '../components/Navbar';

export default class App extends Component {
  static propTypes = {
    mentors: PropTypes.array.isRequired,
    expertise: PropTypes.array.isRequired,
    loading: PropTypes.boolean,
  }

  static defaultProps = {
    loading: true,
  }

  // Configure basic data regarding the initial state
  constructor(props) {
    super(props);
    this.state = {
      selectedExpertise: [],
      mentors: this.props.mentors,
      expertiseFields: this.props.expertise,
    };
  }

  // When we filter the mentors, we pull the value from the event's target element
  updateSearch = (event) => {
    let val = event.target.value;
    if (val.length < 1) val = null;
    this.filterMentors('name', val);
  };

  // A helper function used to filter through members
  filterMentors = (prop, val) => {
    // If no value was passed for filtering, we want to completely reset the mentors that are
    // filtered
    if (!val) {
      return this.setState({
        mentors: this.props.mentors,
      });
    }
    // If we are selecting multiple sets of expertise, we need to include all of them
    let mentors;
    // If we are filtering expertise (the only time we are filtering an array), we need to handle it
    // carefully
    if (Array.isArray(val)) {
      // Filter through mentors and split their expertise strings into an array
      mentors = this.props.mentors.filter(m => val.every(e => m.expertise.includes(e)));
    } else {
      // Otherwise, we can just filter and ensure that the property includes itself
      mentors = this.props.mentors.filter(d => ['name', 'company'].some(a => d[a].toLowerCase().includes(val.toLowerCase())));
    }
    // Return with a new array of the setState data
    return this.setState({
      mentors,
    });
  };

  // Allows the user to select expertise in which they are interested in
  selectExpertise = (expertise) => {
    let selectedExpertise;
    // If the expertise already exists, we want to remove it
    if (this.state.selectedExpertise.includes(expertise)) {
      selectedExpertise = this.state.selectedExpertise.filter(s => s !== expertise);
    } else {
      // Otherwise we want to add the new expertise into the array
      selectedExpertise = [...this.state.selectedExpertise, expertise];
    }
    this.setState({
      selectedExpertise,
    });
    // Filter through the mentors as we select the new expertise
    this.filterMentors('expertise', selectedExpertise);
  };

  render() {
    const {
      mentors,
      expertiseFields,
      selectedExpertise,
    } = this.state;
    const { loading } = this.props;
    return (
      <div>
        <Navbar updateSearch={this.updateSearch} shouldShowSearchField />
        <Header
          backgroundColor="#33A0D7"
          title="Find a mentor for you"
          description="Connecting Students with Denver’s Brightest Minds."
        />
        {loading && <Container>Loading...</Container>}
        {!loading && mentors &&
        <Container>
          <Row>
            <Col sm={3}>
              <Box mb={2}>
                <SectionHeader>Expertise</SectionHeader>
              </Box>
              {expertiseFields && expertiseFields.map(e => (
                <Box mb={2} key={e}>
                  <span
                    onClick={() => this.selectExpertise(e)}
                    style={{
                      cursor: 'pointer',
                      fontWeight: selectedExpertise.includes(e) ? '700' : '400',
                      textTransform: 'capitalize',
                    }}
                  >{e}
                  </span>
                </Box>
              ))}
            </Col>
            <Col sm={9}>
              <Row>
                {mentors && mentors.map(m => (
                  <Col sm={6} key={m._id}>
                    <Box mb={4}>
                      <MentorCard mentor={m} />
                    </Box>
                  </Col>
                ))}
                {mentors.length === 0 && <p>No mentors found for the supplied search query.</p>}
              </Row>
            </Col>
          </Row>
        </Container>}
      </div>
    );
  }
}
