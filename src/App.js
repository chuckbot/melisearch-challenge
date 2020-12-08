import './assets/styles/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import './assets/styles/Grid.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
