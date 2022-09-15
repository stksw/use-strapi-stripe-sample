import { gql } from 'apollo-boost';

export const getRestaurantDishes = gql`
  query ($id: ID) {
    restaurant(id: $id) {
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
          dishes {
            data {
              id
              attributes {
                name
                price
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
      }
    }
  }
`;
