import { useState } from "react";
import AuthContext from "./authContext";

const demoAccountsKey = "graphic-design-hub-demo-accounts";

function readDemoAccounts() {
  try {
    const accounts = JSON.parse(localStorage.getItem(demoAccountsKey) || "[]");
    return Array.isArray(accounts) ? accounts : [];
  } catch {
    return [];
  }
}

function encodeBytes(bytes) {
  return btoa(String.fromCharCode(...bytes));
}

function decodeBytes(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

async function hashPassword(password, salt = crypto.getRandomValues(new Uint8Array(16))) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const digest = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" },
    key,
    256
  );

  return encodeBytes(new Uint8Array(digest));
}

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(
    () => localStorage.getItem("loggedIn") === "true" || sessionStorage.getItem("loggedIn") === "true"
  );

  const login = ({ rememberMe = false } = {}) => {
    if (rememberMe) {
      localStorage.setItem("loggedIn", "true");
      sessionStorage.removeItem("loggedIn");
    } else {
      sessionStorage.setItem("loggedIn", "true");
      localStorage.removeItem("loggedIn");
    }
    setLoggedIn(true);
  };

  const registerDemoAccount = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = readDemoAccounts();

    if (accounts.some((account) => account.email === normalizedEmail)) {
      return { ok: false, field: "email", message: "An account with this email already exists. Sign in instead." };
    }

    try {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const passwordHash = await hashPassword(password, salt);
      const username = normalizedEmail.split("@")[0];
      accounts.push({ name: name.trim(), email: normalizedEmail, username, salt: encodeBytes(salt), passwordHash });
      localStorage.setItem(demoAccountsKey, JSON.stringify(accounts));
      login();
      return { ok: true };
    } catch {
      return { ok: false, field: "form", message: "Could not create a demo account in this browser." };
    }
  };

  const authenticateDemoAccount = async ({ identifier, password, rememberMe }) => {
    const normalizedIdentifier = identifier.trim().toLowerCase();
    const account = readDemoAccounts().find((item) =>
      item.email === normalizedIdentifier || item.username === normalizedIdentifier
    );

    if (!account) {
      return { ok: false, field: "identifier", message: "No demo account found. Create an account first." };
    }

    try {
      const passwordHash = await hashPassword(password, decodeBytes(account.salt));
      if (passwordHash !== account.passwordHash) {
        return { ok: false, field: "password", message: "The password does not match this demo account." };
      }

      login({ rememberMe });
      return { ok: true };
    } catch {
      return { ok: false, field: "form", message: "Could not validate this demo account in the browser." };
    }
  };

  const logout = () => {
    sessionStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, registerDemoAccount, authenticateDemoAccount, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
