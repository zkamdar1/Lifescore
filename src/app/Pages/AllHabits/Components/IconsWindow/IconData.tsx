import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faAppleAlt,
  faCarrot,
  faSmile,
  faAnchor,
  faBicycle,
  faBook,
  faCamera,
  faCloud,
  faCode,
  faEnvelope,
  faHeart,
  faHome,
  faKey,
  faLaptop,
  faMap,
  faMusic,
  faPencilAlt,
  faPlane,
  faRocket,
  faSearch,
  faShoppingCart,
  faStar,
  faSun,
  faTrophy,
  faUser,
  faWrench,
  faBell,
  faChartLine,
  faChess,
  faDog,
  faFeather,
  faGuitar,
  faTools,
} from "@fortawesome/free-solid-svg-icons"; 

type IconData = {
  faIcon: IconProp;
  isSelected: boolean;
};

export const iconsData: IconData[] = [
  { faIcon: faCoffee, isSelected: true },
  { faIcon: faAppleAlt, isSelected: false },
  { faIcon: faCarrot, isSelected: false },
  { faIcon: faSmile, isSelected: false },
  { faIcon: faAnchor, isSelected: false },
  { faIcon: faBicycle, isSelected: false },
  { faIcon: faBook, isSelected: false },
  { faIcon: faCamera, isSelected: false },
  { faIcon: faCloud, isSelected: false },
  { faIcon: faCode, isSelected: false },
  { faIcon: faEnvelope, isSelected: false },
  { faIcon: faHeart, isSelected: false },
  { faIcon: faHome, isSelected: false },
  { faIcon: faKey, isSelected: false },
  { faIcon: faLaptop, isSelected: false },
  { faIcon: faMap, isSelected: false },
  { faIcon: faMusic, isSelected: false },
  { faIcon: faPencilAlt, isSelected: false },
  { faIcon: faPlane, isSelected: false },
  { faIcon: faRocket, isSelected: false },
  { faIcon: faSearch, isSelected: false },
  { faIcon: faShoppingCart, isSelected: false },
  { faIcon: faStar, isSelected: false },
  { faIcon: faSun, isSelected: false },
  { faIcon: faTrophy, isSelected: false },
  { faIcon: faUser, isSelected: false },
  { faIcon: faWrench, isSelected: false },
  { faIcon: faBell, isSelected: false },
  { faIcon: faChartLine, isSelected: false },
  { faIcon: faChess, isSelected: false },
  { faIcon: faDog, isSelected: false },
  { faIcon: faFeather, isSelected: false },
  { faIcon: faGuitar, isSelected: false },
  { faIcon: faTools, isSelected: false },
];

export function textToIcon(iconText: string): IconProp | string {
  switch (iconText.toLowerCase()) {
    case "coffee":
      return faCoffee;
    case "apple":
      return faAppleAlt;
    case "carrot":
      return faCarrot;
    case "smile":
      return faSmile;
    case "anchor":
      return faAnchor;
    case "bicycle":
      return faBicycle;
    case "book":
      return faBook;
    case "camera":
      return faCamera;
    case "cloud":
      return faCloud;
    case "code":
      return faCode;
    case "envelope":
      return faEnvelope;
    case "heart":
      return faHeart;
    case "home":
      return faHome;
    case "key":
      return faKey;
    case "laptop":
      return faLaptop;
    case "map":
      return faMap;
    case "music":
      return faMusic;
    case "pencil":
      return faPencilAlt;
    case "plane":
      return faPlane;
    case "rocket":
      return faRocket;
    case "search":
      return faSearch;
    case "shoppingcart":
      return faShoppingCart;
    case "star":
      return faStar;
    case "sun":
      return faSun;
    case "trophy":
      return faTrophy;
    case "user":
      return faUser;
    case "wrench":
      return faWrench;
    case "bell":
      return faBell;
    case "chartline":
      return faChartLine;
    case "chess":
      return faChess;
    case "dog":
      return faDog;
    case "feather":
      return faFeather;
    case "guitar":
      return faGuitar;
    case "tools":
      return faTools;
    default:
      return "unknown";
  }
}
