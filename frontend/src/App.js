import './css/App.css';
import MainPage from './MainPage';
import {Switch, Route, Router} from 'react-router-dom'
import AreaPage from './AreaPage';
import AverageAgePage from "./AverageAgePage";
import NotImplemented from './NotImplemented';

function App() {
    
  return (
    <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/area" component={AreaPage} />
        <Route exact path="/averageAge" component = {AverageAgePage} />
        <Route exact path="/notImplemented" component={NotImplemented} />
    </Switch>      
  );
}

export default App;
