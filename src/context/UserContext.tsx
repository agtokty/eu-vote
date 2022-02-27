import React, { createContext, useState } from 'react';

const UserContext = createContext({
    user: '',
    updateUser: () => { },
});


export function UserProvider(props: any) {

    const [user, setUser] = useState(props.user);
    const { children } = props;

    return (
        <UserContext.Provider value={user} >
            {children}
        </UserContext.Provider>
    );
}


export const UserConsumer = UserContext.Consumer;