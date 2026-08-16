"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PinScreen from "@/components/PinScreen";
import Home from "@/components/Home";

type SiteContent = {
  title: string;
  intro: string;
  quote: string;
} | null;

export default function HomeGate({
  initiallyUnlocked,
  siteContent,
}: {
  initiallyUnlocked: boolean;
  siteContent: SiteContent;
}) {
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);
  const router = useRouter();

  if (!unlocked) {
    return (
      <PinScreen
        onUnlock={() => {
          setUnlocked(true);
          // refresh biar page.tsx (server) fetch ulang site_content
          // sekarang cookie session udah keset
          router.refresh();
        }}
      />
    );
  }

  return <Home siteContent={siteContent} />;
}
