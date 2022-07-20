import { Context } from "@nuxt/types";
import { auth } from "~/firebase/config";

export default function ({ route, redirect }: Context) {
  if (typeof window !== "undefined") {
    if (auth.currentUser === null) {
      if (route.path === "/login") {
        return;
      }
      alert("Login terlebih dahulu");
      return redirect("/login");
    } else if (auth.currentUser !== null) {
      if (route.path === "/login") {
        return redirect("/");
      }
    }
  }
}
