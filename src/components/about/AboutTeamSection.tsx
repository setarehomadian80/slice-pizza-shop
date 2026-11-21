import Image from "next/image";

const teamMembers = [
  {
    name: "Nico Ferraro",
    role: "Co-founder, dough boss",
    description:
      "Still mixes the Monday dough himself. Has opinions about basil.",
    image: "/image/Nico.png",
  },
  {
    name: "Bea Kowalski",
    role: "Co-founder, everything else",
    description: "Runs the shops, writes the menu and bakes the cookies.",
    image: "/image/bea.png",
  },
  {
    name: "Jide Adeyemi",
    role: "Head pizzaiolo, Wooster Square",
    description: "Can stretch a 16-inch base in eleven seconds. We timed it.",
    image: "/image/jide.png",
  },
  {
    name: "Mai Rowe",
    role: "Shop lead, Westville",
    description: "Knows every regular’s order and most of their dogs’ names.",
    image: "/image/mai.png",
  },
];

export default function AboutTeamSection() {
  return (
    <section
      aria-labelledby="team-title"
      className="bg-[#fff5e2] px-5 py-14
       text-[#301508] sm:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 sm:mb-10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a52817]">
            The people
          </p>

          <h2
            id="team-title"
            className="mt-3 font-[family-name:var(--font-shrikhand)] text-4xl leading-tight sm:text-5xl"
          >
            Floury hands, big hearts
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 
        sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 text-center">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="rounded-[30px] p-6 shadow-[0_10px_24px_rgba(48,21,8,0.08)]"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[210px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 210px, (max-width: 1024px) 40vw, 210px"
                  className="object-contain"
                />
              </div>

              <h3 className="mt-5 text-xl font-black leading-tight">
                {member.name}
              </h3>

              <p className="mt-1 text-sm font-bold text-[#a52817]">
                {member.role}
              </p>

              <p className="mt-3 text-base leading-7 text-[#715c4d]">
                {member.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}