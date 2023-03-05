import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Home } from './Pages/Home';
import { Add } from './Pages/Add';
import { Edit } from './Components/Edit';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Add' element={<Add />} />
          <Route path='/Edit/:ids' element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
