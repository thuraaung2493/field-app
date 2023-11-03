import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import AddNewInterviewPage from '../pages/AddNewInterviewPage';
import { default as ClientPage } from '../pages/ClientPage';
import EditInterviewPage from '../pages/EditInterviewPage';
import HomePage from '../pages/HomePage';
import InterviewPage from '../pages/InterviewPage';
import LoginPage from '../pages/LoginPage';
import UploadPage from '../pages/UploadPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'interviews',
        element: <InterviewPage />,
      },
      {
        path: 'interviews/:interviewId/edit',
        element: <EditInterviewPage />,
      },
      {
        path: 'interviews/add-new',
        element: <AddNewInterviewPage />,
      },
      {
        path: 'clients',
        element: <ClientPage />,
      },
      {
        path: 'upload',
        element: <UploadPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
