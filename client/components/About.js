import React from 'react';
import { Row, Col } from 'react-grid-system';
import { Container, Header } from 'du-board-design-system';

import colors from './ui/variables';

import Navbar from '../components/Navbar';

export default () => (
  <div>
    <Navbar />
    <Header
      backgroundColor={colors.blue}
      title="Find a mentor for you"
      description="Connecting Students with Denver’s Brightest Minds."
    />
    <Container>
      <Row>
        <Col sm={8}>
          <h3>About</h3>
          <br />
          <p style={{ lineHeight: '1.5em', color: colors.darkGray }}>
            The X-ITE Mentors program enables students to connect and learn with X-ITE partners
            within the Colorado community and beyond. Through intimate conversations and
            learning opportunities, students are able to share ideas, receive valuable feedback, and
            grow to be a stronger innovator and student.
          </p>
        </Col>
      </Row>
    </Container>
  </div>
);
