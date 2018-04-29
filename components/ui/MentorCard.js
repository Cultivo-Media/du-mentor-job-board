import React from 'react';
import styled from 'styled-components';

import { colors } from './variables';

import MentorCardShape from '../../shapes/MentorCard';

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
`;

const MentorCardTable = styled.div`
  padding: 16px 0;
`;

const MentorCardTableRow = styled.div`
  border-bottom: solid 1px ${colors.snow};
  display: flex;
  padding: 16px 0;
`;

const MentorCardTableRowSub = styled.div`
  color: ${colors.gray};
`;

const MentorCardTableRowHead = styled.div`
  color: ${colors.black};
`;

// Flex grow utility
const Grow = styled.div`
  flex-grow: 1;
`;

const MentorCard = ({
  mentor: {
    name, expertise, company, title, bio,
  },
}) => (
  <StyledMentorCard>
    <h3>{name}</h3>
    <span>{expertise}</span>
    <MentorCardTable>
      <MentorCardTableRow>
        <MentorCardTableRowSub>Company</MentorCardTableRowSub>
        <Grow />
        <MentorCardTableRowHead>{company}</MentorCardTableRowHead>
      </MentorCardTableRow>
      <MentorCardTableRow>
        <MentorCardTableRowSub>Title</MentorCardTableRowSub>
        <Grow />
        <MentorCardTableRowHead>{title}</MentorCardTableRowHead>
      </MentorCardTableRow>
    </MentorCardTable>
    <p>{bio}</p>
  </StyledMentorCard>
);

MentorCard.propTypes = MentorCardShape;

export default MentorCard;
