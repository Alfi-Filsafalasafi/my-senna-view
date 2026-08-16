import { listChats } from "@/app/actions/media";
import BackButton from "@/components/BackButton";

type ChatItem = {
  id: string;
  image_url: string;
  description: string | null;
};

export default async function ChatPage() {
  const items: ChatItem[] = await listChats();

  return (
    <main className="app max-w-[720px] mx-auto px-[18px] pt-[18px] pb-[50px]">
      <BackButton />
      <div className="text-center text-[44px] my-2">💌</div>
      <h2 className="text-center text-[38px] font-medium my-4 font-serif text-[#5b4b3d]">
        chat yang paling aku suka
      </h2>

      {items.length === 0 && (
        <p className="text-center text-[#8f8172] font-sans">
          Belum ada screenshot.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#e2d5bd] rounded-[18px] p-3.5"
          >
            <img
              src={item.image_url}
              className="w-full rounded-[18px] max-h-[500px] object-contain bg-[#f2eee5]"
              alt=""
            />
            {item.description && (
              <p className="mt-3 font-sans text-sm leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
