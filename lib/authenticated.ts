import { auth } from "../firebase/config";

/**
 * Checks if user has been authenticated
 * @return Returns true if user has been authenticated
 */
export default function () {
  return auth.currentUser !== null;
}
