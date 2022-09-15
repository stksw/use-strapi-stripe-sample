import { useQuery } from '@apollo/client';
import { getRestaurantDishes } from 'api/getRestaurantDishes';
import CartContainer from 'containers/CartContainer';
import CartContext from 'context/CartContext';
import { API_URL } from 'lib/apollo';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';

const RestaurantDetailPage: NextPage = () => {
  const router = useRouter();
  const { data, error, loading } = useQuery(getRestaurantDishes, {
    variables: { id: router.query.id },
  });
  const { cartItems, addToCart } = useContext(CartContext);

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ marginTop: 30 }}>
      <Row className="card-columns">
        {data.restaurant.data.attributes.dishes.data.map(
          (dish: any, idx: number) => (
            <Col xs="6" sm="4" key={idx}>
              <Card style={{ height: '100%' }}>
                <CardImg
                  src={`${API_URL}${dish.attributes.image.data.attributes.url}`}
                  top={true}
                  style={{ height: 250 }}
                />
                <CardBody>
                  <CardTitle>{dish.attributes.name}</CardTitle>
                  <CardTitle>¥ {dish.attributes.price}</CardTitle>
                </CardBody>
                <div className="card-footer">
                  <Button
                    outline
                    color="primary"
                    onClick={() =>
                      addToCart({
                        id: dish.id,
                        name: dish.attributes.name,
                        price: dish.attributes.price,
                      })
                    }
                  >
                    カートに入れる
                  </Button>
                </div>
              </Card>
            </Col>
          )
        )}
        <style jsx>{`
          .card-columns {
            display: flex;
            column-count: 3;
          }
        `}</style>

        <Col xs={6} sm={4}>
          <div>
            <CartContainer />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RestaurantDetailPage;
