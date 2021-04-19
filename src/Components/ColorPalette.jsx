import React from "react";
import { wait } from "./util";

const ColorPalette = ({ color, flash, addUserColor, userPlay }) => {
  const [cname, setCname] = React.useState(color);
  const [busy, setBusy] = React.useState(false);
  const clicked = async () => {
    if (!busy && userPlay) {
      addUserColor(color);
      setBusy(true);
      setCname(`${cname} clicked`);
      await wait();
      setCname(`${cname}`);
    }
    setBusy(false);
  };
  return (
    <section
      className={flash ? `${cname}  flashed ` : `${cname}`}
      onClick={clicked}></section>
  );
};

export default ColorPalette;
