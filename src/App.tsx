import { useState } from 'react';
import Fab from './components/FAB/Fab';
import Navbar from './components/Navbar/Navbar';
import NoteGrid from './components/NoteGrid/NoteGrid';

function App() {
  const [gridView, setGridView] = useState<boolean>(true);

  return (
    <>
      <div className='app'>
        <Navbar gridView={gridView} />
        <NoteGrid gridView={gridView} />
        <Fab />
      </div>
    </>
  );
}

export default App;
