import CartContainer from 'containers/CartContainer';
import CheckoutFormContainer from 'containers/CheckoutFormContainer';
import { Col, Row } from 'reactstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { NextPage } from 'next';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AuthContext from 'context/AuthContext';
import CartContext from 'context/CartContext';
import { useFirstRender } from 'utils/useFirstRender';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_API_KEY || 'dummy'
);

type StripeElementAppearance = {
  theme: 'stripe' | 'flat' | 'night' | 'none' | undefined;
};

const CheckoutPage: NextPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { token } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) return;

    // strictModeを使う場合は2回実行されるための対策
    if (firstRender.current) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cartItems }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
    return () => {
      firstRender.current = false;
    };
  }, []);

  const options = {
    clientSecret: clientSecret,
    appearance: {
      theme: 'stripe',
    } as StripeElementAppearance,
  };

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 4, order: 1 }}>
        <h2 style={{ fontSize: 22 }}>チェックアウト</h2>
        <CartContainer />
      </Col>
      <Col sm={{ size: 6, order: 2, offset: 1 }}>
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutFormContainer clientSecret={clientSecret} />
          </Elements>
        )}
      </Col>
    </Row>
  );
};

export default CheckoutPage;
