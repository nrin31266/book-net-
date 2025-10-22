import Keycloak from "keycloak-js";
import type { UserProfile } from "../../types";


class KeycloakService {
  private static _instance: Keycloak | null = null;
  private static _profile: UserProfile | null = null;
  private static _refreshInProgress = false;
  
  static get keycloak(): Keycloak {
    if (!this._instance) {
      this._instance = new Keycloak({
        url: "http://localhost:8080", // Keycloak server
        realm: "book-net",
        clientId: "book-net",
      });
    }
    return this._instance;
  }

  static get profile(): UserProfile | null {
    return this._profile;
  }


  static async init(): Promise<boolean> {
    console.log("Hello keycloak")
    const authenticated = await this.keycloak.init({
        onLoad: 'check-sso',
        pkceMethod: "S256",
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
    })
    if (authenticated) {
        console.log("User authenticated");
        this._profile = await this.keycloak.loadUserProfile();
        this._profile.token = this.keycloak.token || "";
        // Bắt đầu tự động refresh token
        this._autoRefresh();
    }
    return authenticated;
  }

//   static login() {
//     return this.keycloak.login();
//   }

//   static logout() {
//     return this.keycloak.logout({ redirectUri: "http://localhost:3000" });
//   }
  // Arrow function giữ context của class, tránh mất this
  static login = () => {
    return this.keycloak.login({ redirectUri: window.location.origin });
  }
  // Arrow function giữ context của class, tránh mất this
  static logout = () => {
    return this.keycloak.logout({ redirectUri: window.location.origin });
  }

  


    // ✅ Hàm tự động refresh token
  private static _autoRefresh() {
    setInterval(async () => {
      console.log("Check token refresh...");
      if (!this.keycloak.authenticated) return;
      if (this._refreshInProgress) return; // tránh refresh trùng

      const expireTime = this.keycloak.tokenParsed?.exp || 0;
      const now = Math.floor(Date.now() / 1000);

      // Refresh nếu còn dưới 30s
      if (expireTime - now < 30) {
        this._refreshInProgress = true;
        try {
          const refreshed = await this.keycloak.updateToken(60);
          if (refreshed) console.log("🔁 Token refreshed");
        } catch (err) {
          console.error("❌ Failed to refresh token:", err);
        } finally {
          this._refreshInProgress = false;
        }
      }
    }, 30000); // check mỗi 2 phút 
  }
}

export default KeycloakService;
//   static async init(): Promise<boolean> {
//     const authenticated = await this.keycloak.init({
//       onLoad: "login-required",
//       checkLoginIframe: false,
//       pkceMethod: "S256",
//     });

//     if (authenticated) {
//       const kcProfile = await this.keycloak.loadUserProfile();
//       this._profile = {
//         username: kcProfile.username,
//         email: kcProfile.email,
//         firstName: kcProfile.firstName,
//         lastName: kcProfile.lastName,
//         token: this.keycloak.token || "",
//       };
//     }

//     return authenticated;
//   }