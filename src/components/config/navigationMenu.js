import PlaceIcon from "@material-ui/icons/Business";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import user from "./User";

export default () => {
  return [
    {
      title: "Itens dropaveis",
      disabled: false,
      path: "/drop-itens",
      icon: PlaceIcon,
    },
    {
      title: "Itens de profissão",
      disabled: false,
      path: "/profession-itens",
      icon: PlaceIcon,
    },
    {
      canList: true,
      divider: true,
    },
    {
      canList: true,
      type: "Opções",
    },
    {
      title: "Sair",
      disabled: false,
      canList: true,
      icon: SignOutIcon,
      customOnClick: () => user.logout(),
    },
  ];
};
