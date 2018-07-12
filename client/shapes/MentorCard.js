import { shape, string } from 'prop-types';

const MentorCardShape = {
  mentor: shape({
    name: string,
    expertise: string,
    company: string,
    title: string,
    bio: string,
  }),
};

export default MentorCardShape;
