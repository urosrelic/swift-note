import { useState } from 'react';
import Fab from './components/FAB/Fab';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [gridView, setGridView] = useState<boolean>(true);

  return (
    <>
      <div className='app'>
        <Navbar gridView={gridView} setGridView={setGridView} />
        <Fab />
      </div>
    </>
  );
}

export default App;
