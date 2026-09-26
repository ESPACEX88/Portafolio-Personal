import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

function hasProfilePhoto() {
  return existsSync(path.join(process.cwd(), "public", "foto-perfil.jpg"));
}

export function ProfileAvatar() {
  if (!hasProfilePhoto()) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-900">
        <span className="font-display text-6xl font-semibold tracking-tight text-white/90">JP</span>
      </div>
    );
  }

  return (
    <Image
      src="/foto-perfil.jpg"
      alt="Foto de perfil de José Posadas"
      fill
      priority
      sizes="(min-width: 768px) 320px, 80vw"
      className="object-cover"
    />
  );
}
