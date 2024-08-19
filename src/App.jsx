import './App.css'
import { Route, Routes } from 'react-router-dom';
import Posts from './components/Posts';

function App() {
  return (
    <Routes>
       <Route path="/" element={<Posts />} />
    </Routes>
  );
}

export default App;
