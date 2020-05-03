import DropableItem from "@material-ui/icons/Pets";
import CreateIcon from "@material-ui/icons/Create";

export default () => {
  return [
    {
      title: "Itens dropaveis",
      disabled: false,
      canList: true,
      path: "/",
      icon: DropableItem,
    },
    {
      title: "Itens de profissão",
      disabled: false,
      canList: true,
      path: "/profession",
      icon: CreateIcon,
    },
  ];
};
