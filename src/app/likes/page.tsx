import { getSiteContent } from "@/app/actions/content";
import BackButton from "@/components/BackButton";

export default async function LikesPage() {
  const data = await getSiteContent();
  const html = data?.likes_html || "";

  return (
    <main className="app max-w-[720px] mx-auto px-[18px] pt-[18px] pb-[50px]">
      <BackButton />
      <div className="text-center text-[44px] my-2">☀️</div>
      <h2 className="text-center text-[38px] font-medium my-4 font-serif text-[#5b4b3d]">
        hal hal yang aku suka dari sayangku sennaa
      </h2>

      <div className="bg-[rgba(255,253,248,.96)] border border-[#e2d5bd] rounded-[28px] shadow-[0_12px_35px_rgba(91,75,61,.08)] p-6 mb-4">
        {html ? (
          <div
            className="prose prose-sm max-w-none font-sans leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <p className="text-[#8f8172] font-sans">Belum ada cerita.</p>
        )}
      </div>
    </main>
  );
}
