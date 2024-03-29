import { useState } from 'react';
import Fab from './components/FAB/Fab';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';

function App() {
  const [gridView, setGridView] = useState<boolean>(true);

  return (
    <>
      <div className='app'>
        <Navbar gridView={gridView} setGridView={setGridView} />
        <Home gridView={gridView} />
        <Fab />
      </div>
    </>
  );
}

export default App;
