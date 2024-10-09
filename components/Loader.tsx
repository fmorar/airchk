import { cn } from "@/lib/utils";  // Si tienes una función cn para combinar clases
import { Loader2 } from "lucide-react"; // Si quieres usar el ícono spinner de lucide-react

export default function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 className="animate-spin text-primary h-8 w-8" />
    </div>
  );
}
