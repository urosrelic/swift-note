import React from 'react';
import Tooltip from '../../../../Tooltip/Tooltip';
import './NoteAction.css';

interface NoteActionProps {
  hover: boolean;
  title: string;
  onClick?: () => void;
  onClickCapture?: () => void;
  children?: React.ReactNode;
}

const NoteAction = ({
  hover,
  title,
  onClick,
  onClickCapture,
  children,
}: NoteActionProps) => {
  return (
    <div
      className={`note-action ${hover ? 'hover' : ''}`}
      onClick={onClick}
      onClickCapture={onClickCapture}
    >
      <Tooltip tooltipText={title}>
        <div
          className={`note-action ${hover ? 'hover' : ''}`}
          onClick={onClick}
          onClickCapture={onClickCapture}
        >
          {children}
        </div>
      </Tooltip>
    </div>
  );
};

export default NoteAction;
