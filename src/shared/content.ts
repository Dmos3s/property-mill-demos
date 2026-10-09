// Shared copy and data for every Property Mill demo.
// Source: propertymill.com (Hans approved reuse of layout and information), tightened for the web.
// Rule: no em dashes anywhere in client-facing copy.

export const BASE = import.meta.env.BASE_URL;
export const asset = (path: string) => `${BASE}${path.replace(/^\//, "")}`;

export const brand = {
  name: "Property Mill",
  fullName: "Property Mill Real Estate Group",
  tagline: "Colorado Springs Property Management & Real Estate",
  phone: "(719) 591-6200",
  phoneHref: "tel:+17195916200",
  email: "info@propertymill.com",
  emailHref: "mailto:info@propertymill.com",
  address1: "4040 East Bijou Street, Suite 100",
  address2: "Colorado Springs, CO 80909",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=4040+East+Bijou+Street+Suite+100+Colorado+Springs+CO+80909",
  hours: [
    { days: "Monday to Friday", time: "9:00 AM to 4:00 PM" },
    { days: "Saturday and Sunday", time: "By appointment" },
  ],
  directions:
    "Enter the business park through the west gate and continue straight to the turn after the second building on the right. Look for the Property Mill sign in the southwest corner, park, and find our office immediately to your right inside.",
  facebook: "https://www.facebook.com/propertymill/",
  linkedin: "https://www.linkedin.com/in/hansrosielle/",
  appfolio: "https://www.propertymill.com/appfolio/",
  logo: {
    color: asset("brand/logo-color.png"),
    white: asset("brand/logo-white.png"),
    mark: asset("brand/mark.png"),
    markWhite: asset("brand/mark-white.png"),
    wordmark: asset("brand/wordmark.png"),
    wordmarkWhite: asset("brand/wordmark-white.png"),
  },
};

