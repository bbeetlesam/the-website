// used for Home's desk items
import placeholderImg from "../assets/gamepad.png";
// import oddworksImg from "../assets/oddworks.png";
// import artsImg from "../assets/arts.png";
// import blogsImg from "../assets/blogs.png";
// import bioImg from "../assets/bio.png";

export type DeskItem = {
  path: string;
  label: string;
  title?: string;
  image: string;
  position: { // in percentages
    top: number;
    left: number;
  };
  rotation?: number; // in degrees
  size: number; // in pixels
};

export const deskItems: DeskItem[] = [
  {
    path: "/games",
    label: "Games",
    title: "Explore my games!",
    image: placeholderImg,
    position: { top: 20, left: 20 },
    rotation: 0,
    size: 150,
  },
  {
    path: "/oddworks",
    label: "Oddworks",
    title: "My other projects!",
    image: placeholderImg,
    position: { top: 60, left: 25 },
    rotation: 12,
    size: 100,
  },
  {
    path: "/arts",
    label: "Arts",
    title: "Pieces of my arts!",
    image: placeholderImg,
    position: { top: 35, left: 50 },
    rotation: -5,
    size: 110,
  },
  {
    path: "/blogs",
    label: "Blogs",
    title: "Read my thoughts!",
    image: placeholderImg,
    position: { top: 70, left: 70 },
    rotation: 15,
    size: 95,
  },
  {
    path: "/bio",
    label: "Bio",
    title: "Who am I really?",
    image: placeholderImg,
    position: { top: 25, left: 82 },
    rotation: -10,
    size: 105,
  },
];
