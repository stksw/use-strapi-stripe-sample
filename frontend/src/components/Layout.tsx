import React, { Suspense, useContext } from 'react';
import Link from 'next/link';
import { Container, Nav, NavItem } from 'reactstrap';
import AuthContext from 'context/AuthContext';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { token, signout } = useContext(AuthContext);

  return (
    <>
      <header style={{ marginBottom: 30 }}>
        <Nav
          className="navbar navbar-dark bg-dark"
          style={{ padding: '5px 20px' }}
        >
          <NavItem>
            <Link href="/">
              <a className="navbar-brand">ホーム</a>
            </Link>
          </NavItem>
          {!!token ? (
            <>
              <NavItem>
                <Link href="/" passHref>
                  <a className="nav-link" onClick={signout}>
                    ログアウト
                  </a>
                </Link>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem style={{ marginLeft: 'auto' }}>
                <Link href="/login" passHref>
                  <a className="nav-link">ログイン</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/register">
                  <a className="nav-link">新規登録</a>
                </Link>
              </NavItem>
            </>
          )}
        </Nav>
        <style jsx>
          {`
            a {
              color: white;
            }
          `}
        </style>
      </header>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
