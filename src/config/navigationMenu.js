import DropableItem from "@material-ui/icons/Pets";
import CreateIcon from "@material-ui/icons/Create";
import SignOutIcon from "@material-ui/icons/ExitToApp";

export default () => {
  return [
    {
      title: "Itens dropaveis",
      disabled: false,
      canList: true,
      path: "/drop-itens",
      icon: DropableItem,
    },
    {
      title: "Itens de profissão",
      disabled: false,
      canList: true,
      path: "/",
      icon: CreateIcon,
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
      customOnClick: () => alert("Sign out"),
    },
  ];
};
