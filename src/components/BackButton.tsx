import Link from "next/link";

export default function BackButton() {
  return (
    <div className="flex justify-between gap-3 mb-6">
      <Link
        href="/"
        className="border border-[#e2d5bd] bg-[#f8f1e2] rounded-[20px] py-[11px] px-4 inline-block text-sm"
      >
        ← beranda
      </Link>
    </div>
  );
}
