"use client";

import Link from "next/link";

type SiteContent = {
  title: string;
  intro: string;
  quote: string;
} | null;

const MENU_ITEMS = [
  {
    href: "/about",
    icon: "🌻",
    title: "tentang senna kesayanganku",
    desc: "",
  },
  {
    href: "/likes",
    icon: "☀️",
    title: "hal hal yang aku suka dari sayangku sennaa",
    desc: "",
  },
  {
    href: "/chat",
    icon: "💌",
    title: "chat yang paling aku suka",
    desc: "",
  },
  { href: "/music", icon: "🎵", title: "music", desc: "" },
  {
    href: "/museum",
    icon: "🌼",
    title: "my lovely",
    desc: "",
  },
  {
    href: "/lovely",
    icon: "✨",
    title: "museum bidadari berakreditasi A",
    desc: "",
  },
  {
    href: "/certificate",
    icon: "🏆",
    title: "sertifikat",
    desc: "",
  },
  {
    href: "/baby",
    icon: "🌻",
    title: "My baby",
    desc: "",
  },
];

export default function Home({ siteContent }: { siteContent: SiteContent }) {
  const title = siteContent?.title || "my senna ♡";
  const intro =
    siteContent?.intro ||
    "Hal-hal kecil yang aku simpan di sini, khusus untuk kamu.";
  const quote = "Dibuat dengan penuh cinta ♡";

  return (
    <main className="app max-w-[720px] mx-auto px-[18px] pt-[18px] pb-[50px]">
      <div className="text-center text-[44px] my-2">
        🌻 <span className="text-[22px]">🌼</span>
      </div>
      <h1 className="text-center text-[48px] font-semibold my-2 font-serif text-[#5b4b3d]">
        {title}
      </h1>
      <p className="text-center text-[#8f8172] font-sans text-[16px] mb-7">
        {intro}
      </p>

      <div className="grid grid-cols-2 gap-[18px]">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-[rgba(255,253,248,.96)] border border-[#e2d5bd] rounded-[28px] shadow-[0_12px_35px_rgba(91,75,61,.08)] p-[30px_14px] text-center min-h-[165px] flex flex-col justify-center"
          >
            <div className="text-[28px]">{item.icon}</div>
            <h2 className="text-[22px] font-medium my-2 font-serif text-[#5b4b3d]">
              {item.title}
            </h2>
            <p className="font-sans text-[#8f8172] text-sm">{item.desc}</p>
          </Link>
        ))}
      </div>

      <div className="bg-[rgba(255,253,248,.96)] border border-[#e2d5bd] rounded-[28px] font-semibold shadow-[0_12px_35px_rgba(91,75,61,.08)] mt-[18px] p-7 text-center font-serif text-[#5b4b3d]">
        {quote}
      </div>
    </main>
  );
}
