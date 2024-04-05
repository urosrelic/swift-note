import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
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
  const tooltipStyles = {
    tooltip: {
      sx: {
        color: '#d3e3fd',
        backgroundColor: '#031525',
        fontSize: '1rem',
      },
    },
  };

  return (
    <Tooltip
      className={`note-action ${hover ? 'hover' : ''}`}
      title={title}
      onClick={onClick}
      onClickCapture={onClickCapture}
      slotProps={{ ...tooltipStyles }}
    >
      <div className={`note-action ${hover ? 'hover' : ''}`}>
        <IconButton>{children}</IconButton>
      </div>
    </Tooltip>
  );
};

export default NoteAction;
