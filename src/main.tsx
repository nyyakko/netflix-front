import { UserProvider } from './Contexts/UserContext.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import { createRoot } from 'react-dom/client';

import ProtectedRoute from './Utils/ProtectedRoute.tsx';

import Login from './Pages/Login/Login.tsx';
import Signup from './Pages/Signup/Signup.tsx';

import Home from './Pages/Home/Home.tsx';
import { ModalProvider } from './Contexts/ModalContext.tsx';

const protectedRoutes = [
    { path: '/', roles: ['USER'], success: <Home />, failure: '/entrar' },
];

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <UserProvider>
            <ModalProvider>
                <Routes>
                    {protectedRoutes.map(({ path, roles, success, failure }) =>
                        <Route path={path} element={<ProtectedRoute roles={roles} failure={failure}>{success}</ProtectedRoute>} />
                    )}
                    <Route path='/entrar' element={<Login />} />
                    <Route path='/cadastre-se' element={<Signup />} />
                </Routes>
            </ModalProvider>
        </UserProvider>
    </BrowserRouter>,
)
