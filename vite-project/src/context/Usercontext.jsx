import { createContext, useState } from "react";

export const UserDataContext = createContext();

const Usercontext = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        name: {
            firstname: '',
            lastname: ''
        },
    });


    return (
        <div>
            <UserDataContext.Provider value={{user, setUser}}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default Usercontext
