import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home'
import ErrorPage from './components/error-page'
import MergePDF from './pages/merge-pdf'
const App = () => {
  const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage/>,
    children: [{
      path: "/tools/pdf/merge-pdf",
      element: <MergePDF/>
    }]
  }])
  return (
    <RouterProvider router={router} />
      )
}

export default App
