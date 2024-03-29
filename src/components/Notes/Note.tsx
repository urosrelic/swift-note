import { useState } from 'react';
import './Note.css';

interface NoteProps {
  title?: string;
  details?: string;
  date: string;
}

const Note = ({ title, details, date }: NoteProps) => {
  const [noteHover, setNoteHover] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setNoteHover(true);
  };

  const handleMouseLeave = () => {
    setNoteHover(false);
  };

  const tooltipClassName = noteHover ? 'hover' : '';

  return (
    <div
      className='note'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='note-title'>{title && <span>{title}</span>}</div>
      <div className='note-details'>{details && <p>{details}</p>}</div>
      <div className='note-date'>
        {' '}
        <span>{date}</span>
      </div>
      <div className={`pin-note ${tooltipClassName}`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          enableBackground='new 0 0 24 24'
          height='24px'
          viewBox='0 0 24 24'
          width='24px'
          fill=''
        >
          <g>
            <rect fill='none' height='24' width='24' />
          </g>
          <g>
            <path d='M14,4v5c0,1.12,0.37,2.16,1,3H9c0.65-0.86,1-1.9,1-3V4H14 M17,2H7C6.45,2,6,2.45,6,3c0,0.55,0.45,1,1,1c0,0,0,0,0,0l1,0v5 c0,1.66-1.34,3-3,3v2h5.97v7l1,1l1-1v-7H19v-2c0,0,0,0,0,0c-1.66,0-3-1.34-3-3V4l1,0c0,0,0,0,0,0c0.55,0,1-0.45,1-1 C18,2.45,17.55,2,17,2L17,2z' />
          </g>
        </svg>
      </div>
      <div className={`paint-note ${tooltipClassName}`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='24'
          viewBox='0 -960 960 960'
          width='24'
        >
          <path d='M440-80q-33 0-56.5-23.5T360-160v-160H240q-33 0-56.5-23.5T160-400v-280q0-66 47-113t113-47h480v440q0 33-23.5 56.5T720-320H600v160q0 33-23.5 56.5T520-80h-80ZM240-560h480v-200h-40v160h-80v-160h-40v80h-80v-80H320q-33 0-56.5 23.5T240-680v120Zm0 160h480v-80H240v80Zm0 0v-80 80Z' />
        </svg>
      </div>
      <div className={`archive-note ${tooltipClassName}`}>
        <svg
          fill=''
          xmlns='http://www.w3.org/2000/svg'
          height='24'
          viewBox='0 -960 960 960'
          width='24'
        >
          <path d='m480-240 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160ZM200-640v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300Z' />
        </svg>
      </div>
      <div className={`delete-note ${tooltipClassName}`}>
        <svg
          fill=''
          xmlns='http://www.w3.org/2000/svg'
          height='24'
          viewBox='0 -960 960 960'
          width='24'
        >
          <path d='M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z' />
        </svg>
      </div>
    </div>
  );
};

export default Note;
