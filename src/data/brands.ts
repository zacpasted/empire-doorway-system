// Tozzi images
import tozzi01 from "@/assets/brands/tozzi/showcase-01.jpeg";
import tozzi02 from "@/assets/brands/tozzi/showcase-02.jpeg";
import tozzi03 from "@/assets/brands/tozzi/showcase-03.jpeg";
import tozzi04 from "@/assets/brands/tozzi/showcase-04.jpeg";
import tozzi05 from "@/assets/brands/tozzi/showcase-05.jpeg";
import tozzi06 from "@/assets/brands/tozzi/showcase-06.jpeg";
import tozzi07 from "@/assets/brands/tozzi/showcase-07.jpeg";
import tozzi08 from "@/assets/brands/tozzi/showcase-08.jpeg";
import tozzi09 from "@/assets/brands/tozzi/showcase-09.jpeg";
import tozzi10 from "@/assets/brands/tozzi/showcase-10.jpeg";

// OnlyFangs images
import onlyfangs01 from "@/assets/brands/onlyfangs/showcase-01.jpeg";
import onlyfangs02 from "@/assets/brands/onlyfangs/showcase-02.jpeg";
import onlyfangs03 from "@/assets/brands/onlyfangs/showcase-03.jpeg";
import onlyfangs04 from "@/assets/brands/onlyfangs/showcase-04.jpeg";
import onlyfangs05 from "@/assets/brands/onlyfangs/showcase-05.jpeg";
import onlyfangs06 from "@/assets/brands/onlyfangs/showcase-06.jpeg";
import onlyfangs07 from "@/assets/brands/onlyfangs/showcase-07.jpeg";
import onlyfangs08 from "@/assets/brands/onlyfangs/showcase-08.jpeg";
import onlyfangs09 from "@/assets/brands/onlyfangs/showcase-09.jpeg";
import onlyfangs10 from "@/assets/brands/onlyfangs/showcase-10.jpeg";

// Serena Wong images
import serena01 from "@/assets/brands/serena-wong/showcase-01.jpeg";
import serena02 from "@/assets/brands/serena-wong/showcase-02.jpeg";
import serena03 from "@/assets/brands/serena-wong/showcase-03.jpeg";
import serena04 from "@/assets/brands/serena-wong/showcase-04.jpeg";
import serena05 from "@/assets/brands/serena-wong/showcase-05.jpeg";
import serena06 from "@/assets/brands/serena-wong/showcase-06.jpeg";
import serena07 from "@/assets/brands/serena-wong/showcase-07.jpeg";
import serena08 from "@/assets/brands/serena-wong/showcase-08.jpeg";
import serena09 from "@/assets/brands/serena-wong/showcase-09.jpeg";
import serena10 from "@/assets/brands/serena-wong/showcase-10.jpeg";

// Brand 04 images
import brand04_01 from "@/assets/brands/brand-04/showcase-01.jpeg";
import brand04_02 from "@/assets/brands/brand-04/showcase-02.jpeg";
import brand04_03 from "@/assets/brands/brand-04/showcase-03.jpeg";
import brand04_04 from "@/assets/brands/brand-04/showcase-04.jpeg";
import brand04_05 from "@/assets/brands/brand-04/showcase-05.jpeg";
import brand04_06 from "@/assets/brands/brand-04/showcase-06.jpeg";
import brand04_07 from "@/assets/brands/brand-04/showcase-07.jpeg";
import brand04_08 from "@/assets/brands/brand-04/showcase-08.jpeg";
import brand04_09 from "@/assets/brands/brand-04/showcase-09.jpeg";

export interface BrandExample {
  type: "image" | "video";
  label: string;
  src: string;
}

export interface BrandCaseStudy {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  thumbnail: string;
  challenge: string;
  solution: string;
  results: string[];
  services: string[];
  timeline: string;
  examples: BrandExample[];
}

