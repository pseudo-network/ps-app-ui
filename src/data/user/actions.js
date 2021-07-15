// Imports

export const UPDATE_USER = "USER/UPDATE_USER"
export const SET_USER = "AUTH/SET_USER"

// Set updated user info in localStorage and cookie
export function updateUserLocalStorage(user) {
  // Update token
  window.localStorage.setItem("user", JSON.stringify(user))
}
