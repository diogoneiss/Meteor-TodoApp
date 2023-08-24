import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, TextField, FormControl, FormControlLabel, Checkbox, Container, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const accordionStyle = {
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    marginBottom: "20px",
    maxWidth: "70vw",
    margin: "auto",
  };
  


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
        <Accordion style={accordionStyle}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
            >
                <Typography variant='body1'>Inserir nova tarefa</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Container component="main" maxWidth="xs" sx={{mb: "1rem"}}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            label="Título"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            label="Descrição"
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
            </AccordionDetails>
        </Accordion>
    );
};
