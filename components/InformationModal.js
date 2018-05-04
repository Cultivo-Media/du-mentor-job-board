import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Box from 'react-box-size';
import { Col, Row } from 'react-grid-system';

import InformationModalShape from '../shapes/InformationModal';
import { MentorCardTable, MentorCardTableRow, MentorCardTableRowHead, MentorCardTableRowSub } from './ui/CardTable';
import { Flex, Grow } from './ui/Flex';
import { colors } from './ui/variables';

// Basic styling configuring all of the content in the information modal
const StyledInformationModal = styled.div`
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
  }
`;

// Section header that defines content
const SectionHeader = styled.h5`
  color: ${colors.gray};
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

// Styles defining how a checkbox looks
const StyledCheckbox = styled.div`
  align-items: center;
  background-color: ${props => props.active ? colors.blue : colors.gray};
  border-radius: 12px;
  color: ${colors.white};
  display: flex;
  font-size: 12px;
  height: 24px;
  justify-content: center;
  width: 24px;
`;

// Style defining how each property for a mentor looks
const MentorInfo = styled.span`
  color: ${colors.darkGray} !important;
  font-size: 16px !important;
  margin-left: 8px;
`;

// Basic styles object defining styles for the information modal
const customStyles = {
  content: {
    backgroundColor: colors.white,
    margin: '0 auto',
    maxWidth: 640,
    width: '90%',
  },
};

/**
 * MappedCheckbox
 *
 * Quickly allows a property to be mapped to a circular checkbox with the content filled or not
 *
 * @param property
 */
const MappedCheckbox = ({ property }) => (
  <StyledCheckbox active={property && property.toLowerCase().indexOf('x') > -1}>
    {property && property.toLowerCase().indexOf('x') > -1 && <i className="fa fa-check" />}
  </StyledCheckbox>
);

const InformationModal = ({ informationModalIsOpen, mentor, toggleModal }) => (
  <Modal
    isOpen={informationModalIsOpen}
    onRequestClose={toggleModal}
    style={customStyles}
  >
    <StyledInformationModal>
      <h3>{mentor.name}</h3>
      <span>{mentor.expertise}</span>
      <Box mt={3} mb={3}>
        <p>{mentor.bio}</p>
      </Box>
      <SectionHeader>company information</SectionHeader>
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
      <Box mt={1}>
        <Row>
          <Col md={6}>
            <Box mb={2}>
              <SectionHeader>du affiliation</SectionHeader>
            </Box>
            <Row>
              <Col xs={6}>
                <Box mb={2}>
                  <Flex center>
                    <MappedCheckbox property={mentor.alumni} />
                    <MentorInfo>Alumni</MentorInfo>
                  </Flex>
                </Box>
              </Col>
              <Col xs={6}>
                <Box mb={2}>
                  <Flex center>
                    <MappedCheckbox property={mentor.staff} />
                    <MentorInfo>Staff</MentorInfo>
                  </Flex>
                </Box>
              </Col>
              <Col xs={6}>
                <Box mb={2}>
                  <Flex center>
                    <MappedCheckbox property={mentor.faculty} />
                    <MentorInfo>Faculty</MentorInfo>
                  </Flex>
                </Box>
              </Col>
              <Col xs={6}>
                <Box mb={2}>
                  <Flex center>
                    <MappedCheckbox property={mentor.parent} />
                    <MentorInfo>Parent</MentorInfo>
                  </Flex>
                </Box>
              </Col>
              <Col xs={6}>
                <Box mb={2}>
                  <Flex center>
                    <MappedCheckbox property={mentor.donor} />
                    <MentorInfo>Donor</MentorInfo>
                  </Flex>
                </Box>
              </Col>
              <Col xs={6}>
                <Box mb={2}>
                  <Flex center>
                    <MappedCheckbox property={mentor.communityMember} />
                    <MentorInfo>Community</MentorInfo>
                  </Flex>
                </Box>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Box mb={2}>
              <SectionHeader>availability</SectionHeader>
            </Box>
            <Box mb={2}>
              <Flex center>
                <MappedCheckbox property={mentor.earlymorning} />
                <MentorInfo>Early Morning (8 AM - 10 AM)</MentorInfo>
              </Flex>
            </Box>
            <Box mb={2}>
              <Flex center>
                <MappedCheckbox property={mentor.latemorning} />
                <MentorInfo>Late Morning (10 AM - 12 PM)</MentorInfo>
              </Flex>
            </Box>
            <Box mb={2}>
              <Flex center>
                <MappedCheckbox property={mentor.earlyafternoon} />
                <MentorInfo>Early Afternoon (12 PM - 3 PM)</MentorInfo>
              </Flex>
            </Box>
            <Box mb={2}>
              <Flex center>
                <MappedCheckbox property={mentor.lateafternoon} />
                <MentorInfo>Late Afternoon (3 PM - 5 PM)</MentorInfo>
              </Flex>
            </Box>
            <Box mb={2}>
              <Flex center>
                <MappedCheckbox property={mentor.evening} />
                <MentorInfo>Evening (5 PM - 8 PM)</MentorInfo>
              </Flex>
            </Box>
          </Col>
        </Row>
      </Box>
    </StyledInformationModal>
  </Modal>
);

InformationModal.propTypes = InformationModalShape;

export default InformationModal;
