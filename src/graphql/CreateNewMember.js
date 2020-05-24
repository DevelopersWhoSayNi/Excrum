import gql from 'graphql-tag';

export default gql`
  mutation createMembers($name: String!) {
    createMembers(name: $name) {
      __typename
      name
    }
  }
`;
