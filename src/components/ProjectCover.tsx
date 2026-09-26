import Image from "next/image";

const tones = [
  "from-sky-500/30 to-indigo-600/10",
  "from-emerald-500/25 to-teal-700/10",
  "from-amber-500/25 to-orange-700/10",
];

export function ProjectCover({
  title,
  coverUrl,
  tone = 0,
  priority = false,
}: {
  title: string;
  coverUrl: string | null;
  tone?: number;
  priority?: boolean;
}) {
  const initial = title.trim().charAt(0).toUpperCase() || "P";

  return (
    <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${tones[tone % tones.length]}`}>
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-5xl font-semibold text-white/80">{initial}</span>
        </div>
      )}
    </div>
  );
}
