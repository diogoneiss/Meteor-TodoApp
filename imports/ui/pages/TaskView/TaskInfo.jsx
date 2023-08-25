import React from 'react';
import {  Box, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';

export const TaskInfo = ({ task }) => {

    const formatRelativeTime = (date) => {
      return formatDistanceToNow(new Date(date), { addSuffix: true, locale: pt });
    };
  
    return (
      <Box>
        <Typography>Tarefa criada {formatRelativeTime(task.createdAt)}</Typography>
        {task.updatedAt && <Typography>Atualizada pela última vez {formatRelativeTime(task.updatedAt)}</Typography>}
      </Box>
    );
  };

    export default TaskInfo;