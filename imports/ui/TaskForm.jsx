import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, TextField, FormControl, FormControlLabel, Checkbox, Container } from '@mui/material';

export const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title) return;

        const task = {
            title,
            description,
            isPrivate,
        };

        Meteor.call('tasks.insert', task);

        setTitle('');
        setDescription('');
        setIsPrivate(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                
                <FormControlLabel
                    control={<Checkbox checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />}
                    label="Tarefa privada?"
                />
                <Button type="submit" fullWidth variant="contained" color="primary">
                    Adicionar tarefa
                </Button>
            </form>
        </Container>
    );
};
