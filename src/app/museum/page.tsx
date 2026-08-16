import { listMuseum } from "@/app/actions/media";
import BackButton from "@/components/BackButton";

type MuseumItem = {
  id: string;
  image_url: string;
};

export default async function MuseumPage() {
  const items: MuseumItem[] = await listMuseum();

  return (
    <main className="app max-w-[720px] mx-auto px-[18px] pt-[18px] pb-[50px]">
      <BackButton />
      <div className="text-center text-[44px] my-2">🌼</div>
      <h2 className="text-center text-[38px] font-medium my-4 font-serif text-[#5b4b3d]">
        my lovely
      </h2>

      {items.length === 0 && (
        <p className="text-center text-[#8f8172] font-sans">Belum ada foto.</p>
      )}

      <div className="grid grid-cols-2 gap-3.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#e2d5bd] rounded-[18px] p-3.5"
          >
            <img
              src={item.image_url}
              className="w-full rounded-[14px] max-h-[260px] object-cover"
              alt=""
            />
          </div>
        ))}
      </div>
    </main>
  );
}
