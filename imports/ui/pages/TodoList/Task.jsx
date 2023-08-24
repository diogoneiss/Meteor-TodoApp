import React from 'react';
import { ListItem, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {taskStatuses} from '../../../models/taskModel';
import { useNavigate } from 'react-router-dom';

export const Task = ({ task, onDeleteClick }) => {
  let statusIcon;
  let statusText;

  let navigate = useNavigate();

  const handleEditClick = (task) => {
    navigate(`/app/${task._id}`);
  };

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
            {`Criado por ${task.username} - ${statusText}`}
          </Typography>
        }
      />
      <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(task)}>
        <EditIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete" onClick={() => onDeleteClick(task)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
