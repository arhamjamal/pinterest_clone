const demoPins = [
  {
    id: 1,
    title: "Creative Ideas",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Minimal Workspace",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Nature Inspiration",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Travel Inspiration",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Architecture",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=600&q=80",
  },
];

function Home() {
  return (
    <div className="bg-[#FFFDF9]">
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-14 text-center sm:px-6 sm:pb-14 sm:pt-20 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#252525] sm:text-4xl md:text-5xl">
          Find inspiration for everything
        </h1>

        <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-[#77706A] sm:text-base md:text-lg">
          Discover ideas, save your favorites, and explore inspiration.
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl items-center rounded-full bg-white px-5 py-3 shadow-sm ring-1 ring-[#E8E1DA] transition duration-200 focus-within:ring-2 focus-within:ring-[#D94A5A]/20">
          <input
            type="text"
            placeholder="Search for ideas"
            className="w-full bg-transparent text-sm text-[#252525] outline-none placeholder:text-[#77706A] sm:text-base"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {demoPins.map((pin) => (
            <article
              key={pin.id}
              className="mb-5 break-inside-avoid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#E8E1DA] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={pin.image}
                alt={pin.title}
                className="w-full object-cover transition duration-300 hover:scale-[1.02]"
              />

              <div className="p-4">
                <h2 className="text-sm font-semibold text-[#252525]">
                  {pin.title}
                </h2>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;