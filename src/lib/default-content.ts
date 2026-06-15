import heroCommercial from "@/assets/hero-commercial.jpg";
import heroIndustrial from "@/assets/hero-industrial.jpg";
import heroResidential from "@/assets/hero-residential.jpg";
import {
  fallbackGoogleReviewTestimonials,
  fallbackGoogleReviewUrl,
} from "../../shared/google-review-fallback";

export type CompanyProfile = {
  name: string;
  shortName: string;
  yearEstablished: number;
  phone: string;
  alternatePhone?: string;
  email: string;
  notificationsEmail: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  mapEmbedUrl: string;
  footerBlurb: string;
  googleReviewUrl?: string;
};

export type AboutPageContent = {
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
};

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
};

export type ContactPageContent = {
  bannerTitle: string;
  bannerSubtitle: string;
  infoTitle: string;
  formTitle: string;
  puneTitle: string;
  puneSubtitle: string;
};

export type ProjectItem = {
  id?: number;
  title: string;
  location: string;
  capacity: string;
  co2Savings: string;
  category: string;
  description?: string;
  imageUrl?: string;
  sortOrder?: number;
  isFeatured?: boolean;
  isPublished?: boolean;
};

export type BlogPostItem = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl?: string;
  publishedAt?: string;
  readTime?: string;
  sortOrder?: number;
  isFeatured?: boolean;
  isPublished?: boolean;
};

export type TestimonialItem = {
  id?: number;
  sourceId?: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  initials?: string;
  imageUrl?: string;
  sortOrder?: number;
  isPublished?: boolean;
  source?: "manual" | "google";
  sourceLabel?: string;
  sourceUrl?: string;
  reviewedAt?: string;
  replyText?: string;
};

export type PublicContent = {
  companyProfile: CompanyProfile;
  aboutPage: AboutPageContent;
  contactPage: ContactPageContent;
  socialLinks: SocialLinks;
  projects: ProjectItem[];
  blogPosts: BlogPostItem[];
  testimonials: TestimonialItem[];
};

const defaultManualTestimonials: TestimonialItem[] = [
  {
    name: "Rajesh Kumar",
    role: "Homeowner, Pune",
    text: "Suntech installed a 5kW system on our rooftop. Our electricity bill dropped dramatically and the team was excellent to work with.",
    rating: 5,
    initials: "RK",
    sortOrder: 1,
    isPublished: true,
    source: "manual",
    sourceLabel: "Customer Review",
  },
  {
    name: "Priya Sharma",
    role: "Business Owner, Mumbai",
    text: "The ROI has been phenomenal. We recovered our investment quickly and now enjoy major long-term savings.",
    rating: 5,
    initials: "PS",
    sortOrder: 2,
    isPublished: true,
    source: "manual",
    sourceLabel: "Customer Review",
  },
  {
    name: "Amit Patel",
    role: "Factory Manager, Nashik",
    text: "Professional team, strong product quality, and dependable after-sales support throughout the project.",
    rating: 5,
    initials: "AP",
    sortOrder: 3,
    isPublished: true,
    source: "manual",
    sourceLabel: "Customer Review",
  },
];

export const defaultCompanyProfile: CompanyProfile = {
  name: "SUNTECH GREEN ENERGY SOLAR",
  shortName: "SUNTECH",
  yearEstablished: 2020,
  phone: "+91 7387085530",
  alternatePhone: "+91 7020405530",
  email: "suntechgreenes@gmail.com",
  notificationsEmail: "suntechgreenes@gmail.com",
  whatsapp: "+91 7387085530",
  address:
    "Manjari Farm, Solapur - Pune Hwy, behind MAHALAXMI FORCE MOTORS, Shewalewadi, Pune, Maharashtra 412307",
  workingHours: "Mon-Sat: 9:00 AM - 6:00 PM",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Manjari%20Farm%2C%20Solapur%20-%20Pune%20Hwy%2C%20behind%20MAHALAXMI%20FORCE%20MOTORS%2C%20Shewalewadi%2C%20Pune%2C%20Maharashtra%20412307&output=embed",
  footerBlurb:
    "Established in 2020, SUNTECH GREEN ENERGY SOLAR delivers reliable residential, commercial, and industrial solar solutions across Pune and surrounding regions.",
  googleReviewUrl: fallbackGoogleReviewUrl,
};

export const defaultAboutPage: AboutPageContent = {
  storyTitle: "Solar Excellence Since 2020",
  storyParagraph1:
    "Founded in 2020, SUNTECH GREEN ENERGY SOLAR has been helping homes, businesses, and industrial clients transition to dependable solar energy solutions with a practical, service-first approach.",
  storyParagraph2:
    "Our mission is simple: make clean, affordable solar energy accessible to every home and business through honest guidance, quality execution, and long-term support.",
};

