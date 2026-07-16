export type PackageType = "starter" | "growth" | "platinum";

export type Addon = {
  name: string;
  price: number;
};

export type Package = {
  id: PackageType;
  name: string;
  price: number;
  description: string;
  features: string[];
  addons: Addon[];
  highlight?: boolean;
};

export const packages: Package[] = [
  {
    id: "starter",
    name: "Starter Package",
    price: 99,
    description: "Perfect for new businesses getting started",
    features: [
      "Business registration support",
      "Basic compliance guidance",
      "Essential documentation",
      "Email support",
    ],
    addons: [
      { name: "Office address support", price: 350 },
      { name: "Mentorship coordination", price: 99 },
    ],
  },
  {
    id: "growth",
    name: "Growth Package",
    price: 129,
    description: "For businesses ready to scale operations",
    features: [
      "Full Business Registration",
      "Advanced Compliance Guidance",
      "Complete Documentation Suite",
      "Priority Support",
      "Quarterly Progress Reviews",
    ],
    addons: [
      { name: "International registration", price: 750 },
      { name: "Trademark Support", price: 500 },
      { name: "Office address Support", price: 350 },
      { name: "Mentorship Coordination", price: 99 },
    ],
    highlight: true,
  },
  {
    id: "platinum",
    name: "Platinum Package",
    price: 149,
    description: "Comprehensive support for ambitious ventures",
    features: [
      "Enterprise Registration Support",
      "Full Compliance Management",
      "Premium Documentation",
      "Dedicated Account Manager",
      "Monthly Strategic Reviews",
      "Partner Network Access",
    ],
    addons: [
      { name: "International registration", price: 750 },
      { name: "Trademark Support", price: 500 },
      { name: "Office & Virtual address Support", price: 350 },
      { name: "Executive Mentorship", price: 99 },
    ],
  },
];