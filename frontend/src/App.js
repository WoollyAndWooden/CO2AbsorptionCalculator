import './css/App.css';
import MainPage from './MainPage';
import {Switch, Route, Router} from 'react-router-dom'
import AreaPage from './AreaPage';
import AverageAgePage from "./AverageAgePage";
import NotImplemented from './NotImplemented';
import HabitatPage from './HabitatPage';
import DegreePage from './DegreePage';
import CheckPage from './CheckPage';
import SoilMoisturePage from './SoilMoisturePage';
import WaterReservoirPage from './WaterReservoirPage';
import MaslPage from './MaslPage';
import GrowingSeasonPage from './GrowingSeasonPage';

function App() {
    
  return (
    <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/area" component={AreaPage} />
        <Route exact path="/averageAge" component = {AverageAgePage} />
        <Route exact path="/habitat" component = {HabitatPage} />
        <Route exact path="/degree" component = {DegreePage} />
        <Route exact path="/soil" component = {SoilMoisturePage} />
        <Route exact path="/reservoir" component = {WaterReservoirPage} />
        <Route exact path="/masl" component = {MaslPage} />
        <Route exact path="/season" component = {GrowingSeasonPage} />
        <Route exact path="/check" component = {CheckPage} />
        <Route exact path="/notImplemented" component={NotImplemented} />
        
    </Switch>      
  );
}

export default App;
