import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    slug: "espresso-open-abaya",
    name: "Espresso Open Abaya",
    price: 92,
    category: "abayas" as const,
    description:
      "A flowing open-front abaya in soft crepe, finished with covered buttons and deep sleeves. Made to layer over your everyday looks.",
    fabric: "100% crepe. Fully lined. Opaque, non-sheer.",
    care: "Machine wash cold on a gentle cycle. Hang dry. Cool iron if needed.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatchStart: "#5c4530",
    swatchEnd: "#3c2c20",
    inStock: true,
    images: [
      "/products/espresso-open-abaya/01.jpg",
      "/products/espresso-open-abaya/02.jpg",
      "/products/espresso-open-abaya/03.jpg",
      "/products/espresso-open-abaya/04.jpg",
      "/products/espresso-open-abaya/05.jpg",
    ],
  },
  {
    slug: "sand-closed-abaya",
    name: "Sand Closed Abaya",
    price: 62,
    originalPrice: 88,
    category: "abayas" as const,
    description:
      "A closed-front silhouette in a warm sand tone, tailored for a clean, elevated everyday look with subtle sleeve detailing.",
    fabric: "100% crepe. Fully lined. Opaque, non-sheer.",
    care: "Machine wash cold on a gentle cycle. Hang dry. Cool iron if needed.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatchStart: "#e7d7bf",
    swatchEnd: "#c9ad84",
    inStock: true,
    images: [
      "/products/sand-closed-abaya/01.jpg",
      "/products/sand-closed-abaya/02.jpg",
      "/products/sand-closed-abaya/03.jpg",
      "/products/sand-closed-abaya/04.jpg",
      "/products/sand-closed-abaya/05.jpg",
    ],
  },
  {
    slug: "gilded-occasion-abaya",
    name: "Gilded Occasion Abaya",
    price: 134,
    category: "abayas" as const,
    description:
      "Our signature occasion piece — fine gold thread embroidery along the cuff and hem, designed for the days worth dressing up for.",
    fabric: "100% crepe with metallic gold thread embroidery. Fully lined.",
    care: "Dry clean recommended to protect the embroidery. Do not tumble dry.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatchStart: "#b08d57",
    swatchEnd: "#8a6a4f",
    inStock: false,
    images: [
      "/products/gilded-occasion-abaya/01.jpg",
      "/products/gilded-occasion-abaya/02.jpg",
      "/products/gilded-occasion-abaya/03.jpg",
      "/products/gilded-occasion-abaya/04.jpg",
      "/products/gilded-occasion-abaya/05.jpg",
    ],
  },
  {
    slug: "taupe-everyday-abaya",
    name: "Taupe Everyday Abaya",
    price: 79,
    category: "abayas" as const,
    description:
      "Breathable, easy-care fabric in a versatile taupe shade — the one you'll reach for on repeat.",
    fabric: "100% linen-blend. Fully lined. Opaque, non-sheer.",
    care: "Machine wash cold. Tumble dry low. Iron on low heat if needed.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatchStart: "#8a6a4f",
    swatchEnd: "#5c4530",
    inStock: true,
    images: [
      "/products/taupe-everyday-abaya/01.jpg",
      "/products/taupe-everyday-abaya/02.jpg",
      "/products/taupe-everyday-abaya/03.jpg",
      "/products/taupe-everyday-abaya/04.jpg",
      "/products/taupe-everyday-abaya/05.jpg",
    ],
  },
  {
    slug: "ivory-chiffon-hijab",
    name: "Ivory Chiffon Hijab",
    price: 18,
    category: "hijabs" as const,
    description:
      "Lightweight chiffon with a soft matte finish, generous length for easy draping and secure wrapping.",
    fabric: "100% chiffon. Lightly textured, opaque matte finish.",
    care: "Hand wash cold. Do not wring. Hang dry. Cool iron if needed.",
    sizes: ["One Size"],
    swatchStart: "#faf5ec",
    swatchEnd: "#ece0d1",
    inStock: true,
    images: [
      "/products/ivory-chiffon-hijab/01.jpg",
      "/products/ivory-chiffon-hijab/02.jpg",
      "/products/ivory-chiffon-hijab/03.jpg",
      "/products/ivory-chiffon-hijab/04.jpg",
      "/products/ivory-chiffon-hijab/05.jpg",
      "/products/ivory-chiffon-hijab/06.jpg",
    ],
  },
  {
    slug: "cocoa-jersey-hijab",
    name: "Cocoa Jersey Hijab",
    price: 16,
    category: "hijabs" as const,
    description:
      "Our best-selling jersey hijab — stretch, no-slip fabric that holds its shape from morning to night.",
    fabric: "95% viscose, 5% elastane jersey. Stretch, no-slip weave.",
    care: "Machine wash cold. Tumble dry low or hang dry.",
    sizes: ["One Size"],
    swatchStart: "#6b4a38",
    swatchEnd: "#3c2c20",
    inStock: true,
    images: [
      "/products/cocoa-jersey-hijab/01.jpg",
      "/products/cocoa-jersey-hijab/02.jpg",
      "/products/cocoa-jersey-hijab/03.jpg",
      "/products/cocoa-jersey-hijab/04.jpg",
      "/products/cocoa-jersey-hijab/05.jpg",
      "/products/cocoa-jersey-hijab/06.jpg",
      "/products/cocoa-jersey-hijab/07.jpg",
    ],
  },
  {
    slug: "gold-dot-instant-hijab",
    name: "Gold Dot Instant Hijab",
    price: 22,
    category: "hijabs" as const,
    description:
      "Pre-styled instant hijab with a delicate gold dot print, on for a polished look in seconds.",
    fabric: "100% chiffon over a pre-stitched jersey underscarf.",
    care: "Hand wash cold. Hang dry. Do not iron the underscarf.",
    sizes: ["One Size"],
    swatchStart: "#ece0d1",
    swatchEnd: "#b08d57",
    inStock: true,
    images: [
      "/products/gold-dot-instant-hijab/01.jpg",
      "/products/gold-dot-instant-hijab/02.jpg",
      "/products/gold-dot-instant-hijab/03.jpg",
      "/products/gold-dot-instant-hijab/04.jpg",
      "/products/gold-dot-instant-hijab/05.jpg",
      "/products/gold-dot-instant-hijab/06.jpg",
      "/products/gold-dot-instant-hijab/07.jpg",
    ],
  },
  {
    slug: "blush-modal-hijab",
    name: "Blush Modal Hijab",
    price: 12,
    originalPrice: 19,
    category: "hijabs" as const,
    description:
      "Buttery-soft modal blend in a warm blush tone, breathable enough for all-day wear.",
    fabric: "95% modal, 5% elastane. Soft, breathable, opaque.",
    care: "Machine wash cold. Hang dry. Do not bleach.",
    sizes: ["One Size"],
    swatchStart: "#e7d7bf",
    swatchEnd: "#8a6a4f",
    inStock: true,
    images: [
      "/products/blush-modal-hijab/01.jpg",
      "/products/blush-modal-hijab/02.jpg",
      "/products/blush-modal-hijab/03.jpg",
      "/products/blush-modal-hijab/04.jpg",
      "/products/blush-modal-hijab/05.jpg",
      "/products/blush-modal-hijab/06.jpg",
    ],
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
