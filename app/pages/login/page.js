import Login from "@/components/login";
import { House } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <Login />

      <div className="flex justify-center">
        <House className="h-8 w-8 text-blue-600" />
        <Link href="/" className="flex items-center">
          <span className="ml-2">Inicio</span>
        </Link>
      </div>
    </div>
  );
}