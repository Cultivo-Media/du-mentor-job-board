import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-grid-system';
import Box from 'react-box-size';

import Navbar from '../components/Navbar';
import MentorCard from '../components/ui/MentorCard';
import Header from '../components/Header';
import { SectionHeader } from '../components/InformationModal';

export default class App extends Component {
  // Configure basic data regarding the initial state
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loaded: false,
      selectedExpertise: [],
    };
  }

  // Load google sheet data
  componentDidMount() {
    // Get the data from the API using two requests
    axios.all([
      axios.get('http://localhost:4003/mentors'),
      axios.get('http://localhost:4003/mentors/expertise'),
    ]).then(axios.spread((mentors, expertiseFields) => {
      this.setState({
        data: mentors,
        expertiseFields,
        mentors,
        loading: false,
        loaded: true,
      });
    }));
  }

  // When we filter the mentors, we pull the value from the event's target element
  updateSearch = (event) => {
    let val = event.target.value;
    if (val.length < 1) val = null;
    this.filterMentors('name', val);
  };

  // A helper function used to filter through members
  filterMentors = (prop, val) => {
    // If no value was passed for filtering, we want to completely reset the mentors that are filtered
    if (!val) {
      return this.setState(state => ({
        mentors: state.data,
      }));
    }
    // If we are selecting multiple sets of expertise, we need to include all of them
    let mentors;
    // If we are filtering expertise (the only time we are filtering an array), we need to handle it carefully
    if (Array.isArray(val)) {
      // Filter through mentors and split their expertise strings into an array
      mentors = this.state.data.filter(m => val.every(e => m.expertise.includes(e)));
    } else {
      // Otherwise, we can just filter and ensure that the property includes itself
      mentors = this.state.data.filter(d => ['name', 'company'].some(a => d[a].toLowerCase().includes(val.toLowerCase())));
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
      loaded,
      loading,
      mentors,
      expertiseFields,
      selectedExpertise,
    } = this.state;
    return (
      <div>
        <Navbar updateSearch={this.updateSearch} shouldShowSearchField />
        <Header
          title="Find a mentor for you"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at lorem auctor enim elementum tempor."
        />
        {loading && <Container>Loading...</Container>}
        {loaded &&
        <Container>
          <Row>
            <Col sm={3}>
              <Box mb={2}>
                <SectionHeader>Expertise</SectionHeader>
              </Box>
              {expertiseFields && expertiseFields.map(e => (
                <Box mb={2}>
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
                {mentors && mentors.length > 0 && mentors.map(m => (
                  <Col sm={6}>
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
