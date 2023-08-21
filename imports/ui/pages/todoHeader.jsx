import React from 'react';
import { TasksCount } from '../../db/TasksCount';
import CenteredLoading from '../components/CenteredLoading'; 
import { useTracker } from 'meteor/react-meteor-data';
import { Box, Typography } from '@mui/material';	

export const TodoHeader = ({ showCompleted, searchQuery }) => {

    const { tasksCount, isLoading } = useTracker(() => {
        const handle = Meteor.subscribe('tasks.count', searchQuery, showCompleted);
        if (!handle.ready()) {
            return { tasksCount: 0, isLoading: true };
        }
        const countDoc = TasksCount.findOne();

        return { tasksCount: countDoc ? countDoc.count : 0, isLoading: false };
    });

    const createTitle = () => {

        if (tasksCount === 0) {
            return "Você não tem tarefas pendentes";
        }
        let title = `Você tem ${tasksCount} tarefas`;

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

        {isLoading ?
            <CenteredLoading height='5vh' />
            :
            <Typography align='center' variant="h5" sx={{ flexGrow: 1 }}>
                {createTitle()}
            </Typography>
        }
    </Box>);

};




