import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRolesIfNeeded, verifyTokenOnAppLoad } from './store/actions/clientActions';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
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

function AppContent() {
  const dispatch = useDispatch();
  const rolesFromStore = useSelector(state => state.client.roles);
  const userIsAuthenticated = useSelector(state => state.client.isAuthenticated);
  const tokenIsBeingVerified = useSelector(state => state.client.isVerifyingToken);

  useEffect(() => {
    const tokenInStorage = localStorage.getItem('authToken');
    if (tokenInStorage && !userIsAuthenticated && !tokenIsBeingVerified) {
      dispatch(verifyTokenOnAppLoad());
    } else if (!tokenInStorage && userIsAuthenticated) {
    }
  }, [dispatch, userIsAuthenticated, tokenIsBeingVerified]);

  useEffect(() => {
    if (!rolesFromStore || rolesFromStore.length === 0) {
      dispatch(fetchRolesIfNeeded());
    }
  }, [dispatch, rolesFromStore]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PageContent>
        <Switch>
          <Route exact path="/"> <HomePage /> </Route>
          <Route exact path="/shop"> <ShopPage /> </Route>
          <Route path="/product/:productId"> <ProductDetailPage /> </Route>
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
            <AppContent />
        </Router>
    )
}

export default App;