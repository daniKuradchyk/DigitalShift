import Image from "next/image";

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <Image
        src="/brand/logo-qubelia-512.png"
        // El archivo es un wordmark apaisado de 3334x1043 (3,2:1). Declararlo 200x200
        // hacía que el navegador reservase una caja cuadrada de 36x36 y el logo saltase
        // a ~115px de ancho al cargar: layout shift en la cabecera de todas las páginas.
        // La altura la fija el CSS (h-9 / sm:h-10), así que el tamaño final no cambia.
        width={200}
        height={63}
        className="h-9 w-auto sm:h-10"
        alt="Qubelia"
        priority
      />
    </div>
  );
}
