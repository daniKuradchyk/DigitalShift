// src/components/common/Logo.tsx (ejemplo simple)
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/brand/logo-qubelia-512.png"
        width={200}
        height={200}
        className="h-14 w-auto sm:h-16"
        alt="Qubelia"
        priority
      />
      
    </div>
  );
}
