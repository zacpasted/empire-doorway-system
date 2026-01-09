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
    name: "Only Fangs™",
    tagline: "Momentum → Monetized Brand",
    description: "Operating out of Las Vegas Smile Suite, Tom was already creating buzz through personality, clinical work, and cultural relevance. The problem was not attention—it was structure. Only Fangs™ was built to turn momentum into a scalable, monetizable brand.",
    thumbnail: onlyfangs01,
    challenge: "Tom had attention and cultural relevance, but lacked structure. The momentum was real but scattered—no framework to turn buzz into a scalable, monetizable brand that could grow independently.",
    solution: "The work centered on sharpening the concept, elevating the aesthetic, and building a narrative strong enough to sustain demand beyond novelty. What emerged was a clearly defined brand extension that transformed scattered interest into intentional engagement, opened new revenue pathways, and positioned Tom as more than a clinician—he became a cultural operator with a brand that could grow independently of geography.",
    results: [
      "Brand scalable independent of geography",
      "New revenue pathways through monetized brand extension",
      "Positioned as cultural operator, not just clinician",
      "Transformed scattered attention into intentional engagement"
    ],
    services: ["Brand Positioning", "Visual Identity", "Content Strategy", "Brand Architecture", "Monetization Framework"],
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
    tagline: "Invisible Excellence → Recognized Authority",
    description: "Serena's challenge was never quality—it was visibility aligned with her standards. The brand work focused on refinement, coherence, and authorship rather than amplification.",
    thumbnail: serena03,
    challenge: "Serena had excellence but lacked visibility aligned with her standards. Her brand demanded more from her than it gave back, requiring compromises that didn't reflect her level of care and intention.",
    solution: "By distilling her voice, values, and visual language into a unified identity, the brand began to work for her instead of demanding more from her. The result was stronger inbound alignment, greater confidence in communication, and a brand that reflected her level of care and intention.",
    results: [
      "Unified identity across voice, values, and visual language",
      "Stronger inbound alignment with ideal patients",
      "Professional presence that feels unmistakably her own",
      "Fewer compromises, clearer demand"
    ],
    services: ["Brand Refinement", "Visual Identity", "Voice Development", "Content Strategy", "Authority Positioning"],
    timeline: "45-day build + ongoing management",
    examples: [
      { type: "image", label: "Brand Portrait", src: serena01 },
      { type: "image", label: "Visual Identity", src: serena02 },
      { type: "image", label: "Editorial Design", src: serena03 },
      { type: "image", label: "Content System", src: serena04 },
      { type: "image", label: "Brand Assets", src: serena05 },
      { type: "image", label: "Social Content", src: serena06 },
      { type: "image", label: "Brand Expression", src: serena07 },
      { type: "image", label: "Visual System", src: serena08 },
      { type: "image", label: "Content Design", src: serena09 },
      { type: "image", label: "Brand Campaign", src: serena10 },
    ],
  },
  {
    id: 4,
    slug: "the-face-institute",
    name: "The Face Institute",
    tagline: "Where artistry meets precision",
    description: "Advanced facial aesthetics for the discerning patient. A comprehensive brand identity that positions the practice at the intersection of medical excellence and artistic vision.",
    thumbnail: brand04_01,
    challenge: "The Face Institute needed to differentiate itself in a crowded facial aesthetics market while maintaining clinical credibility. The brand had to appeal to both referral partners and high-end consumers.",
    solution: "We created a dual-audience brand strategy that speaks to professional peers while captivating affluent patients. The visual language balances clinical precision with artistic sophistication.",
    results: [
      "Established as a premier destination for complex cases",
      "Strong referral network from other practitioners",
      "Waiting list for new patient consultations",
      "Recognition in both medical and lifestyle publications"
    ],
    services: ["Brand Strategy", "Visual Identity", "Dual-Audience Messaging", "Editorial Content", "Professional Positioning"],
    timeline: "45-day build + ongoing management",
    examples: [
      { type: "image", label: "Brand Identity", src: brand04_01 },
      { type: "image", label: "Visual System", src: brand04_02 },
      { type: "image", label: "Editorial Direction", src: brand04_03 },
      { type: "image", label: "Content Strategy", src: brand04_04 },
      { type: "image", label: "Brand Assets", src: brand04_05 },
      { type: "image", label: "Social Content", src: brand04_06 },
      { type: "image", label: "Brand Expression", src: brand04_07 },
      { type: "image", label: "Visual Identity", src: brand04_08 },
      { type: "image", label: "Brand Campaign", src: brand04_09 },
    ],
  },
];

export const getBrandBySlug = (slug: string): BrandCaseStudy | undefined => {
  return brands.find((brand) => brand.slug === slug);
};
