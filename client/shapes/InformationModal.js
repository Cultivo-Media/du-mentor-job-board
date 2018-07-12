import { bool, func, object } from 'prop-types';

const InformationModalShape = {
  informationModalIsOpen: bool,
  toggleModal: func,
  mentor: object,
};

export default InformationModalShape;
