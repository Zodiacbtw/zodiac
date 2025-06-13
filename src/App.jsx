import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { verifyTokenOnAppLoad, fetchRolesIfNeeded, logoutUser } from './store/actions/clientActions';
import { fetchCategories } from './store/actions/categoryActions';

import Header from './layout/Header';
import Footer from './layout/Footer';
import PageContent from './layout/PageContent';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import AboutPage from './pages/AboutPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import ScrollToTop from './components/ScrollToTop';


function AppContent() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuthenticated, loading: clientLoading, roles: rolesFromStore } = useSelector(state => state.client);
  const { categories: categoriesFromStore, loading: categoriesLoading } = useSelector(state => state.category);

  useEffect(() => {
    const tokenInStorage = localStorage.getItem('authToken');
    if (tokenInStorage && !isAuthenticated && !clientLoading) {
      dispatch(verifyTokenOnAppLoad());
    } else if (!tokenInStorage && isAuthenticated) {
      dispatch(logoutUser(history));
    }
  }, [dispatch, isAuthenticated, clientLoading, history]);

  useEffect(() => {
    if ((!rolesFromStore || rolesFromStore.length === 0) && !clientLoading) {
      dispatch(fetchRolesIfNeeded());
    }
  }, [dispatch, rolesFromStore, clientLoading]);

  useEffect(() => {
    if ((!categoriesFromStore || categoriesFromStore.length === 0) && !categoriesLoading) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesFromStore, categoriesLoading]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PageContent>
        <Switch>
          <Route exact path="/"> <HomePage /> </Route>
          <Route 
            exact 
            path="/shop" 
            render={({ location }) => <ShopPage key={location.pathname} />}
          />
          <Route 
            exact 
            path="/shop/:gender/:categoryName/:categoryId" 
            render={({ location }) => <ShopPage key={location.pathname} />}
          />
          <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId">
            <ProductDetailPage />
          </Route>
          <Route exact path="/cart"> <CartPage /> </Route>
          <ProtectedRoute exact path="/order" component={OrderPage} />
          <Route exact path="/order-success" component={OrderSuccessPage} />
          <ProtectedRoute exact path="/profile" component={ProfilePage} />
          <Route exact path="/contact"> <ContactPage /> </Route>
          <Route exact path="/team"> <TeamPage /> </Route>
          <Route exact path="/about"> <AboutPage /> </Route>
          <Route exact path="/signup"> <SignUpPage /> </Route>
          <Route exact path="/login"> <LoginPage /> </Route>
        </Switch>
      </PageContent>
      <Footer />
    </div>
  );
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <AppContent />
        </Router>
    );
}

export default App;