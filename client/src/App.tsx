import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lyric from './pages/Lyric';
import { Title } from './pages/Title';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="lyric/slide" element={<Lyric />} />
      <Route path="/lyric/:lyricId" element={<Title />} />
    </Routes>
  );
}

export default App;
