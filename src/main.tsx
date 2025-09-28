import { UserProvider } from './Contexts/UserContext.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import { createRoot } from 'react-dom/client';

import ProtectedRoute from './Utils/ProtectedRoute.tsx';

import Login from './Routes/Login/Login.tsx';
import Signup from './Routes/Signup/Signup.tsx';

import Home from './Routes/Home/Home.tsx';
import Landing from './Routes/Landing/Landing.tsx';

const protectedRoutes = [
    { path: '/', roles: ['USER'], element: <Home />, redirectElement: <Landing /> },
];

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <UserProvider>
            <Routes>
                {protectedRoutes.map(({ path, roles, element, redirectElement }) =>
                    <Route path={path} element={<ProtectedRoute roles={roles} redirectElement={redirectElement}>{element}</ProtectedRoute>} />
                )}
                <Route path='/entrar' element={<Login />} />
                <Route path='/cadastre-se' element={<Signup />} />
            </Routes>
        </UserProvider>
    </BrowserRouter>,
)
