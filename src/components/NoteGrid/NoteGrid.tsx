import { GridProps } from '../../utils/GridProps';
import NoteItem from '../NoteItem/NoteItem';
import './NoteGrid.css';

const NoteGrid = ({ gridView }: GridProps) => {
  const gridClass = gridView
    ? 'note-grid-items grid-view'
    : 'note-grid-items list-view';

  return (
    <div className='note-grid'>
      <div className={gridClass}>
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
      </div>
    </div>
  );
};

export default NoteGrid;
