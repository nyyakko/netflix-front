import { UserProvider } from './Contexts/UserContext.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import { createRoot } from 'react-dom/client';

import ProtectedRoute from './Utils/ProtectedRoute.tsx';

import Login from './Routes/Login/Login.tsx';
import Signup from './Routes/Signup/Signup.tsx';

import Home from './Routes/Home/Home.tsx';

const protectedRoutes = [
    { path: '/', requiredRoles: ['USER'], element: <Home /> },
];

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <UserProvider>
            <Routes>
                {protectedRoutes.map(({ path, requiredRoles: roles, element }) =>
                    <Route path={path} element={<ProtectedRoute roles={roles}>{element}</ProtectedRoute>} />
                )}
                <Route path='/entrar' element={<Login />} />
                <Route path='/cadastre-se' element={<Signup />} />
            </Routes>
        </UserProvider>
    </BrowserRouter>,
)
