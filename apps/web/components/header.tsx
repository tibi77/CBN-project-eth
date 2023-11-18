import { Button } from "@/components/ui/button";
// import protokit from "@/public/protokit-zinc.svg";
import Image from "next/image";
// @ts-ignore
import truncateMiddle from "truncate-middle";
import { Skeleton } from "@/components/ui/skeleton";
import { Chain } from "./chain";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useState } from "react";

export interface HeaderProps {
  loading: boolean;
  wallet?: string;
  onConnectWallet: () => void;
  balance?: string;
  balanceLoading: boolean;
  blockHeight?: string;
}

export default function Header({
  loading,
  wallet,
  onConnectWallet,
  balance,
  balanceLoading,
  blockHeight,
}: HeaderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="flex items-center justify-start border-b p-2 shadow-sm">
      <div className="container flex">
        <div className="flex basis-6/12 items-center justify-start ">
          <Image
            width={200}
            height={100}
            src={"/cbn.png"}
            alt={"Crypto Brodcast "}
          />
          <Separator className="mx-4 h-8" orientation={"vertical"} />
          <div className="flex grow">
            <Chain height={blockHeight} />
          </div>
          <div className="flex gap-3 shrink">
            <Link href="/world">World</Link>
            <Link href="/blockchain">Blockchain</Link>
            <Link href="/politics">Politics</Link>
            <Link href="/business">Business</Link>

            <Separator className="mx-4 h-8" orientation={"vertical"} />
            <Button
              className="w-44"
              onClick={() =>
                (window.location.href = "/api/auth/login?returnTo=/dashboard")
              }
            >
              Login
            </Button>
          </div>
        </div>
        {isAuthenticated && (
          <div className="flex basis-6/12 flex-row items-center justify-end">
            {/* balance */}
            {wallet && (
              <div className="mr-4 flex shrink flex-col items-end justify-center">
                <div>
                  <p className="text-xs">Your balance</p>
                </div>
                <div className="w-32 pt-0.5 text-right">
                  {balanceLoading && balance === undefined ? (
                    <Skeleton className="h-4 w-full" />
                  ) : (
                    <p className="text-xs font-bold">{balance} MINA</p>
                  )}
                </div>
              </div>
            )}
            {/* connect wallet */}
            <Button
              loading={loading}
              className="w-44"
              onClick={onConnectWallet}
            >
              <div>
                {wallet
                  ? truncateMiddle(wallet, 7, 7, "...")
                  : "Connect wallet"}
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
