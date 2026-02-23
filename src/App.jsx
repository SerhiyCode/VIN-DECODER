
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';  
import { VariablesPage } from './pages/VariablesPage';
import { VariableDetailPage } from './pages/VariableDetailPage';
import { variablesLoader, variableDetailLoader } from './api/api';
import { ErrorPage } from './pages/ErrorPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
       path: "variables", element: <VariablesPage />, loader: variablesLoader,                      
      },        
      { 
       path: "variables/:variableId", element: <VariableDetailPage />,loader: variableDetailLoader,       
      }, 
      // { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]); 

function App() {
  return <RouterProvider router={router} />;
}

export default App;