import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePageScreen from './screens/HomePageScreen';
import UserRegisterScreen from './screens/UserRegisterScreen';
import UserLoginScreen from './screens/UserLoginScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ProductCreateScreen  from './screens/ProductCreateScreen';
import CartScreen from './screens/CartScreen';
import { Container } from '@material-ui/core';

const App = () => {
  return (
    <>
      <Router>
          <Header />
        <main>
          <Container>
            <Route path='/' component={HomePageScreen} exact />
            <Route path='/products' component={ProductListScreen} exact />
            <Route path='/products/:productId' component={ProductDetailScreen} />
            <Route path='/create-a-custom' component={ProductCreateScreen} exact/>
            <Route path='/cart/:cartId?' component={CartScreen} exact/>
            <Route path='/register' component={UserRegisterScreen} exact />
            <Route path='/login' component={UserLoginScreen} exact />
          </Container>
        </main>
        {/* <Footer /> */}
        </Router>
    </>
  );
}

export default App;
