// import { useEffect, useState } from "react";
// import  UserContext  from "./usercontext2";
// import type { UserRole } from "./userole";



// export interface User {
//     id: string;
//     email: string;
//     name: string;
//     role: UserRole;
//     isVerified: boolean;
// }


// export default function UserContextProvider({ children }: { children: React.ReactNode }) {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Simply check localStorage for existing user data
//         const userData = localStorage.getItem('user');
//         const token = localStorage.getItem('access_token');

//         if (userData && token) {
//             try {
//                 setUser(JSON.parse(userData));
//             } catch (error) {
//                 console.error('Error parsing user data:', error);
//                 // Clear invalid data
//                 localStorage.removeItem('access_token');
//                 localStorage.removeItem('user');
//             }
//         }
//         setLoading(false);
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser, loading }}>
//             {children}
//         </UserContext.Provider>
//     );
// }