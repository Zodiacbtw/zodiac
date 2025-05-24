import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import PageContent from './layout/PageContent';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <PageContent>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </PageContent>
        <Footer />
      </div>
    </Router>
  );
}

export default App;