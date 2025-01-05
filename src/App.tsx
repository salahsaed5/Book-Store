import { RouterProvider } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import './App.css';
import { Routes } from './modules/Routes/Routes';


function App() {
  

  return (
    <>
   
        <RouterProvider router={Routes}>
        </RouterProvider>
    </>
  );
};
export default App;