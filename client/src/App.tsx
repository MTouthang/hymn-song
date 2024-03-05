import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lyric from './pages/Lyric';
import { Title } from './pages/Title';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/title" element={<Title />} />
      <Route path="/lyric" element={<Lyric />} />
    </Routes>
  );
}

export default App;
