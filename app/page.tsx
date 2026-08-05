import {
  ArrowRight,
  ChevronDown,
  Clock3,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  Users,
} from "lucide-react";

import Image from "next/image";

const categories = [
  {
    name: "Yarn",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Tools & Notions",
    image:
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Kits",
    image:
      "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Patterns",
    image:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=900&q=85",
  },
];

const workshops = [
  {
    title: "Learn to Knit",
    level: "BEGINNER",
    duration: "2.5 hours",
    price: "£35",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Learn to Crochet",
    level: "BEGINNER",
    duration: "2.5 hours",
    price: "£35",
    image:
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=85",
  },
  {
    title: "Cable Knitting",
    level: "INTERMEDIATE",
    duration: "3 hours",
    price: "£45",
    image:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=85",
  },
];

const products = [
  {
    name: "Pure Wool",
    price: "£6.50",
    category: "YARN",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Birch Knitting Needles",
    price: "£8.00",
    category: "TOOLS",
    image:
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Project Bag",
    price: "£18.00",
    category: "ACCESSORIES",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Soft Merino Yarn",
    price: "£5.60",
    category: "YARN",
    image:
      "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=700&q=85",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#24252b]">
      {/* Announcement */}
      <div className="bg-[#b9d2b1] px-4 py-2 text-center text-sm font-medium text-[#30352f]">
        Free shipping on orders over £60 ✦
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#faf9f7]/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="relative h-11 w-11">
              <Image
                src="/logo.png"
                alt="Stitch & Loop logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div>
              <div className="font-serif text-xl tracking-tight">
                Magic Bird Crafts
              </div>

              <div className="hidden text-[9px] font-semibold uppercase tracking-[0.25em] text-black/45 sm:block">
                Knit · Crochet · Create
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 text-sm font-medium md:flex">
            <a href="#shop" className="flex items-center gap-1 hover:text-[#585bb0]">
              Shop <ChevronDown size={14} />
            </a>
            <a href="#workshops" className="hover:text-[#585bb0]">
              Workshops
            </a>
            <a href="#learn" className="flex items-center gap-1 hover:text-[#585bb0]">
              Learn <ChevronDown size={14} />
            </a>
            <a href="#about" className="hover:text-[#585bb0]">
              About
            </a>
            <a href="#journal" className="hover:text-[#585bb0]">
              Journal
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden rounded-full p-2.5 transition hover:bg-[#b9d2b1]/40 sm:block">
              <Search size={19} strokeWidth={1.7} />
            </button>

            <button className="hidden rounded-full p-2.5 transition hover:bg-[#b9d2b1]/40 sm:block">
              <UserRound size={19} strokeWidth={1.7} />
            </button>

            <button className="relative rounded-full p-2.5 transition hover:bg-[#b9d2b1]/40">
              <ShoppingBag size={20} strokeWidth={1.7} />
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#585bb0] text-[9px] font-bold text-white">
                2
              </span>
            </button>

            <button className="ml-1 rounded-full p-2 md:hidden">
              <Menu size={23} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[650px] max-w-7xl lg:grid-cols-2">
          {/* Copy */}
          <div className="relative z-10 flex items-center px-6 py-20 lg:px-10 xl:px-16">
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#b9d2b1]/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#41483f]">
                <span>✦</span>
                Made for makers
              </div>

              <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                Create something{" "}
                <span className="italic text-[#585bb0]">beautiful.</span>
              </h1>

              <p className="mt-7 max-w-md text-base leading-7 text-black/60">
                Beautiful yarns, thoughtful tools and inspiring workshops to
                help you knit, crochet and unwind.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#shop"
                  className="rounded-lg bg-[#585bb0] px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Shop everything
                </a>

                <a
                  href="#workshops"
                  className="rounded-lg border border-[#585bb0] px-7 py-3.5 text-sm font-semibold text-[#585bb0] transition hover:bg-[#585bb0] hover:text-white"
                >
                  Book a workshop
                </a>
              </div>

              <div className="mt-12 flex items-center gap-8 border-t border-black/10 pt-7">
                <div>
                  <div className="font-serif text-2xl">4.9/5</div>
                  <div className="mt-1 text-xs text-black/50">
                    from 800+ makers
                  </div>
                </div>

                <div className="h-10 w-px bg-black/10" />

                <div>
                  <div className="font-serif text-2xl">12k+</div>
                  <div className="mt-1 text-xs text-black/50">
                    happy customers
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative min-h-[480px] overflow-hidden lg:min-h-0">
            <img
              src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1400&q=90"
              alt="Knitting yarn and needles"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f7] via-transparent to-transparent lg:w-1/3" />

            <div className="absolute bottom-8 right-8 max-w-[220px] rounded-2xl bg-white/90 p-5 shadow-xl backdrop-blur">
              <div className="mb-3 flex gap-1 text-[#585bb0]">★★★★★</div>
              <p className="font-serif text-lg leading-snug">
                “The loveliest place to find your next project.”
              </p>
              <p className="mt-3 text-xs text-black/50">— Emma, London</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-black/5 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-black/10 px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-8">
          {[
            {
              icon: "♡",
              title: "Quality materials",
              text: "Carefully sourced yarns and tools you'll love.",
            },
            {
              icon: "♢",
              title: "Made for makers",
              text: "From beginners to experts, we're here for you.",
            },
            {
              icon: "♧",
              title: "Learn & connect",
              text: "Join workshops and a creative community.",
            },
            {
              icon: "✦",
              title: "Thoughtful gifts",
              text: "Perfect presents for makers and crafters.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 px-5 py-7 lg:py-9"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#b9d2b1]/50 text-xl text-[#585bb0]">
                {item.icon}
              </div>
              <div>
                <h3 className="font-serif text-base">{item.title}</h3>
                <p className="mt-1 text-xs leading-5 text-black/50">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="shop" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#585bb0]">
                Explore
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl">
                Shop by category
              </h2>
            </div>

            <a
              href="#"
              className="hidden items-center gap-2 text-sm font-semibold text-[#585bb0] sm:flex"
            >
              Shop all <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {categories.map((category) => (
              <a
                href="#"
                key={category.name}
                className="group relative aspect-[0.82] overflow-hidden rounded-2xl"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-white/95 px-4 py-3">
                  <span className="font-serif text-base">{category.name}</span>
                  <ArrowRight
                    size={16}
                    className="text-[#585bb0] transition group-hover:translate-x-1"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section
        id="workshops"
        className="overflow-hidden bg-[#585bb0] px-6 py-24 text-white lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.8fr_1.5fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
              Learn with us
            </div>

            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Learn new skills,
              <br />
              make <span className="italic text-[#b9d2b1]">new friends.</span>
            </h2>

            <p className="mt-6 max-w-md leading-7 text-white/70">
              From complete beginner sessions to advanced techniques, our
              workshops are relaxed, welcoming and designed to help you grow
              your skills.
            </p>

            <a
              href="#"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-[#585bb0] transition hover:-translate-y-0.5"
            >
              See all workshops
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {workshops.map((workshop) => (
              <article
                key={workshop.title}
                className="overflow-hidden rounded-2xl bg-white text-[#24252b]"
              >
                <div className="relative aspect-[1.15] overflow-hidden">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#b9d2b1] px-2.5 py-1 text-[9px] font-bold tracking-wide text-[#30352f]">
                    {workshop.level}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-xl">{workshop.title}</h3>

                  <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4 text-xs text-black/50">
                    <span className="flex items-center gap-1.5">
                      <Clock3 size={13} />
                      {workshop.duration}
                    </span>
                    <strong className="text-sm text-[#24252b]">
                      {workshop.price}
                    </strong>
                  </div>

                  <button className="mt-4 w-full rounded-lg border border-[#585bb0] py-2.5 text-xs font-bold text-[#585bb0] transition hover:bg-[#585bb0] hover:text-white">
                    View workshop
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#585bb0]">
                Favourites
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl">
                Best sellers
              </h2>
            </div>

            <a
              href="#"
              className="hidden items-center gap-2 text-sm font-semibold text-[#585bb0] sm:flex"
            >
              Shop all <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-6">
            {products.map((product) => (
              <article key={product.name} className="group">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#bfbaba]/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-[#585bb0] hover:text-white">
                    <Heart size={15} />
                  </button>

                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold tracking-wide">
                    {product.category}
                  </span>
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg">{product.name}</h3>
                    <p className="mt-1 text-sm font-semibold">{product.price}</p>
                  </div>

                  <button className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-[#585bb0] transition hover:bg-[#585bb0] hover:text-white">
                    <ShoppingBag size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section id="learn" className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#b9d2b1]">
          <div className="grid items-center lg:grid-cols-2">
            <div className="px-8 py-16 sm:px-14 lg:px-20">
              <Users className="mb-6 text-[#585bb0]" size={30} />

              <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
                Craft is better
                <br />
                <span className="italic text-[#585bb0]">together.</span>
              </h2>

              <p className="mt-6 max-w-md leading-7 text-black/60">
                Join our friendly community of knitters and crocheters. Get
                tips, discover new patterns and share what you're making.
              </p>

              <a
                href="#"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#585bb0] px-6 py-3.5 text-sm font-semibold text-white"
              >
                Join the community
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="relative h-[360px] lg:h-full lg:min-h-[430px]">
              <img
                src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=85"
                alt="Handmade knitted craft"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-black/10 bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#585bb0]">
            The Stitch & Loop journal
          </p>

          <h2 className="mt-3 font-serif text-4xl">
            A little inspiration,
            <br />
            straight to your inbox.
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-black/50">
            New workshops, knitting tips, crochet tutorials, pattern ideas
            and the occasional excuse to buy more yarn.
          </p>

          <form className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="h-12 flex-1 rounded-lg border border-black/10 bg-[#faf9f7] px-4 text-sm outline-none transition focus:border-[#585bb0]"
            />
            <button className="h-12 rounded-lg bg-[#585bb0] px-6 text-sm font-semibold text-white transition hover:opacity-90">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-[#24252b] px-6 py-14 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="font-serif text-2xl">
                Stitch <span className="text-[#b9d2b1]">&</span> Loop
              </div>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
                Thoughtful materials, welcoming workshops and everything you
                need to make something beautiful.
              </p>

              <div className="mt-6 flex gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs font-bold transition hover:bg-white hover:text-[#24252b]"
                >
                  IG
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:bg-white hover:text-[#24252b]"
                >
                  <Users size={17} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#b9d2b1]">
                Shop
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-white/55">
                <li><a href="#" className="hover:text-white">Yarn</a></li>
                <li><a href="#" className="hover:text-white">Tools & Notions</a></li>
                <li><a href="#" className="hover:text-white">Kits</a></li>
                <li><a href="#" className="hover:text-white">Gifts</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#b9d2b1]">
                Help
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-white/55">
                <li><a href="#" className="hover:text-white">Workshops</a></li>
                <li><a href="#" className="hover:text-white">Shipping</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-6 text-xs text-white/35">
            © 2026 Stitch & Loop. Made with creativity.
          </div>
        </div>
      </footer>
    </main>
  );
}