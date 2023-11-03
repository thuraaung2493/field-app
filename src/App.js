import { SnackbarProvider } from 'notistack';
import React from 'react';
import { initDB } from 'react-indexed-db-hook';
import { RouterProvider } from 'react-router-dom';
import { DBConfig } from './libs/DBConfig';
import { router } from './routes';

initDB(DBConfig);

function App() {
  return (
    <SnackbarProvider
      autoHideDuration={1000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <RouterProvider router={router}></RouterProvider>
    </SnackbarProvider>
  );
}

export default App;
