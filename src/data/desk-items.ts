// used for Home's desk items
import { NAV_ROUTES } from "./text-contents";
import type { RouteItem } from "../types/common";
import placeholderImg from "../assets/gamepad.png";
// import oddworksImg from "../assets/oddworks.png";
// import artsImg from "../assets/arts.png";
// import blogsImg from "../assets/blogs.png";
// import bioImg from "../assets/bio.png";

export type DeskItem = RouteItem & {
  image: string;
  position: { // in percentages
    top: number;
    left: number;
  };
  rotation?: number; // in degrees
  size: number; // in pixels
};

type DeskItemsConfig = Omit<DeskItem, keyof RouteItem>;

const deskItemsConfigs: DeskItemsConfig[] = [
  { image: placeholderImg, position: { top: 20, left: 20 }, rotation: 0, size: 150 },
  { image: placeholderImg, position: { top: 60, left: 25 }, rotation: 12, size: 100 },
  { image: placeholderImg, position: { top: 35, left: 50 }, rotation: -5, size: 110 },
  { image: placeholderImg, position: { top: 70, left: 70 }, rotation: 15, size: 95 },
  { image: placeholderImg, position: { top: 25, left: 82 }, rotation: -10, size: 105 },
];

export const deskItems: DeskItem[] = NAV_ROUTES.map((route, index) => ({
  ...route, ...deskItemsConfigs[index], // merge
}));
