import { listLovely } from "@/app/actions/media";
import BackButton from "@/components/BackButton";

type LovelyItem = {
  id: string;
  image_url: string;
  response: string | null;
};

export default async function LovelyPage() {
  const items: LovelyItem[] = await listLovely();

  return (
    <main className="app max-w-[960px] mx-auto px-[18px] pt-[18px] pb-[50px]">
      <BackButton />
      <div className="text-center text-[44px] my-2">✨</div>
      <h2 className="text-center text-[38px] font-medium my-4 font-serif text-[#5b4b3d]">
        museum bidadari berakreditasi A
      </h2>

      {items.length === 0 && (
        <p className="text-center text-[#8f8172] font-sans">
          Belum ada foto.
        </p>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#e2d5bd] rounded-[18px] p-3.5 flex flex-col"
          >
            <img
              src={item.image_url}
              className="w-full rounded-[18px] max-h-[500px] object-contain bg-[#f2eee5]"
              alt=""
            />

            {item.response && (
              <div className="mt-3 flex gap-2.5 items-start">
                <div className="shrink-0 w-9 h-9 rounded-full bg-[#f2eee5] border border-[#e2d5bd] flex items-center justify-center text-[18px]">
                  ✨
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[#5b4b3d] text-sm font-sans">
                    Reaksiku
                  </span>
                  <p className="font-sans text-sm leading-relaxed mt-1">
                    {item.response}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
