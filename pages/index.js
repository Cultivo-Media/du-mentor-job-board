import React, { Component } from 'react';
import GetSheetDone from 'get-sheet-done';
import { Container, Row, Col } from 'react-grid-system';
import Box from 'react-box-size';

import Navbar from '../components/Navbar';
import MentorCard from '../components/ui/MentorCard';
import Header from '../components/Header';
import { SectionHeader } from '../components/InformationModal';

const documentKey = '1WmIypVMhgUaiwjWtgGXt58eNMtLffWr1xZslRErsGJ0';

export default class App extends Component {
  // Configure basic data regarding the initial state
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loaded: false,
    };
  }

  // Load google sheet data
  componentDidMount() {
    // Get the google sheet
    GetSheetDone.labeledCols(documentKey).then((sheet) => {
      // Add the data to the state
      const arrayOfExpertise = sheet.data.map(d => d.expertise.split(','));
      const flattenedArray = [].concat.apply([], arrayOfExpertise)
        .map(item => item.trim())
        .map(item => typeof item === 'string' ? item.toLowerCase() : item);
      const filteredExpertise = Array.from(new Set(flattenedArray));
      this.setState({
        data: sheet.data,
        expertiseFields: filteredExpertise,
        mentors: sheet.data,
        loading: false,
        loaded: true,
      });
    });
  }

  updateSearch = (event) => {
    let val = event.target.value;
    if (val.length < 1) val = null;
    this.filterMentors('name', val);
  };

  filterMentors = (prop, val) => {
    if (!val) {
      return this.setState(state => ({
        mentors: state.data,
      }));
    }
    return this.setState(state => ({
      mentors: state.data.filter(d => d[prop].toLowerCase().includes(val.toLowerCase())),
    }));
  };

  // Allows the user to select expertise in which they are interested in
  selectExpertise = (expertise) => {
    this.setState({
      selectedExpertise: expertise,
    });
    this.filterMentors('expertise', expertise);
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
        <Navbar updateSearch={this.updateSearch} />
        <Header
          title="Find a mentor for you"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at lorem auctor enim elementum tempor."
        />
        {loading && <div>loading...</div>}
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
                      cusor: 'pointer',
                      fontWeight: selectedExpertise === e ? '700' : '400',
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
