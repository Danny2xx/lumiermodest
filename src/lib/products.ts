export type Category = "abayas" | "hijabs";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: Category;
  description: string;
  sizes: string[];
  swatch: [string, string];
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "espresso-open-abaya",
    name: "Espresso Open Abaya",
    price: 92,
    category: "abayas",
    description:
      "A flowing open-front abaya in soft crepe, finished with covered buttons and deep sleeves. Made to layer over your everyday looks.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatch: ["#5c4530", "#3c2c20"],
    inStock: true,
  },
  {
    id: "2",
    slug: "sand-closed-abaya",
    name: "Sand Closed Abaya",
    price: 62,
    originalPrice: 88,
    category: "abayas",
    description:
      "A closed-front silhouette in a warm sand tone, tailored for a clean, elevated everyday look with subtle sleeve detailing.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatch: ["#e7d7bf", "#c9ad84"],
    inStock: true,
  },
  {
    id: "3",
    slug: "gilded-occasion-abaya",
    name: "Gilded Occasion Abaya",
    price: 134,
    category: "abayas",
    description:
      "Our signature occasion piece — fine gold thread embroidery along the cuff and hem, designed for the days worth dressing up for.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatch: ["#b08d57", "#8a6a4f"],
    inStock: false,
  },
  {
    id: "4",
    slug: "taupe-everyday-abaya",
    name: "Taupe Everyday Abaya",
    price: 79,
    category: "abayas",
    description:
      "Breathable, easy-care fabric in a versatile taupe shade — the one you'll reach for on repeat.",
    sizes: ["XS", "S", "M", "L", "XL"],
    swatch: ["#8a6a4f", "#5c4530"],
    inStock: true,
  },
  {
    id: "5",
    slug: "ivory-chiffon-hijab",
    name: "Ivory Chiffon Hijab",
    price: 18,
    category: "hijabs",
    description:
      "Lightweight chiffon with a soft matte finish, generous length for easy draping and secure wrapping.",
    sizes: ["One Size"],
    swatch: ["#faf5ec", "#ece0d1"],
    inStock: true,
  },
  {
    id: "6",
    slug: "cocoa-jersey-hijab",
    name: "Cocoa Jersey Hijab",
    price: 16,
    category: "hijabs",
    description:
      "Our best-selling jersey hijab — stretch, no-slip fabric that holds its shape from morning to night.",
    sizes: ["One Size"],
    swatch: ["#6b4a38", "#3c2c20"],
    inStock: true,
  },
  {
    id: "7",
    slug: "gold-dot-instant-hijab",
    name: "Gold Dot Instant Hijab",
    price: 22,
    category: "hijabs",
    description:
      "Pre-styled instant hijab with a delicate gold dot print, on for a polished look in seconds.",
    sizes: ["One Size"],
    swatch: ["#ece0d1", "#b08d57"],
    inStock: true,
  },
  {
    id: "8",
    slug: "blush-modal-hijab",
    name: "Blush Modal Hijab",
    price: 12,
    originalPrice: 19,
    category: "hijabs",
    description:
      "Buttery-soft modal blend in a warm blush tone, breathable enough for all-day wear.",
    sizes: ["One Size"],
    swatch: ["#e7d7bf", "#8a6a4f"],
    inStock: true,
  },
];

export function getProductsByCategory(category: Category) {
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getSaleProducts() {
  return products.filter((p) => p.originalPrice !== undefined);
}
