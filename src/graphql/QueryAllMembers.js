import gql from 'graphql-tag';

export default gql`
  query listMembers {
    listMembers {
      id
      name
      group
    }
  }
`;
