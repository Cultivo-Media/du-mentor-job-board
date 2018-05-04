import styled from 'styled-components';
import { colors } from './variables';

export const MentorCardTable = styled.div`
  padding: 16px 0;
`;

export const MentorCardTableRow = styled.div`
  display: flex;
  padding: 16px 0;
  &:not(:last-child) {
    border-bottom: solid 1px ${colors.snow};
  }
`;

export const MentorCardTableRowSub = styled.div`
  color: ${colors.gray};
`;

export const MentorCardTableRowHead = styled.div`
  color: ${colors.black};
`;
