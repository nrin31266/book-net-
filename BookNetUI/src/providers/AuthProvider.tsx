import React, { createContext, useContext, useEffect, useState } from "react";
import KeycloakService from "../feature/keycloak/keycloak";
import { Navigate, Outlet } from "react-router-dom";

interface AuthContextType {
  initialized: boolean;
  authenticated: boolean;
  profile: any;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  initialized: false,
  authenticated: false,
  profile: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC = () => {
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [profile, setProfile] = useState<any>(null);
//   const publicPaths = ["/auth/login", "/auth/register"];

  useEffect(() => {
    KeycloakService.init().then((auth) => {
      setAuthenticated(auth);
      setProfile(KeycloakService.profile);
      setInitialized(true);
    });
  }, []);

  if (!initialized) {
    return <div>🔄 Đang khởi tạo Keycloak...</div>;
  }

  if (!authenticated) {
    // return <Navigate to="/auth/login" replace />;
    console.log("User is not authenticated");
    KeycloakService.login();
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        initialized,
        authenticated,
        profile,
        login: KeycloakService.login,
        logout: KeycloakService.logout,
      }}
    >
      <Outlet/>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