export const defaultSocialLinks: SocialLinks = {
  facebook: "",
  instagram: "",
  linkedin: "",
  youtube: "",
};

export const defaultContactPage: ContactPageContent = {
  bannerTitle: "Contact Us",
  bannerSubtitle: "Get in touch with our solar experts",
  infoTitle: "Get In Touch",
  formTitle: "Send Us a Message",
  puneTitle: "Pune Rooftop Solar Snapshot",
  puneSubtitle:
    "Quick overview for Pune homeowners based on publicly available market benchmarks and subsidy-aligned residential estimates.",
};

export const defaultProjects: ProjectItem[] = [
  {
    title: "Manjari Residential Rooftop, Pune",
    location: "Shewalewadi, Pune, MH",
    capacity: "10 kW",
    co2Savings: "15T/yr",
    category: "Residential",
    description: "Residential rooftop solar installation with savings-focused design and clean execution.",
    imageUrl: "/assets/project/DJI_20250609152806_0157_D.JPG.jpeg",
    sortOrder: 1,
    isFeatured: true,
    isPublished: true,
  },
  {
    title: "Manjari Green Ph 4, Hadapsar",
    location: "Hadapsar, Pune, MH",
    capacity: "300 kW",
    co2Savings: "450T/yr",
    category: "Industrial",
    description: "Manjari Green Ph 4 Manjari CHS, Hadapsar, Pune",
    imageUrl: "/assets/project/DJI_20250609153027_0162_D.JPG.jpeg",
    sortOrder: 2,
    isFeatured: true,
    isPublished: true,
  },
  {
    title: "Manjari Green Phase 5, Hadapsar",
    location: "Hadapsar, Pune, MH",
    capacity: "1 MW",
    co2Savings: "1500T/yr",
    category: "Rooftop",
    description: "Manjari Green Phase 5 Co-Operative Housing Society, Hadapsar, Pune",
    imageUrl: "/assets/project/DJI_20250609154417_0168_D.JPG.jpeg",
    sortOrder: 3,
    isFeatured: true,
    isPublished: true,
  },
];

export const defaultBlogPosts: BlogPostItem[] = [
  {
    title: "How to Plan a Rooftop Solar System That Pays Back Faster",
    slug: "plan-rooftop-solar-system-faster-payback",
    excerpt:
      "A practical guide to matching system size, bill patterns, subsidy eligibility, and installation quality before you invest in rooftop solar.",
    content:
      "Start with your electricity bill, available rooftop area, shade-free hours, and long-term energy goals. A good solar plan balances monthly savings with safe structure, reliable equipment, and after-sales support.",
    category: "Solar Planning",
    imageUrl: "default:hero-commercial",
    publishedAt: "2026-06-05",
    readTime: "5 min read",
    sortOrder: 1,
    isFeatured: true,
    isPublished: true,
  },
  {
    title: "Residential Solar Subsidy Checklist for Homeowners",
    slug: "residential-solar-subsidy-checklist",
    excerpt: "Know the documents, site details, and practical checks that make the subsidy process smoother.",
    content:
      "Keep your electricity bill, consumer number, identity details, bank details, and rooftop photos ready before starting the subsidy process. Eligibility and final subsidy depend on applicable government rules.",
    category: "Subsidy",
    imageUrl: "default:hero-residential",
    publishedAt: "2026-05-28",
    readTime: "4 min read",
    sortOrder: 2,
    isFeatured: false,
    isPublished: true,
  },
  {
    title: "What Happens During a Professional Solar Site Visit",
    slug: "professional-solar-site-visit",
    excerpt: "From shadow checks to roof strength, here is what a good solar team reviews before final design.",
    content:
      "A site visit checks shade, structure, cable routing, inverter placement, safety access, and expected generation. These checks help avoid surprises during installation.",
    category: "Process",
    imageUrl: "default:hero-industrial",
    publishedAt: "2026-05-22",
    readTime: "3 min read",
    sortOrder: 3,
    isFeatured: false,
    isPublished: true,
  },
];

export const defaultTestimonials: TestimonialItem[] = [
  ...fallbackGoogleReviewTestimonials.map((item) => ({ ...item })),
  ...defaultManualTestimonials,
];

export const defaultPublicContent: PublicContent = {
  companyProfile: defaultCompanyProfile,
  aboutPage: defaultAboutPage,
  contactPage: defaultContactPage,
  socialLinks: defaultSocialLinks,
  projects: defaultProjects,
  blogPosts: defaultBlogPosts,
  testimonials: defaultTestimonials,
};

const defaultImageMap: Record<string, string> = {
  "default:hero-residential": heroResidential,
  "default:hero-commercial": heroCommercial,
  "default:hero-industrial": heroIndustrial,
};

export const resolveContentImageUrl = (imageUrl?: string) => {
  if (!imageUrl) {
    return heroResidential;
  }

  return defaultImageMap[imageUrl] ?? imageUrl;
};
