import { Loader2 } from "lucide-react";
import React from "react";

export default function loading ( ) {
  return (
    <div className="grid place-items-center min-h-screen">
      <Loader2 size={150} className="animate-spin text-emerald-600" />
    </div>
  );
}
