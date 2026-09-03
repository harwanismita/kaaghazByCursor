import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-4xl">This page is not on the wall</h1>
      <p className="mt-4 text-[#4a403a]">
        That link does not match a product or collection. Try the studio home
        page, or search for a theme.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
