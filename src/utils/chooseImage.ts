import { type Dispatch } from "react";
export const imageNames: [string, string, string] = [
  "dale-gosciniec",
  "dale-sala",
  "linhir-karczma",
];

export const chooseImage = (setCurrentImage: Dispatch<string>) => {
  const imageInterval = setInterval(() => {
    const currentSeconds = new Date().getSeconds();
    if (currentSeconds > 40) setCurrentImage(imageNames[2]);
    else if (currentSeconds > 20) setCurrentImage(imageNames[1]);
    else setCurrentImage(imageNames[0]);
  }, 500);

  return imageInterval;
};
