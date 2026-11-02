import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

// The first real collection, photographed by the owner in October 2026.
// Upserts by slug, so re-running updates these without touching anything
// added later through the admin.
const products = [
  {
    slug: "lumier-abaya",
    name: "Lumier Abaya",
    price: 75,
    category: "abayas" as const,
    description:
      "Our namesake piece. A sweeping open abaya in bronze shimmer with a softly rippled edge, worn over a deep brown satin inner. It moves beautifully and catches the light with every step.",
    fabric: "Shimmer outer layer with a rippled finish, over a satin inner.",
    care: "Hand wash cold or dry clean. Do not tumble dry. Cool iron on the reverse.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatchStart: "#8a6a4f",
    swatchEnd: "#4a3526",
    inStock: true,
    images: [
      "/products/lumier-abaya/01.jpg",
      "/products/lumier-abaya/02.jpg",
      "/products/lumier-abaya/03.jpg",
      "/products/lumier-abaya/04.jpg",
      "/products/lumier-abaya/05.jpg",
    ],
  },
  {
    slug: "yasmin-abaya",
    name: "Yasmin Abaya",
    price: 75,
    category: "abayas" as const,
    description:
      "A soft cream abaya framed in rich brown lace at the sleeves and along the skirt. Elegant enough for an occasion, easy enough to wear all day.",
    fabric: "Smooth cream fabric with brown lace appliqué on the sleeves and skirt.",
    care: "Dry clean recommended to protect the embroidery. Do not tumble dry.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatchStart: "#e9ddd0",
    swatchEnd: "#8a6a4f",
    inStock: true,
    images: [
      "/products/yasmin-abaya/01.jpg",
      "/products/yasmin-abaya/02.jpg",
      "/products/yasmin-abaya/03.jpg",
      "/products/yasmin-abaya/04.jpg",
      "/products/yasmin-abaya/05.jpg",
    ],
  },
  {
    slug: "yarah-abaya-olive",
    name: "Yarah Abaya (Olive)",
    price: 65,
    category: "abayas" as const,
    description:
      "A relaxed, flowing abaya in olive shimmer satin, scattered with beaded floral embroidery. Wide sleeves and a generous drape make it as comfortable as it is striking.",
    fabric: "Shimmer satin with beaded floral embroidery.",
    care: "Dry clean recommended to protect the embroidery. Do not tumble dry.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatchStart: "#8a8a4a",
    swatchEnd: "#5c5f2e",
    inStock: true,
    images: [
      "/products/yarah-abaya-olive/01.jpg",
      "/products/yarah-abaya-olive/02.jpg",
      "/products/yarah-abaya-olive/03.jpg",
      "/products/yarah-abaya-olive/04.jpg",
    ],
  },
  {
    slug: "yarah-abaya-red",
    name: "Yarah Abaya (Red)",
    price: 65,
    category: "abayas" as const,
    description:
      "A relaxed, flowing abaya in deep red shimmer satin, scattered with beaded floral embroidery. Wide sleeves and a generous drape make it as comfortable as it is striking.",
    fabric: "Shimmer satin with beaded floral embroidery.",
    care: "Dry clean recommended to protect the embroidery. Do not tumble dry.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatchStart: "#a3242c",
    swatchEnd: "#6e1018",
    inStock: true,
    images: [
      "/products/yarah-abaya-red/01.jpg",
      "/products/yarah-abaya-red/02.jpg",
      "/products/yarah-abaya-red/03.jpg",
      "/products/yarah-abaya-red/04.jpg",
      "/products/yarah-abaya-red/05.jpg",
    ],
  },
  {
    slug: "muna-abaya-blush",
    name: "Muna Abaya (Blush)",
    price: 55,
    category: "abayas" as const,
    description:
      "Light, airy and graceful. A flowing blush abaya with wide sleeves and a contrast cream edge that frames every movement.",
    fabric: "Lightweight chiffon-style fabric with a contrast cream trim.",
    care: "Hand wash cold or dry clean. Do not tumble dry. Cool iron on the reverse.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatchStart: "#f6dccb",
    swatchEnd: "#e9c2ad",
    inStock: true,
    images: [
      "/products/muna-abaya-blush/01.jpg",
      "/products/muna-abaya-blush/02.jpg",
      "/products/muna-abaya-blush/03.jpg",
      "/products/muna-abaya-blush/04.jpg",
      "/products/muna-abaya-blush/05.jpg",
    ],
  },
  {
    slug: "muna-abaya-red",
    name: "Muna Abaya (Red)",
    price: 55,
    category: "abayas" as const,
    description:
      "Light, airy and graceful. A flowing red abaya with wide sleeves and a contrast cream edge that frames every movement.",
    fabric: "Lightweight chiffon-style fabric with a contrast cream trim.",
    care: "Hand wash cold or dry clean. Do not tumble dry. Cool iron on the reverse.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatchStart: "#9b1c26",
    swatchEnd: "#f3e6da",
    inStock: true,
    images: [
      "/products/muna-abaya-red/01.jpg",
      "/products/muna-abaya-red/02.jpg",
      "/products/muna-abaya-red/03.jpg",
    ],
  },
  {
    slug: "layla-abaya-beige",
    name: "Layla Abaya (Beige)",
    price: 60,
    category: "abayas" as const,
    description:
      "A relaxed open abaya in a textured, linen-look beige, finished with embroidered cuffs. Throw it over anything for an easy, put-together look.",
    fabric: "Textured linen-look fabric with embroidered cuffs.",
    care: "Hand wash cold or dry clean. Do not tumble dry. Cool iron on the reverse.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatchStart: "#dccbbd",
    swatchEnd: "#b9a493",
    inStock: true,
    images: [
      "/products/layla-abaya-beige/01.jpg",
      "/products/layla-abaya-beige/02.jpg",
      "/products/layla-abaya-beige/03.jpg",
    ],
  },
  {
    slug: "layla-abaya-grey",
    name: "Layla Abaya (Grey)",
    price: 60,
    category: "abayas" as const,
    description:
      "A relaxed open abaya in a textured, linen-look grey, finished with embroidered cuffs. Throw it over anything for an easy, put-together look.",
    fabric: "Textured linen-look fabric with embroidered cuffs.",
    care: "Hand wash cold or dry clean. Do not tumble dry. Cool iron on the reverse.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatchStart: "#a9a59e",
    swatchEnd: "#7d7973",
    inStock: true,
    images: [
      "/products/layla-abaya-grey/01.jpg",
      "/products/layla-abaya-grey/02.jpg",
      "/products/layla-abaya-grey/03.jpg",
      "/products/layla-abaya-grey/04.jpg",
    ],
  },
  {
    slug: "shimmer-hijab-mocha",
    name: "Shimmer Hijab (Mocha)",
    price: 6,
    category: "hijabs" as const,
    description:
      "A soft mocha hijab with fine shimmer threads woven through, for a subtle sparkle that works from day to evening.",
    fabric: "Soft woven fabric with shimmer threads.",
    care: "Hand wash cold and dry flat. Cool iron if needed.",
    sizes: ["One size"],
    swatchStart: "#8c6858",
    swatchEnd: "#6b4c3f",
    inStock: true,
    images: [
      "/products/shimmer-hijab-mocha/01.jpg",
      "/products/shimmer-hijab-mocha/02.jpg",
    ],
  },
  {
    slug: "shimmer-hijab-olive",
    name: "Shimmer Hijab (Olive)",
    price: 6,
    category: "hijabs" as const,
    description:
      "A soft olive hijab with fine shimmer threads woven through, for a subtle sparkle that works from day to evening.",
    fabric: "Soft woven fabric with shimmer threads.",
    care: "Hand wash cold and dry flat. Cool iron if needed.",
    sizes: ["One size"],
    swatchStart: "#5a5e3a",
    swatchEnd: "#3f4229",
    inStock: true,
    images: [
      "/products/shimmer-hijab-olive/01.jpg",
      "/products/shimmer-hijab-olive/02.jpg",
    ],
  },
  {
    slug: "jersey-hijab-lilac",
    name: "Jersey Hijab (Lilac)",
    price: 6,
    category: "hijabs" as const,
    description:
      "An easy, stretchy lilac jersey hijab with a scattering of tiny sparkles. Drapes softly and stays put through the day.",
    fabric: "Soft jersey with a light sparkle.",
    care: "Hand wash cold and dry flat. Cool iron if needed.",
    sizes: ["One size"],
    swatchStart: "#b9a9b6",
    swatchEnd: "#8f8090",
    inStock: true,
    images: [
      "/products/jersey-hijab-lilac/01.jpg",
      "/products/jersey-hijab-lilac/02.jpg",
      "/products/jersey-hijab-lilac/03.jpg",
    ],
  },
  {
    slug: "satin-hijab-mauve",
    name: "Satin Hijab (Mauve)",
    price: 6,
    category: "hijabs" as const,
    description:
      "A smooth mauve satin hijab with a gentle sheen. Polished, lightweight and lovely against the skin.",
    fabric: "Satin with a soft sheen.",
    care: "Hand wash cold and dry flat. Cool iron if needed.",
    sizes: ["One size"],
    swatchStart: "#c9aeb0",
    swatchEnd: "#9c8285",
    inStock: true,
    images: [
      "/products/satin-hijab-mauve/01.jpg",
      "/products/satin-hijab-mauve/02.jpg",
    ],
  },
  {
    slug: "satin-hijab-mint",
    name: "Satin Hijab (Mint)",
    price: 6,
    category: "hijabs" as const,
    description:
      "A smooth mint satin hijab with a gentle sheen. Polished, lightweight and lovely against the skin.",
    fabric: "Satin with a soft sheen.",
    care: "Hand wash cold and dry flat. Cool iron if needed.",
    sizes: ["One size"],
    swatchStart: "#cfe3d6",
    swatchEnd: "#9fbfac",
    inStock: true,
    images: [
      "/products/satin-hijab-mint/01.jpg",
      "/products/satin-hijab-mint/02.jpg",
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
