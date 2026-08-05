import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#24252b]">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="font-serif text-5xl">About</h1>
        <p className="mt-4 text-lg text-black/70">
          Learn more about Magic Bird Crafts, our mission, and our creative community.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-[#585bb0] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#46479a]"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
