import React, { Component } from 'react';
import GetSheetDone from 'get-sheet-done';
import { Container, Row, Col } from 'react-grid-system';
import Box from 'react-box-size';

import MentorCard from '../components/ui/MentorCard';

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
  componentWillMount() {
    // Get the google sheet
    GetSheetDone.labeledCols(documentKey).then((sheet) => {
      // Add the data to the state
      this.setState({
        data: sheet.data,
        loading: false,
        loaded: true,
      });
    });
  }

  render() {
    const { loaded, loading, data } = this.state;
    return (
      <div>
        {loading && <div>loading...</div>}
        {loaded &&
        <Container>
          <Row>
            <Col sm={3}>
              filter data
            </Col>
            <Col sm={9}>
              <Row>
                {data.map(m => (
                  <Col sm={6}>
                    <Box mb={4}>
                      <MentorCard mentor={m} />
                    </Box>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>}
      </div>
    );
  }
}
