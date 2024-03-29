import { GridProps } from '../../utils/GridProps';
import Note from './Note';
import './Notes.css';

const Notes = ({ gridView }: GridProps) => {
  const exampleNotes = [
    {
      title: 'Note #1',
      date: '3-29-2024',
      details:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consectetur quisquam fuga suscipit, incidunt obcaecati a quam quos cum, dolores, sapiente architecto iure similique expedita quasi assumenda repellendus nemo?',
    },
    {
      title: 'Note #2',
      date: '3-30-2024',
      details:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consectetur quisquam fuga suscipit, incidunt obcaecati a quam quos cum, dolores',
    },
    {
      title: 'Note #3',
      date: '3-31-2024',
      details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      title: '',
      date: '3-31-2024',
      details: '',
    },
    {
      title: '',
      date: '3-31-2024',
      details:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consectetur',
    },
    {
      title: '',
      date: '3-31-2024',
      details:
        'Lorem ipsusicing elit. onsectetur Loremit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consecteturLorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quis consectetur',
    },
  ];

  const notesClassName = gridView ? 'grid-view' : 'list-view';

  return (
    <div className={`notes ${notesClassName}`}>
      {exampleNotes.map(
        (
          item,
          index // Corrected map function
        ) => (
          <Note
            key={index} // Added key prop
            title={item.title}
            date={item.date}
            details={item.details}
          />
        )
      )}
    </div>
  );
};

export default Notes;
