"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(username, password);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인 실패");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="w-full flex flex-col items-center">
          <div className="w-113 h-32 relative">
            <Image
              src="/egtronics_logo.png"
              alt="Company Logo"
              fill
              className="object-contain dark:invert"
            />
          </div>
        </div>


        <div className="mt-4 space-y-6">
          <div className="space-y-1">
            <Label htmlFor="username" requiredMark>
              아이디
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" requiredMark>
              비밀번호
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error ? <p className="text-sm text-red-500">{error}</p> : null}


          <Button
            type="submit"
            isLoading={loading}
            className="w-full hover:bg-[#9AA6B2] mt-4"
          >
            로그인
          </Button>
        </div>
      </form>
    </div>
  );
}
