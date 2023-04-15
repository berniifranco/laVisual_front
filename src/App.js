import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' exact={true} Component={Home} />
        <Route path='/register' exact={true} Component={Register} />
        <Route path='/login' exact={true} Component={Login} />
      </Routes>
    </div>
  );
}

export default App;
