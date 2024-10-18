import { type Dispatch } from "react";

const handleIPTooltip = (
  setTooltipText: Dispatch<string>,
  setTooltipShown: Dispatch<boolean>
) => {
  setTooltipText("Skopiowano ✔");
  setTooltipShown(true);
  setTimeout(() => {
    setTooltipShown(false);
  }, 1500);
};

export default handleIPTooltip;
