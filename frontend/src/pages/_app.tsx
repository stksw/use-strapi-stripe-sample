import React, { Suspense } from 'react';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from 'components/Layout';
import withApollo from 'lib/apollo';
import { NextPage } from 'next';
import { AuthContextProvider } from 'context/AuthContext';
import { CartContextProvider } from 'context/CartContext';

const MyApp: NextPage<any> = ({ Component, pageProps }: AppProps) => {
  return (
    <Suspense fallback={<>Loading</>}>
      <AuthContextProvider>
        <CartContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartContextProvider>
      </AuthContextProvider>
    </Suspense>
  );
};

export default withApollo({ ssr: false })(MyApp);
