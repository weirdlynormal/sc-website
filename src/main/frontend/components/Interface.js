import React, { useState } from "react";

/**
 * Interface component
 *
 * How to use:
 * Wrap your sign-up and login components with Interface and receive registerUser, authenticate, and registeredUser as props.
 *
 * Example:
 * <Interface>
 *   {({ registerUser, authenticate, registeredUser }) => (
 *     // Your sign-up and login UI here
 *   )}
 * </Interface>
 */
export default function Interface({ children }) {
  // Only one user can be registered at a time (demo logic)
  const [registeredUser, setRegisteredUser] = useState(null);
  // { employeeId, password, email, role }

  // Register user from sign up
  function registerUser(employeeId, password, email) {
    // Role: first digit of 9-digit employeeId
    let role = null;
    if (/^1\d{8}$/.test(employeeId)) role = 1;
    else if (/^2\d{8}$/.test(employeeId)) role = 2;
    else if (/^3\d{8}$/.test(employeeId)) role = 3;
    else role = 0; // invalid or unknown
    setRegisteredUser({ employeeId, password, email, role });
  }

  // Authenticate login
  function authenticate(employeeId, password) {
    if (
      registeredUser &&
      registeredUser.employeeId === employeeId &&
      registeredUser.password === password
    ) {
      return { success: true, role: registeredUser.role };
    }
    return { success: false };
  }

  // Pass logic and user data as props to children
  return children({
    registeredUser,
    registerUser,
    authenticate,
  });
}
