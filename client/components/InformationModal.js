import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Box from 'react-box-size';
import { Col, Row } from 'react-grid-system';
import { Button,
  Flex,
  Grow,
  colors,
  CardTable,
  CardTableRow,
  CardTableRowHead,
  CardTableRowSub,
  DefaultLabel,
  SectionHeader,
  MappedCheckbox,
} from 'du-board-design-system';

import InformationModalShape from '../shapes/InformationModal';

// Configure styles that show for the entire modal
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,.5)';

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
  hr {
    background-color: ${colors.snow};
    border: none;
    height: 1px;
    width: 100%;
  }
`;

// Basic styles object defining styles for the information modal
const customStyles = {
  content: {
    backgroundColor: colors.white,
    border: 'none',
    boxShadow: '0 10px 50px rgba(0,0,0,.1)',
    margin: '0 auto',
    maxWidth: 640,
    width: '90%',
  },
};

/**
 * InformationModal
 *
 * component
 *
 * A modal that displays when the user requests to see more information about a mentor.
 *
 * @param {boolean} informationModalIsOpen - A boolean that determines if the modal is open
 * @param {object} mentor - An object that is then used and rendered inside.
 * @param {function} toggleModal - Toggle the modal to be open/closed.
 *
 * @constructor
 */
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
                    <MappedCheckbox active={mentor.characteristics.includes('alumni')} />
                    <DefaultLabel>Alumni</DefaultLabel>
                  </Flex>
                </Box>
              </Col>
              <Col xs={6}>
                <Box mb={2}>
                  <Flex center>
                    <MappedCheckbox active={mentor.characteristics.includes('staff')} />
                    <DefaultLabel>Staff</DefaultLabel>
                  </Flex>
                </Box>
              </Col>
              <Col xs={6}>
                <Box mb={2}>
                  <Flex center>
                    <MappedCheckbox active={mentor.characteristics.includes('faculty')} />
                    <DefaultLabel>Faculty</DefaultLabel>
                  </Flex>
                </Box>
              </Col>
              <Col xs={6}>
                <Box mb={2}>
                  <Flex center>
                    <MappedCheckbox active={mentor.characteristics.includes('parent')} />
                    <DefaultLabel>Parent</DefaultLabel>
                  </Flex>
                </Box>
              </Col>
              <Col xs={6}>
                <Box mb={2}>
                  <Flex center>
                    <MappedCheckbox active={mentor.characteristics.includes('donor')} />
                    <DefaultLabel>Donor</DefaultLabel>
                  </Flex>
                </Box>
              </Col>
              <Col xs={6}>
                <Box mb={2}>
                  <Flex center>
                    <MappedCheckbox active={mentor.characteristics.includes('communityMember')} />
                    <DefaultLabel>Community</DefaultLabel>
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
                <MappedCheckbox active={mentor.availability.includes('earlyMorning')} />
                <DefaultLabel>Early Morning (8 AM - 10 AM)</DefaultLabel>
              </Flex>
            </Box>
            <Box mb={2}>
              <Flex center>
                <MappedCheckbox active={mentor.availability.includes('lateMorning')} />
                <DefaultLabel>Late Morning (10 AM - 12 PM)</DefaultLabel>
              </Flex>
            </Box>
            <Box mb={2}>
              <Flex center>
                <MappedCheckbox active={mentor.availability.includes('earlyAfternoon')} />
                <DefaultLabel>Early Afternoon (12 PM - 3 PM)</DefaultLabel>
              </Flex>
            </Box>
            <Box mb={2}>
              <Flex center>
                <MappedCheckbox active={mentor.availability.includes('lateAfternoon')} />
                <DefaultLabel>Late Afternoon (3 PM - 5 PM)</DefaultLabel>
              </Flex>
            </Box>
            <Box mb={2}>
              <Flex center>
                <MappedCheckbox active={mentor.availability.includes('evening')} />
                <DefaultLabel>Evening (5 PM - 8 PM)</DefaultLabel>
              </Flex>
            </Box>
          </Col>
        </Row>
        <Box mt={3} mb={3}>
          <hr />
        </Box>
        <Flex center>
          <p>You will be redirected to Typeform.</p>
          <Grow />
          <Button primary>Apply to Meet</Button>
        </Flex>
      </Box>
    </StyledInformationModal>
  </Modal>
);

InformationModal.propTypes = InformationModalShape;

export default InformationModal;
