import styled from 'styled-components';

// Flex grow utility
export const Grow = styled.div`
  flex-grow: 1;
`;

// Flex utility
export const Flex = styled.div`
  display: flex;
  align-items: ${props => props.center ? 'center' : 'flex-start'};
`;
