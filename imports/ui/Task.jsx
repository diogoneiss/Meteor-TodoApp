import React from 'react';
import { ListItem, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {taskStatuses} from '../models/taskModel';

export const Task = ({ task, onEditClick, onDeleteClick }) => {
  let statusIcon;
  let statusText;

  switch (task.status) {
    case taskStatuses.CADASTRADA:
      statusIcon = <FiberManualRecordIcon color="primary" />;
      statusText = 'Cadastrada';
      break;
    case taskStatuses.EM_ANDAMENTO:
      statusIcon = <FiberManualRecordIcon color="warning" />;
      statusText = 'Em andamento';
      break;
    case taskStatuses.CONCLUIDA:
      statusIcon = <FiberManualRecordIcon color="success" />;
      statusText = 'Concluída';
      break;
    default:
      break;
  }

  return (
    <ListItem>
      <ListItemIcon>{statusIcon}</ListItemIcon>
      <ListItemText
        primary={task.title}
        secondary={
          <Typography component="span" variant="body2" color="text.secondary">
            {`Created by ${task.username} - ${statusText}`}
          </Typography>
        }
      />
      <IconButton edge="end" aria-label="edit" onClick={() => onEditClick(task)}>
        <EditIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete" onClick={() => onDeleteClick(task)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
