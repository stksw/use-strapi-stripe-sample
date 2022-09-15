import CartContext from 'context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Badge, Button, Card, CardBody, CardTitle } from 'reactstrap';

const CartContainer = () => {
  const { cartItems, total, addToCart, removeFromCart } =
    useContext(CartContext);
  const router = useRouter();

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle style={{ fontSize: 21 }}>注文一覧</CardTitle>
          <hr />
          <div>
            {cartItems.length > 0 ? (
              cartItems.map((cartItem, index) => (
                <div className="items-one" key={index}>
                  <div style={{ display: 'flex' }}>
                    <span className="item-price">¥ {cartItem.price}</span>
                    <span className="item-name" style={{ paddingLeft: 10 }}>
                      {cartItem.name}
                    </span>
                    <span className="item-quantity" style={{ paddingLeft: 10 }}>
                      {cartItem.quantity} 個
                    </span>
                    {router.asPath !== '/checkout' && (
                      <>
                        <Button
                          style={{
                            height: 25,
                            width: 15,
                            padding: 0,
                            margin: '0 10px',
                            textDecoration: 'none',
                          }}
                          color="link"
                          onClick={() =>
                            addToCart({
                              id: cartItem.id,
                              name: cartItem.name,
                              price: cartItem.price,
                            })
                          }
                        >
                          ＋
                        </Button>
                        <Button
                          style={{
                            height: 25,
                            width: 15,
                            padding: 0,
                            margin: '0 10px',
                            textDecoration: 'none',
                          }}
                          color="link"
                          onClick={() => removeFromCart(cartItem.id)}
                        >
                          ー
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <>カートに商品は入っていません。</>
            )}

            <div>
              <Badge
                color="light"
                style={{ width: 200, padding: 10, color: '#555' }}
              >
                <h6>合計</h6>
                <h6>¥ {total}</h6>
              </Badge>
              <div>
                <Link href="/checkout" passHref>
                  <a>
                    <Button style={{ width: '100%' }} color="primary">
                      注文する
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CartContainer;
