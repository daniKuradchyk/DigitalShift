import Image from "next/image";

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <Image
        src="/brand/logo-qubelia-512.png"
        width={200}
        height={200}
        className="h-14 w-auto sm:h-16 dark:hidden"
        alt="Qubelia"
        priority
      />
      <Image
        src="/brand/logo-qubelia-512-dark.png"
        width={200}
        height={200}
        className="hidden h-14 w-auto sm:h-16 dark:block"
        alt="Qubelia (tema oscuro)"
        priority
      />
    </div>
  );
}
