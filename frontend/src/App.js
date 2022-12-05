import './css/App.css';
import MainPage from './MainPage';
import { Switch, Route } from 'react-router-dom'
import AreaPage from './AreaPage';
import NotImplemented from './NotImplemented';

function App() {
    
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/area" component={AreaPage} />
      <Route exact path="/notimplemented" component={NotImplemented} />

    </Switch>      
  );
}

export default App;
