import React from 'react';
import { TasksCount } from '../../db/TasksCount';
import CenteredLoading from '../components/CenteredLoading';
import { useTracker } from 'meteor/react-meteor-data';
import { Box, Typography } from '@mui/material';
import useTaskCounts from '../utils/taskCountHook';
export const TodoHeader = ({ showCompleted, searchQuery, userTasksCount }) => {

    const createTitle = () => {
        if (userTasksCount === undefined) {
            return "Carregando..";
        }
        else if (userTasksCount === 0) {
            return "Você não tem tarefas pendentes";
        }
        let title = `Você tem ${userTasksCount} tarefas`;

        if (showCompleted) {
            title += " totais, incluindo as concluídas";
        } else {
            title += " pendentes (excluindo as concluídas)";
        }

        if (searchQuery) {
            title += ` correspondentes a busca "${searchQuery}"`;
        }

        return title;

    }


    return (<Box marginBottom={3} sx={{ flexGrow: 1 }}>
        <Typography align='center' variant="h3" sx={{ flexGrow: 1 }}>
            📝️ Lista de tarefas
        </Typography>

        <Typography align='center' variant="h5" sx={{ flexGrow: 1 }}>
            {createTitle()}
        </Typography>

    </Box>);

};




