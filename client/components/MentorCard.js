import React, { Component } from 'react';
import styled from 'styled-components';
import Box from 'react-box-size';

import { Button,
  Flex,
  Grow,
  CardTable,
  CardTableRow,
  CardTableRowHead,
  CardTableRowSub,
  colors,
} from 'du-board-design-system';

import MentorCardShape from '../shapes/MentorCard';
import InformationModal from './InformationModal';

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
          <p>
            {mentor.expertise.map((expertise, index, arr) =>
              <span style={{ textTransform: 'capitalize' }} key={index}>{expertise}{index !== (arr.length - 1) && <span>, </span>}</span>)
            }
          </p>
          <CardTable>
            <CardTableRow>
              <CardTableRowSub>Company</CardTableRowSub>
              <Grow />
              <CardTableRowHead>{mentor.company}</CardTableRowHead>
            </CardTableRow>
            <CardTableRow>
              <CardTableRowSub>Title</CardTableRowSub>
              <Grow />
              <CardTableRowHead>{mentor.title}</CardTableRowHead>
            </CardTableRow>
          </CardTable>
          <p>{mentor.bio}</p>
          <Box mt={2}>
            <Flex>
              <Grow />
              <Box mr={2}>
                <Button onClick={this.toggleModal}>Learn More</Button>
              </Box>
              <a
                style={{ color: '#fff', textDecoration: 'none' }}
                href="https://projectxite.typeform.com/to/mrMaQ5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button primary>
                  Apply To Meet
                </Button>
              </a>
            </Flex>
          </Box>
        </StyledMentorCard>
      </div>
    );
  }
}
