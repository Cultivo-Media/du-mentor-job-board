import React from 'react';
import Box from 'react-box-size';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-grid-system';
import Link from 'next/link';

import NavbarShape from '../shapes/Navbar';

import { colors } from './ui/variables';
import { Flex, Grow } from './ui/Flex';

const StyledNavbar = styled.div`
  padding: 40px 0;
  h4 {
    color: ${colors.black};
    font-size: 20px;
    font-weight: bold;
  }
  input {
    background-color: ${colors.snow};
    border: none;
    border-radius: 4px;
    color: ${colors.black};
    font-size: 16px;
    padding: 8px;
    width: calc(100% - 16px);
    &:focus {
      outline: none;
    }
  }
  a {
    color: ${colors.gray};
    text-decoration: none;
    &:hover {
      color: ${colors.black};
    }
  }
`;

const Navbar = ({ updateSearch }) => (
  <Container>
    <StyledNavbar>
      <Row align="center">
        <Col sm={3}>
          <h4>mentor</h4>
        </Col>
        <Col sm={3}>
          <input placeholder="Search for a mentor" onChange={updateSearch} />
        </Col>
        <Grow />
        <Col>
          <Flex>
            <Box mr={2}>
              <Link href="/about">About</Link>
            </Box>
            <Link href="/apply" dark>Apply to be a mentor</Link>
          </Flex>
        </Col>
      </Row>
    </StyledNavbar>
  </Container>
);

Navbar.propTypes = NavbarShape;

export default Navbar;
