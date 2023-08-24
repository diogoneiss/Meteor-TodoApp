import React from 'react';
import {Alert, AlertTitle} from '@mui/material';

const AlertComponent = ({ message, severity = "error", title="" }) => {
  // verificar se message é um objeto
  if (typeof message === 'object') {
    message = JSON.stringify(message);
  }

  if (title === "") {
    switch (severity) {
      case "error":
        title = "Erro";
        break;
      case "warning":
        title = "Atenção";
        break;
        case "success":
          title = "Sucesso";
          break;
    }
  }


  return (
    <Alert severity={severity} >
    <AlertTitle>{title}</AlertTitle>

      {message}
    </Alert>
  );
};

export default AlertComponent;