export const brands: BrandCaseStudy[] = [
  {
    id: 1,
    slug: "dr-michaela-tozzi",
    name: "Dr. Michaela Tozzi",
    tagline: "Luxury dentistry without the noise",
    description: "For decision-makers who refuse to settle. A complete brand transformation that positioned Dr. Tozzi as the definitive authority in luxury cosmetic dentistry.",
    thumbnail: tozzi02,
    challenge: "Dr. Tozzi had exceptional clinical skills but lacked a cohesive brand identity that matched her premium positioning. Her online presence didn't reflect the caliber of her work or the exclusivity of her practice.",
    solution: "We developed a sophisticated visual identity system that communicates understated luxury. Every touchpoint—from editorial photography to social content—was crafted to attract high-net-worth patients who value discretion and excellence.",
    results: [
      "3x increase in high-value case inquiries",
      "Complete brand identity system delivered in 45 days",
      "Consistent content pipeline generating 150k+ monthly impressions",
      "Featured in 2 major dental publications"
    ],
    services: ["Brand Strategy", "Visual Identity", "Content System", "Editorial Photography", "Social Management"],
    timeline: "45-day build + ongoing management",
    examples: [
      { type: "image", label: "Brand Campaign", src: tozzi01 },
      { type: "image", label: "Identity Portrait", src: tozzi02 },
      { type: "image", label: "Brand Manifesto", src: tozzi03 },
      { type: "image", label: "Lifestyle Campaign", src: tozzi04 },
      { type: "image", label: "Brand System", src: tozzi05 },
      { type: "image", label: "Brand Book", src: tozzi06 },
      { type: "image", label: "Social Content", src: tozzi07 },
      { type: "image", label: "Visual Identity", src: tozzi08 },
      { type: "image", label: "Editorial Portrait", src: tozzi09 },
      { type: "image", label: "Brand Expression", src: tozzi10 },
    ],
  },
  {
    id: 2,
    slug: "onlyfangs",
    name: "OnlyFangs",
    tagline: "Bold, unapologetic dental content",
    description: "Commands attention and builds authority. A breakthrough brand that redefined what dental content could look like—sharp, confident, and impossible to ignore.",
    thumbnail: onlyfangs01,
    challenge: "The dental content space was saturated with generic, clinical imagery. OnlyFangs needed a distinctive voice that would cut through the noise and establish immediate brand recognition.",
    solution: "We created a bold visual language that breaks every convention. High-contrast imagery, provocative copy, and a fearless aesthetic that positions OnlyFangs as the anti-corporate voice in dentistry.",
    results: [
      "500k+ social following built from zero",
      "Viral content generating 2M+ monthly reach",
      "Brand partnership inquiries from major dental suppliers",
      "Industry recognition as a content innovator"
    ],
    services: ["Brand Positioning", "Visual Identity", "Content Strategy", "Social Campaigns", "Brand Guidelines"],
    timeline: "45-day build + ongoing management",
    examples: [
      { type: "image", label: "Brand Identity", src: onlyfangs01 },
      { type: "image", label: "Visual System", src: onlyfangs02 },
      { type: "image", label: "Content Strategy", src: onlyfangs03 },
      { type: "image", label: "Social Campaign", src: onlyfangs04 },
      { type: "image", label: "Brand Assets", src: onlyfangs05 },
      { type: "image", label: "Editorial Design", src: onlyfangs06 },
      { type: "image", label: "Brand Expression", src: onlyfangs07 },
      { type: "image", label: "Visual Identity", src: onlyfangs08 },
      { type: "image", label: "Content Design", src: onlyfangs09 },
      { type: "image", label: "Brand System", src: onlyfangs10 },
    ],
  },
  {
    id: 3,
    slug: "dr-serena-wong",
    name: "Dr. Serena Wong",
    tagline: "Quiet confidence, beautifully expressed",
    description: "Cosmetic dentistry with understated elegance. Precision and aesthetics meet at the intersection of clinical excellence and high-end brand narrative.",
    thumbnail: serena03,
    challenge: "Dr. Wong's exceptional work spoke for itself clinically, but her brand presence didn't capture the refined sensibility that defined her practice. She needed an identity as precise as her technique.",
    solution: "We developed an editorial brand approach that emphasizes craft and attention to detail. Clean typography, architectural photography, and a muted palette that whispers luxury rather than shouting it.",
    results: [
      "Premium patient inquiries increased 200%",
      "Complete storefront and environmental branding",
      "Cohesive print and digital collateral system",
      "Recognized as a top aesthetic practice in the region"
    ],
    services: ["Brand Strategy", "Environmental Design", "Typography System", "Print Collateral", "Visual Identity"],
    timeline: "45-day build + ongoing management",
    examples: [
      { type: "image", label: "Storefront Branding", src: serena01 },
      { type: "image", label: "Window Display", src: serena02 },
      { type: "image", label: "Brand Identity", src: serena03 },
      { type: "image", label: "Typography System", src: serena04 },
      { type: "image", label: "Print Collateral", src: serena05 },
      { type: "image", label: "Brand Book", src: serena06 },
      { type: "image", label: "Logo Application", src: serena07 },
      { type: "image", label: "Brand Overview", src: serena08 },
      { type: "image", label: "Visual Identity", src: serena09 },
      { type: "image", label: "Brand System", src: serena10 },
    ],
  },
  {
    id: 4,
    slug: "the-face-institute",
    name: "The Face Institute",
    tagline: "Where artistry meets science",
    description: "A new brand showcase is being prepared. Check back soon for the full reveal of this transformative brand journey.",
    thumbnail: brand04_01,
    challenge: "Details coming soon as this brand transformation is currently in progress.",
    solution: "A comprehensive brand infrastructure build that will set a new standard for aesthetic practice positioning.",
    results: [
      "Full case study coming soon",
      "Brand launch in progress",
      "Results to be published post-launch"
    ],
    services: ["Brand Strategy", "Visual Identity", "Content System", "Launch Campaign"],
    timeline: "45-day build (in progress)",
    examples: [
      { type: "image", label: "Brand Identity", src: brand04_01 },
      { type: "image", label: "Visual System", src: brand04_02 },
      { type: "image", label: "Brand Campaign", src: brand04_03 },
      { type: "image", label: "Content Strategy", src: brand04_04 },
      { type: "image", label: "Brand Assets", src: brand04_05 },
      { type: "image", label: "Editorial Design", src: brand04_06 },
      { type: "image", label: "Brand Expression", src: brand04_07 },
      { type: "image", label: "Visual Identity", src: brand04_08 },
      { type: "image", label: "Brand System", src: brand04_09 },
    ],
  },
];

export const getBrandBySlug = (slug: string): BrandCaseStudy | undefined => {
  return brands.find(brand => brand.slug === slug);
};
