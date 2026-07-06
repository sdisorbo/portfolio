import { redirect } from "next/navigation";

// The Games page has been merged into Interests (Wine · Chess · Baseball).
export default function Games() {
  redirect("/interests");
}
