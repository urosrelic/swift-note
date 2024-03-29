import './Note.css';

interface NoteProps {
  title?: string;
  details?: string;
  date: string;
}

const Note = ({ title, details, date }: NoteProps) => {
  return (
    <div className='note'>
      <div className='note-title'>{title && <span>{title}</span>}</div>
      <div className='note-details'>{details && <p>{details}</p>}</div>
      <div className='note-date'>
        {' '}
        <span>{date}</span>
      </div>
    </div>
  );
};

export default Note;
