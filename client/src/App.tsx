import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lyric from './pages/Lyric';
import { Title } from './pages/Title';
import LyricForm from './pages/LyricForm';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <ToastContainer />
    <Routes>
      <Route path="/" element={<Home />} />
        {/* TODO: add lyric prop types -  */}
      <Route path="lyric/slide" element={<Lyric />} />
      <Route path="/lyric/:lyricId" element={<Title />} />
      <Route path="/addlyrice@1434" element={<LyricForm />} />
    </Routes>
    </>
    
  );
}

export default App;
