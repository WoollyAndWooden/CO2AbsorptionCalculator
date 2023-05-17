import './css/App.css';
import MainPage from './components/MainPage';
import {Switch, Route, Router} from 'react-router-dom'
import AreaPage from './components/AreaPage';
import AverageAgePage from "./components/AverageAgePage";
import NotImplemented from './components/NotImplemented';
import HabitatPage from './components/HabitatPage';
import DegreePage from './components/DegreePage';
import SoilMoisturePage from './components/SoilMoisturePage';
import WaterReservoirPage from './components/WaterReservoirPage';
import MaslPage from './components/MaslPage';
import GrowingSeasonPage from './components/GrowingSeasonPage';
import GroundTypePage from './components/GroundTypePage';
import HowManyTreesPage from './components/HowManyTreesPage';
import DominantSpeciesPage from './components/DominantSpeciesPage';
import PercentagesPage from './components/PercentagesPage';
import CheckPageMature from './components/CheckPageMature';
import CheckPageYoung from './components/CheckPageYoung';


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
        <Route exact path="/check-mature" component = {CheckPageMature} />
        <Route exact path="/check-young" component = {CheckPageYoung} />
        <Route exact path="/groundtype" component = {GroundTypePage} />
        <Route exact path="/howmanytrees" component = {HowManyTreesPage} />
        <Route exact path="/dominant" component = {DominantSpeciesPage} />
        <Route exact path="/percentages" component = {PercentagesPage} />
        <Route exact path="/notImplemented" component={NotImplemented} />  
    </Switch>      
  );
}

export default App;
