import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lyric from './pages/Lyric';
import { Title } from './pages/Title';
import LyricForm from './pages/LyricForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="lyric/slide" element={<Lyric />} />
      <Route path="/lyric/:lyricId" element={<Title />} />
      <Route path="/addlyrice@1434" element={<LyricForm />} />
    </Routes>
  );
}

export default App;
