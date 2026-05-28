import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setuser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
