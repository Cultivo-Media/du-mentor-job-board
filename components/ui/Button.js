import styled from 'styled-components';
import { colors } from './variables';

export default styled.button`
  background-color: ${props => props.active ? colors.blue : 'transparent'};
  border: none;
  border-radius: 4px;
  color: ${props => props.active ? colors.white : colors.gray};
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  padding: 8px;
`;
