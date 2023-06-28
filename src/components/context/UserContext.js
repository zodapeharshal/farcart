import React, { createContext, useState, useContext } from "react";
// Create the context
export const UserContext = createContext();
// const UserUpdateContext = createContext();

// export function useGetUser(){
//     return  (UserContext)
// }
// export function useUpdateUser() {
//     return useContext(UserUpdateContext)
// }
// // Create a provider component
// export function UserContextProvider({ children }) {
//     const [userData, setUserData] = useState({});

//     return (
//         <UserContext.Provider value={userData}>
//             <UserUpdateContext.Provider value={setUserData}>
//                 {children}
//             </UserUpdateContext.Provider>
//         </UserContext.Provider>
//     );
// }


