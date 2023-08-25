import './App.css';
import { Suspense, lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout/RootLayout';

const Home = lazy(() => import('./components/Home/Home'));
const GameContainer = lazy(() => import('./components/Game/GameContainer'));

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/:game" element={<GameContainer />} />
      </Route>
    )
  );

  return(
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
