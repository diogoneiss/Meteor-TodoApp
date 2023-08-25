import React, { useState, useEffect } from 'react';
import {  FormControlLabel, RadioGroup, Radio, FormControl } from '@mui/material';

import { taskStatuses } from '../../../enums/taskModel';

export const TransitionSelect = ({ originalTask, onStatusChange, disabled }) => {

    const [selectedStatus, setSelectedStatus] = useState(originalTask.status);
  
    const handleRadioChange = (event) => {
      setSelectedStatus(event.target.value);
      onStatusChange(event.target.value);
    };
  
    const determineAllowedStatuses = (status) => {
      switch (status) {
        case taskStatuses.CADASTRADA:
          return [true, true, false];
  
        case taskStatuses.EM_ANDAMENTO:
          return [true, true, true];
  
        case taskStatuses.CONCLUIDA:
          return [true, false, true];
        default:
          console.error("Status inválido: ", status)
          return [true, false, false];
      }
    }
  
    const [allowedStatuses, setAllowedStatuses] = useState(determineAllowedStatuses(originalTask.status));
  
    useEffect(() => {
      setAllowedStatuses(determineAllowedStatuses(originalTask.status));
      setSelectedStatus(originalTask.status);
    }, [originalTask]);
  
    //necessário para resetar o form
    useEffect(() => {
      setSelectedStatus(originalTask.status);
    }, [disabled]);
  
    return (
      <FormControl component="fieldset">
        <RadioGroup value={selectedStatus} onChange={handleRadioChange}>
          <FormControlLabel
            value={taskStatuses.CADASTRADA}
            control={<Radio />}
            label={taskStatuses.CADASTRADA}
            disabled={disabled || !allowedStatuses[0]}
          />
          <FormControlLabel
            value={taskStatuses.EM_ANDAMENTO}
            control={<Radio />}
            label={taskStatuses.EM_ANDAMENTO}
            disabled={disabled || !allowedStatuses[1]}
          />
          <FormControlLabel
            value={taskStatuses.CONCLUIDA}
            control={<Radio />}
            label={taskStatuses.CONCLUIDA}
            disabled={disabled || !allowedStatuses[2]}
          />
        </RadioGroup>
      </FormControl>
    );
  };