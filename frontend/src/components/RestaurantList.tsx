import React from 'react';
import { Card, CardBody, CardImg, CardTitle, Col, Row } from 'reactstrap';
import { API_URL } from 'lib/apollo';
import Link from 'next/link';

type RestaurantResponse = {
  id: number;
  attributes: {
    name: string;
    description: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

type Props = {
  restaurant: RestaurantResponse;
};

const RestaurantList = ({ restaurant }: Props) => {
  return (
    <>
      <Col xs="6" sm="4">
        <Card style={{ height: '100%' }}>
          <CardImg
            src={`${API_URL}${restaurant.attributes.image.data.attributes.url}`}
            top={true}
            style={{ height: 250 }}
          />
          <CardBody>
            <CardTitle>{restaurant.attributes.name}</CardTitle>
            <CardTitle>{restaurant.attributes.description}</CardTitle>
          </CardBody>
          <div className="card-footer">
            <Link href={`/restaurants/${restaurant.id}`}>
              <a className="btn btn-primary btn-sm">もっとみる</a>
            </Link>
          </div>
        </Card>
      </Col>
    </>
  );
};

export default RestaurantList;
