import React from 'react';
import { Container, Navbar, Flex, Grow } from 'du-board-design-system';
import { Row, Col } from 'react-grid-system';
import Link from 'next/link';

import NavbarShape from '../shapes/Navbar';

/**
 * Navbar
 *
 * component
 *
 * A navbar that displays to the user on all pages.
 *
 * @param {function} updateSearch - A request to use as the text inside of the search field changes
 * @param {boolean} shouldShowSearchField - A boolean that determines whether or not to show the
 *  search.
 *
 * @constructor
 */
const NavbarContainer = ({ updateSearch, shouldShowSearchField }) => (
  <Container>
    <Navbar>
      <Row align="center">
        <Col sm={3}>
          <Link href="/">
            <a href="/">
              <Flex center>
                <img src="/static/logo.png" alt="project x-ite logo" />
                &nbsp;&nbsp;
                <h4>mentor</h4>
              </Flex>
            </a>
          </Link>
        </Col>
        {shouldShowSearchField &&
        <Col sm={3}>
          <input placeholder="Search for a mentor" onChange={updateSearch} />
        </Col>}
        <Col sm={shouldShowSearchField ? 6 : 9}>
          <Flex>
            <Grow />
            <Link href="/about">
              <a href="/about">About</a>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a
              href="https://projectxite.typeform.com/to/JrQOzl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply to be a mentor
            </a>
          </Flex>
        </Col>
      </Row>
    </Navbar>
  </Container>
);

NavbarContainer.propTypes = NavbarShape;

NavbarContainer.defaultProps = {
  updateSearch: () => null,
  shouldShowSearchField: false,
};

export default NavbarContainer;
