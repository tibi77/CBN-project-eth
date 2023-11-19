import PublicIcon from "@mui/icons-material/Public";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

const Menu = {
  LINKS: [
    {
      text: "World",
      href: "/front/world",
      icon: PublicIcon,
    },
    {
      text: "BlockChain",
      href: "/front/blockchain",
      icon: CurrencyBitcoinIcon,
    },
    {
      text: "Politics",
      href: "/front/politics",
      icon: SportsKabaddiIcon,
    },
    {
      text: "Business",
      href: "/front/business",
      icon: AttachMoneyIcon,
    },
  ],
};

export default Menu;
