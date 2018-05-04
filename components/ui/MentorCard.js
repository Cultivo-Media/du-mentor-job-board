import React, { Component } from 'react';
import styled from 'styled-components';
import Box from 'react-box-size';

import { colors } from './variables';

import Button from './Button';
import { Flex, Grow } from './Flex';

import MentorCardShape from '../../shapes/MentorCard';
import InformationModal from '../InformationModal';

import { MentorCardTable, MentorCardTableRow, MentorCardTableRowHead, MentorCardTableRowSub } from './CardTable';

const StyledMentorCard = styled.div`
  background-color: ${colors.white};
  border: solid 1px ${colors.snow};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .05);
  padding: 16px;
  h3 {
    color: ${colors.black};
    font-size: 20px;
    font-weight: 500;
  }
  span {
    color: ${colors.gray};
    font-size: 12px;
  }
  p {
    color: ${colors.darkGray};
    line-height: 1.5;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  a {
    color: ${colors.blue};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default class MentorCard extends Component {
  static propTypes = MentorCardShape;

  constructor(props) {
    super(props);

    this.state = {
      informationModalIsOpen: false,
    };
  }

  toggleModal = () => {
    this.setState(state => ({
      informationModalIsOpen: !state.informationModalIsOpen,
    }));
  };

  render() {
    const { mentor } = this.props;
    return (
      <div>
        {mentor && <InformationModal
          informationModalIsOpen={this.state.informationModalIsOpen}
          toggleModal={this.toggleModal}
          mentor={mentor}
        />}
        <StyledMentorCard>
          <h3>{mentor.name}</h3>
          <span>{mentor.expertise}</span>
          <MentorCardTable>
            <MentorCardTableRow>
              <MentorCardTableRowSub>Company</MentorCardTableRowSub>
              <Grow />
              <MentorCardTableRowHead>{mentor.company}</MentorCardTableRowHead>
            </MentorCardTableRow>
            <MentorCardTableRow>
              <MentorCardTableRowSub>Title</MentorCardTableRowSub>
              <Grow />
              <MentorCardTableRowHead>{mentor.title}</MentorCardTableRowHead>
            </MentorCardTableRow>
          </MentorCardTable>
          <p>{mentor.bio}</p>
          <Box mt={2}>
            <Flex>
              <Grow />
              <Box mr={2}>
                <Button onClick={this.toggleModal}>Learn More</Button>
              </Box>
              <Button active onClick={this.toggleModal}>Apply to Meet</Button>
            </Flex>
          </Box>
        </StyledMentorCard>
      </div>
    );
  }
}
