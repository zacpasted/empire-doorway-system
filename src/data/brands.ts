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

// Nav Atwal images
import nav01 from "@/assets/brands/nav-atwal/showcase-01.jpeg";
import nav02 from "@/assets/brands/nav-atwal/showcase-02.jpeg";
import nav03 from "@/assets/brands/nav-atwal/showcase-03.jpeg";
import nav04 from "@/assets/brands/nav-atwal/showcase-04.jpeg";
import nav05 from "@/assets/brands/nav-atwal/showcase-05.jpeg";
import nav06 from "@/assets/brands/nav-atwal/showcase-06.jpeg";
import nav07 from "@/assets/brands/nav-atwal/showcase-07.jpeg";
import nav08 from "@/assets/brands/nav-atwal/showcase-08.jpeg";
import nav09 from "@/assets/brands/nav-atwal/showcase-09.jpeg";
import nav10 from "@/assets/brands/nav-atwal/showcase-10.jpeg";

// Jake Bateman - using player card as showcase
import jakeBateman from "@/assets/cards/jake-bateman.jpeg";

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
    slug: "dr-vik-ravoory",
    name: "Dr. Vik Ravoory",
    tagline: "Brand Creation & Career Inflection",
    description: "Vik entered the process as a young associate with ambition, clinical promise, and the same uncertainty most early-career dentists face: no clear differentiation, no narrative ownership, and no framework for long-term leverage.",
    thumbnail: brand04_01,
    challenge: "Like many associates, Vik was doing everything 'right' on paper, yet felt invisible in practice. No clear differentiation, no narrative ownership, and no framework for long-term leverage defined his early career trajectory.",
    solution: "The early work focused not on exposure, but on foundation. Identity, voice, values, and long-term direction were clarified before a single piece of content mattered. There were real growing pains—iterations that didn't land, moments of doubt, recalibration of tone and positioning—but that friction was essential. The brand wasn't manufactured; it was built. As clarity emerged, confidence followed. Vik stopped trying to fit into existing molds and began operating from authorship.",
    results: [
      "Intentional, coherent brand identity established",
      "Credible positioning in the market",
      "Control over career trajectory",
      "Accelerated momentum with stronger perception and clearer opportunities"
    ],
    services: ["Brand Architecture", "Identity Development", "Voice & Values Clarification", "Content Strategy", "Career Positioning"],
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
  {
    id: 5,
    slug: "dr-nav-atwal",
    name: "Dr. Nav Atwal",
    tagline: "A Rock Star in the Making",
    description: "Dr. Nav Atwal now lives and practices in Miami—a city where taste, visibility, and cultural relevance are non-negotiable. His trajectory is unmistakable. He's not just becoming well known—he's becoming unavoidable.",
    thumbnail: nav01,
    challenge: "Dr. Atwal's first brand identity was designed to feel different, to stand out in a sea of sameness. And it did. But as he stepped into the next stage of his journey—redefining what cosmetic dentistry means—his brand needed to rise with him. The challenge was to keep the individuality and freshness that define Dr. Atwal while elevating the brand to mirror the sophistication, artistry, and luxury of the services he delivers.",
    solution: "By blending serif character with sans-serif clarity, the ATWAL wordmark was crafted from the ground up to feel both distinctive and refined. It reflects Dr. Atwal's individuality while projecting elegance, confidence, and quality. The identity balances playfulness with professionalism—setting a new tone for his brand. With the right foundation, positioning, and narrative in place, Nav is building toward something far bigger than a practice.",
    results: [
      "Complete brand identity system elevating his practice to Miami standards",
      "Distinctive wordmark balancing individuality with elegance",
      "Positioning as a cultural operator, not just a clinician",
      "Trajectory toward becoming unavoidable in the market"
    ],
    services: ["Brand Strategy", "Visual Identity", "Wordmark Design", "Brand Architecture", "Cultural Positioning"],
    timeline: "45-day build + ongoing management",
    examples: [
      { type: "image", label: "Brand Identity", src: nav01 },
      { type: "image", label: "ATWAL Wordmark", src: nav02 },
      { type: "image", label: "Brand Mark", src: nav03 },
      { type: "image", label: "NAV Logo", src: nav04 },
      { type: "image", label: "Logo System", src: nav05 },
      { type: "image", label: "Typography", src: nav06 },
      { type: "image", label: "Social Content", src: nav07 },
      { type: "image", label: "Patient Materials", src: nav08 },
      { type: "image", label: "Brand Campaign", src: nav09 },
      { type: "image", label: "Visual System", src: nav10 },
    ],
  },
  {
    id: 6,
    slug: "dr-jake-bateman",
    name: "Dr. Jake Bateman",
    tagline: "The Making of a Modern Authority",
    description: "Dr. Jake Bateman is not building a brand to be noticed. He's building one to last. As lead associate at Nashville Aesthetic Dentistry, working under the legendary Dr. Dennis Wells, Jake operates at the highest level of cosmetic dentistry every day.",
    thumbnail: jakeBateman,
    challenge: "Jake understood something most dentists don't realize until it's too late: clinical excellence is table stakes. Authority is built through authorship. Through clarity. Through standing for something distinct in a world full of replicas. While many practitioners chase visibility, Jake needed a brand focused on trajectory—every decision intentional, every signal considered.",
    solution: "Braver is not an alter ego—it's an extension of how Jake practices: confident, exacting, and culturally fluent. Treating world-class artists has sharpened his understanding of trust, discretion, and presence. The same qualities that keep him indispensable in elite circles are the ones shaping his brand. Nothing loud. Nothing borrowed. Nothing accidental. This is not the story of someone trying to 'make a name.' It's the story of someone preparing to own a lane.",
    results: [
      "Brand architecture built for long-term trajectory, not short-term visibility",
      "Positioned as ascending authority in elite cosmetic dentistry",
      "Cultural fluency integrated into brand identity",
      "Foundation for sustainable, lasting market presence"
    ],
    services: ["Brand Strategy", "Visual Identity", "Authority Positioning", "Cultural Alignment", "Content Architecture"],
    timeline: "45-day build + ongoing management",
    examples: [
      { type: "image", label: "Brand Identity", src: jakeBateman },
    ],
  },
];

export const getBrandBySlug = (slug: string): BrandCaseStudy | undefined => {
  return brands.find((brand) => brand.slug === slug);
};
