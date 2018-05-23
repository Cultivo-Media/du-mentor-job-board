import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

export default () => (
  <div>
    <Navbar isOnAboutPage />
    <Header
      title="About"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at lorem auctor enim elementum tempor."
    />
    <Container>
      <Row>
        <Col sm={8}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cumque deserunt dolor doloremque explicabo,
            maiores, nihil nisi, reiciendis sit suscipit ullam veniam veritatis. Atque, earum recusandae repellendus saepe
            sit tempora!</p>
        </Col>
        <Col sm={4}>
          <h4>Sponsors</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolore eligendi, eos inventore nobis quas
            quisquam recusandae. Ab, cumque deserunt distinctio doloremque eius expedita minus obcaecati perferendis
            repellendus reprehenderit totam.</p>
        </Col>
      </Row>
    </Container>
  </div>
);
