import { gql } from 'apollo-boost';

export const getRestaurants = gql`
  query {
    restaurants {
      data {
        id
        attributes {
          name
          address
          description
          image {
            data {
              attributes {
                url
                formats
              }
            }
          }
        }
      }
    }
  }
`;
