export type CommunityLogo = {
  src: string;
  darkSrc?: string;
  alt: string;
  width?: number;
  height?: number;
};

// Logos shown in the Communities & Clubs grid, in grid order.
export const communityLogos: CommunityLogo[] = [
  { src: "/gdg.png", darkSrc: "/darkgdg.png", alt: "GDG - Google Developer Groups" },
  { src: "/10.8.8.webp", alt: "10.8.8 Community" },
  { src: "/icp.webp", darkSrc: "/darkicp.png", alt: "Sahara ICP Hubs" },
  { src: "/awscloud.png", darkSrc: "/darkaws.png", alt: "AWS Cloud Clubs" },
  { src: "/3mtt.webp", darkSrc: "/dark3mtt.png", alt: "3MTT" },
  { src: "/encode.png", darkSrc: "/darkencode.png", alt: "Encode Club" },
  { src: "/suioncampus.png", alt: "Sui On Campus" },
  { src: "/windows.png", alt: "Windows on America" },
  { src: "/DSN.webp", alt: "DSN" },
  { src: "/nihuhlight.jpg", darkSrc: "/nihubdark.jpg", alt: "NiHub" },
];
