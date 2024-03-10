import { redirect } from "next/navigation";

// ? Not using this page for now, as it can have some content about the App, like what the App does and all.

export default function Home() {
  return redirect("/home");
}
