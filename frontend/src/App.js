import './css/App.css';
import MainSite from './MainSite';
import { Switch, Route } from 'react-router-dom'
import AreaSite from './AreaSite';
import NotImplemented from './NotImplemented';

function App() {
    
  return (
    <Switch>
      <Route exact path="/" component={MainSite} />
      <Route exact path="/area" component={AreaSite} />
      <Route exact path="/notimplemented" component={NotImplemented} />

    </Switch>      
  );
}

export default App;
