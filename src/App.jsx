import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRolesIfNeeded, checkUserToken, logoutUser } from './store/actions/clientActions';
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

function App() {
  const dispatch = useDispatch();
  const rolesFromStore = useSelector(state => state.client.roles);
  const user = useSelector(state => state.client.user);

  useEffect(() => {
    dispatch(checkUserToken());
  }, [dispatch]);

  useEffect(() => {
    if (!rolesFromStore || rolesFromStore.length === 0) {
      dispatch(fetchRolesIfNeeded());
    }
  }, [dispatch, rolesFromStore]);

  return (
    <Router>
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
    </Router>
  );
}

export default App;