export const nav = [
  { label: "Property Management", href: "#property-management" },
  { label: "Buying", href: "#buying" },
  { label: "Selling", href: "#selling" },
  { label: "Areas", href: "#areas" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Independently owned. Locally operated. Since 2001.",
  headline: "Colorado Springs property management and real estate, done with integrity.",
  sub: "Property Mill delivers fixed-rate property management and full-service real estate across Colorado Springs, Monument, Fountain, Falcon and Manitou Springs. Honest, straightforward guidance from a team that lives here.",
  primaryCta: "Schedule a consultation",
  secondaryCta: "View available properties",
};

export const stats = [
  { value: 2001, prefix: "Since ", suffix: "", label: "in Pikes Peak real estate" },
  { value: 20, prefix: "", suffix: "+", label: "years of broker experience" },
  { value: 0, prefix: "$", suffix: "", label: "application fees for tenants" },
  { value: 2, prefix: "", suffix: "", label: "counties served: El Paso and Teller" },
];

export type Service = {
  id: string;
  title: string;
  short: string;
  body: string;
  bullets: string[];
  image: string;
  video?: string;
};

export const services: Service[] = [
  {
    id: "property-management",
    title: "Residential Property Management",
    short: "Fixed-rate care for single-family homes, condos and multi-family rentals.",
    body: "Your rental is a serious investment. Protecting it takes expertise, responsiveness and transparent communication. Property Mill manages residential rentals across El Paso County with a fixed-rate fee structure that gives owners predictable costs and peace of mind.",
    bullets: [
      "Fixed-rate fees, not a percentage of rent",
      "Professional tenant screening and placement",
      "Rent collection and detailed financial reporting",
      "Regular inspections, maintenance coordination and lease enforcement",
    ],
    image: asset("media/photo/interior-living.jpg"),
    video: asset("media/video/home-office.mp4"),
  },
  {
    id: "commercial",
    title: "Commercial Property Management",
    short: "Office, warehouse and retail managed with the same commitment.",
    body: "We currently manage office, warehouse and retail spaces, providing professional lease management, tenant relations, facility maintenance coordination and financial oversight tailored to commercial real estate.",
    bullets: [
      "Lease management and tenant relations",
      "Facility maintenance and vendor coordination",
      "Financial oversight and detailed reporting",
      "Fixed-rate pricing for predictable costs",
    ],
    image: asset("media/photo/cs-skyline.jpg"),
  },
  {
    id: "buying",
    title: "Buying a Home",
    short: "Expert guidance for first-time buyers, military families and relocating professionals.",
    body: "From pre-approval to closing day, Property Mill agents explain financing options, evaluate properties objectively and negotiate effectively. Full Pikes Peak MLS access gives you complete visibility into homes across the region.",
    bullets: [
      "First-time buyer guidance and lender connections",
      "VA loans and military buyers near Fort Carson and Peterson",
      "Relocation resources on neighborhoods, schools and commutes",
      "Your timeline, not ours. No pressure, ever",
    ],
    image: asset("media/photo/home-exterior.jpg"),
  },
  {
    id: "selling",
    title: "Selling Your Home",
    short: "Strategic pricing, professional marketing and skilled negotiation.",
    body: "Selling in Colorado Springs takes strategic pricing, multi-platform marketing and experienced negotiation. We protect your interests from listing to closing and help you maximize your equity in today's market.",
    bullets: [
      "Free market analysis using recent comparable sales",
      "Professional marketing across multiple platforms",
      "Expert negotiation on offers, inspections and appraisals",
      "Full-service support from listing to closing",
    ],
    image: asset("media/photo/cs-homes-skyline.jpg"),
  },
];

export const propertyManagement = {
  eyebrow: "Our specialty",
  title: "Fixed-rate property management in Colorado Springs",
  body: "Unlike percentage-based management companies, Property Mill uses a transparent, tiered fixed-rate fee structure for residential properties. You know exactly what you will owe each month. No surprises and no hidden fees, with detailed monthly statements and complete financial transparency.",
  included: [
    "Professional tenant screening",
    "Rent collection and financial reporting",
    "Regular property inspections",
    "Lease renewals and enforcement",
    "Eviction handling when necessary",
    "Online owner portal access",
  ],
  process: [
    { step: "01", title: "Free rental analysis", body: "A comprehensive look at your property's rental potential and the right price for today's market." },
    { step: "02", title: "Prepare and market", body: "We get the property ready and market it to attract quality tenants quickly." },
    { step: "03", title: "Screen and place", body: "Qualified tenants who meet our strict criteria. No application fees, so good renters apply." },
    { step: "04", title: "Ongoing management", body: "Rent, maintenance, inspections and reporting handled, so you enjoy the income without the landlord work." },
  ],
  cta: "Contact us for pricing details",
};

export const cantSell = {
  eyebrow: "We can help",
  title: "Can't sell your Colorado Springs home? Turn it into a rental.",
  body: "Many homeowners face tough decisions when a property will not sell. Before considering foreclosure or selling at a loss, consider converting your home into a rental investment. Property Mill handles the entire transition.",
  bullets: [
    "Avoid foreclosure and protect your credit",
    "Cover the mortgage, taxes and maintenance while preserving equity",
    "Wait for better market conditions and build long-term income",
    "We handle tenants and maintenance at a fixed monthly rate",
  ],
  cta: "Get a free consultation",
  image: asset("media/photo/owner-table.jpg"),
};

export type Area = { name: string; blurb: string; image: string; tag: string };

export const areas: Area[] = [
  {
    name: "Colorado Springs",
    tag: "Primary service area",
    blurb: "The heart of our business. From Old Colorado City to the growing southeast corridor, we know the neighborhoods, market trends and opportunities across the city.",
    image: asset("media/photo/cs-homes-skyline.jpg"),
  },
  {
    name: "Monument, Fountain & Falcon",
    tag: "Growing communities",
    blurb: "Monument offers a small-town feel north of the city. Fountain and Falcon offer more affordable options with strong appeal to military families and first-time buyers.",
    image: asset("media/photo/palmer-sunrise-2.jpg"),
  },
  {
    name: "Manitou Springs",
    tag: "Historic and one of a kind",
    blurb: "Historic charm, tourism influence and a mountain lifestyle create a specialized market. Our team understands these distinctive properties.",
    image: asset("media/photo/manitou.jpg"),
  },
  {
    name: "Woodland Park & Teller County",
    tag: "Mountain living",
    blurb: "Expert guidance for buying and selling in Woodland Park and Teller County, where you can enjoy a true Colorado mountain experience.",
    image: asset("media/photo/woodland.jpg"),
  },
  {
    name: "Old Colorado City",
    tag: "Westside character",
    blurb: "Historic storefronts, walkable streets and classic homes a few minutes from downtown and Garden of the Gods.",
    image: asset("media/photo/occ-broadway.jpg"),
  },
];

export const why = {
  eyebrow: "Why choose us",
  title: "Relationships, not transactions.",
  body: "Property Mill stands apart from large franchise brokerages through integrity, honest communication and putting client needs first.",
  pillars: [
    {
      title: "Integrity and a client-first approach",
      body: "Hans Rosielle founded Property Mill on honesty and ethical business practices. Transparent communication, realistic expectations and guidance you can trust. You will always know where you stand.",
      icon: "ShieldCheck",
    },
    {
      title: "Residential and commercial expertise",
      body: "From selling homes to managing commercial buildings, our versatility gives clients comprehensive options across every property type.",
      icon: "Building2",
    },
    {
      title: "Independently owned and locally operated",
      body: "As an independent brokerage we serve clients on their timeline without corporate pressure. We are invested in Colorado Springs and in long-term relationships.",
      icon: "MapPinned",
    },
  ],
};

export const testimonial = {
  quote:
    "This office is exceptionally well run. From the experienced leadership to the cohesive teamwork found among their agents, I would never hesitate to work with them or refer them. This is an excellent office with highly skilled and professional REALTORS.",
  name: "Scott Sufak",
  role: "Google review",
  avatar: asset("media/photo/reviewer-scott.jpg"),
};

export const partners = [
  { name: "Mikey's Total Car Care", logo: asset("media/photo/partner-mikeys.jpg") },
  { name: "Bryan Construction", logo: asset("media/photo/partner-bryan.jpg") },
  { name: "Elder Construction", logo: asset("media/photo/partner-elder.jpg") },
];

export type Person = { name: string; role: string; bio: string; email?: string; initials: string; featured?: boolean; facts?: string[] };

export const team: Person[] = [
  {
    name: "Hans Rosielle",
    role: "Broker and Owner",
    initials: "HR",
    featured: true,
    bio: "Hans brings extensive experience in residential and commercial property management and real estate sales. Before moving into real estate in 2001 he was a business relationship manager at a Dutch bank, where he developed the client-focused approach that defines Property Mill today.",
    facts: [
      "Over 20 years in the real estate industry",
      "Former Director and President of Pikes Peak MLS (Realtor Services Corp)",
      "Specializes in commercial property management and real estate sales",
    ],
    email: "hans@rosielle.net",
  },
  { name: "Roger Swann", role: "Real Estate Agent", initials: "RS", bio: "Extensive market knowledge and dedication to helping clients navigate the Colorado Springs real estate market." },
  { name: "Shelley Eaton", role: "Real Estate Agent", initials: "SE", bio: "Personalized service and expert guidance for buyers and sellers throughout the Pikes Peak region." },
  { name: "Brenda Salinas", role: "Real Estate Agent", initials: "BS", bio: "Committed to delivering exceptional results and building lasting relationships with her clients." },
  { name: "Clayton Whitney", role: "Real Estate Agent", initials: "CW", bio: "Extensive market knowledge and dedication to helping clients navigate the Colorado Springs real estate market." },
];

export const contact = {
  eyebrow: "Contact us",
  title: "Ready to get started? Let's talk.",
  body: "Whether you need property management, want to buy or sell a home, or have questions about Colorado Springs real estate, Property Mill is here to help.",
  formNote:
    "This is a design demo. On the live site this message will go straight to info@propertymill.com and the team will respond promptly.",
  interests: ["Property management", "Buying a home", "Selling my home", "Renting a property", "Something else"],
};

export const footer = {
  blurb: "Property Mill Real Estate Group delivers professional property management and comprehensive real estate services throughout Colorado Springs, Monument, Fountain, Falcon and Manitou Springs.",
  links: [
    { label: "Property Management", href: "#property-management" },
    { label: "Buying a Home", href: "#buying" },
    { label: "Selling Your Home", href: "#selling" },
    { label: "Available Properties", href: brand.appfolio, external: true },
    { label: "Contact", href: "#contact" },
  ],
  legal: `© ${new Date().getFullYear()} Property Mill Real Estate Group. Design concept by FuseHQ.`,
};

export const media = {
  video: {
    forestRidge: { src: asset("media/video/forest-ridge.mp4"), poster: asset("media/video/forest-ridge.jpg") },
    darkForest: { src: asset("media/video/dark-forest.mp4"), poster: asset("media/video/dark-forest.jpg") },
    clouds: { src: asset("media/video/clouds.mp4"), poster: asset("media/video/clouds.jpg") },
    mountainTown: { src: asset("media/video/mountain-town.mp4"), poster: asset("media/video/mountain-town.jpg") },
    homeOffice: { src: asset("media/video/home-office.mp4"), poster: asset("media/video/home-office.jpg") },
    peak: { src: asset("media/video/peak.mp4"), poster: asset("media/video/peak.jpg") },
  },
  photo: {
    gogPikes: asset("media/photo/gog-pikes.jpg"),
    gogPikes2: asset("media/photo/gog-pikes-2.jpg"),
    pikesGogWide: asset("media/photo/pikes-gog-wide.jpg"),
    csHomesSkyline: asset("media/photo/cs-homes-skyline.jpg"),
    csSkyline: asset("media/photo/cs-skyline.jpg"),
    csCity: asset("media/photo/cs-city.jpg"),
    manitou: asset("media/photo/manitou.jpg"),
    occHomes: asset("media/photo/occ-homes.jpg"),
    occBroadway: asset("media/photo/occ-broadway.jpg"),
    woodland: asset("media/photo/woodland.jpg"),
    palmerSunrise2: asset("media/photo/palmer-sunrise-2.jpg"),
    interiorLiving: asset("media/photo/interior-living.jpg"),
    homeExterior: asset("media/photo/home-exterior.jpg"),
    interiorLoft: asset("media/photo/interior-loft.jpg"),
    patioFireplace: asset("media/photo/patio-fireplace.jpg"),
    ownerLaptop: asset("media/photo/owner-laptop.jpg"),
    ownerTable: asset("media/photo/owner-table.jpg"),
    teamCoworkers: asset("media/photo/team-coworkers.jpg"),
    office1: asset("media/photo/office-1.jpg"),
    office2: asset("media/photo/office-2.jpg"),
  },
};

// Estate concept: a walkthrough of one home, exterior to view. Pexels clips, see public/media/estate/CREDITS-pexels.txt.
export const estateScenes = [
  { label: "The approach", src: asset("media/estate/approach.mp4"), poster: asset("media/estate/approach.jpg") },
  { label: "The great room", src: asset("media/estate/great-room.mp4"), poster: asset("media/estate/great-room.jpg") },
  { label: "The kitchen", src: asset("media/estate/kitchen.mp4"), poster: asset("media/estate/kitchen.jpg") },
  { label: "The hearth", src: asset("media/estate/hearth.mp4"), poster: asset("media/estate/hearth.jpg") },
  { label: "The primary suite", src: asset("media/estate/suite.mp4"), poster: asset("media/estate/suite.jpg") },
  { label: "The view", src: asset("media/estate/view.mp4"), poster: asset("media/estate/view.jpg") },
];

export const estateStills = {
  approach: asset("media/estate/stills/approach.jpg"),
  greatRoom: asset("media/estate/stills/great-room.jpg"),
  kitchen: asset("media/estate/stills/kitchen.jpg"),
  hearth: asset("media/estate/stills/hearth.jpg"),
  suite: asset("media/estate/stills/suite.jpg"),
  view: asset("media/estate/stills/view.jpg"),
};
