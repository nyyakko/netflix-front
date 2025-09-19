import { useState, useContext, useEffect, createContext, type ReactNode } from 'react';

import * as UserService from '../Api/User/UserService.ts';

import type { UserResponse } from '../Api/User/Contracts/Responses/UserResponse.ts';

type UserContextType = {
    user: UserResponse | null;
    setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode })
{
    const [user, setUser] = useState<UserResponse | null>(null);

    useEffect(() => {
        UserService
            .me()
            .then(user => {
                setUser(user!);
            })
            .catch(_ => {});
    }, []);

    return (
        <UserContext value={{ user, setUser }}>
            {children}
        </UserContext>
    );
}

export function userUser(): UserContextType
{
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within an AuthProvider');
    return context;
}
