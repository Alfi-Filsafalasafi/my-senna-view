import { checkSession } from "@/app/actions/auth";
import { getSiteContent } from "@/app/actions/content";
import HomeGate from "@/components/HomeGate";

export default async function Page() {
  const unlocked = await checkSession();

  let siteContent = null;
  if (unlocked) {
    siteContent = await getSiteContent();
  }

  return <HomeGate initiallyUnlocked={unlocked} siteContent={siteContent} />;
}
