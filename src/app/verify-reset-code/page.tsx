"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function VerifyResetCode() {
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode }),
        }
      );

      const data = await res.json();

      if (res.ok && data.status === "Success") {
        toast.success("Code verified successfully ✅", {
          position: "top-center",
        });

        router.push("/reset-password");
      } else {
        toast.error(data.message || "Invalid code", { position: "top-center" });
      }
    } catch (error) {
      toast.error("Network error", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Verify Reset Code</h2>
      <form onSubmit={handleVerify} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter verification code"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Verifying..." : "Verify Code"}
        </Button>
      </form>
    </div>
  );
}
