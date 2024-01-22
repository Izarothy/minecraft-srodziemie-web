import React, { useEffect, useState } from "react";
import Image from "next/image";
import ArrowDown from "../Icons/ArrowDown";
import copyToClipboard from "~/utils/copyToClipboard";
import discordIcon from "public/images/discord-icon.svg";
import { chooseImage, imageNames } from "~/utils/chooseImage";
import handleIPTooltip from "~/utils/handleIPCopy";

const Header = () => {
  const [isTooltipShown, setTooltipShown] = useState(false);
  const [hoverText, setTooltipText] = useState("Kliknij, by skopiować");
  const [currentImage, setCurrentImage] = useState<string>(imageNames[0]);

  useEffect(() => {
    const imageInterval = chooseImage(setCurrentImage);

    return () => {
      clearInterval(imageInterval);
    };
  }, []);

  return (
    <header className=" relative mx-auto flex h-[90vh] w-full flex-col ">
      <Image
        src={`/images/${currentImage}.png`}
        fill
        priority
        alt="Tło"
        quality={100}
        className="object-cover opacity-50"
      />
      <span className="relative top-1/3 flex flex-col items-center gap-4">
        <h1 className="mb-8 text-3xl drop-shadow-lg sm:text-5xl lg:text-7xl">
          Minecraft Śródziemie
        </h1>
        <span className="font-semibold">
          <span className="relative flex flex-col">
            <div
              className={`${
                isTooltipShown ? ` ` : `invisible`
              } mx-auto mb-2 flex-1 rounded-md bg-dark/80 px-6 py-1 text-center text-sm`}
            >
              {hoverText}
            </div>
            <button
              className=" border-0 bg-dark/60 py-2"
              onMouseEnter={() => {
                const screenWidth = window.innerWidth;
                if (screenWidth < 1024) return;
                setTooltipText("Kliknij, by skopiować");
                setTooltipShown(true);
              }}
              onMouseLeave={() => setTooltipShown(false)}
              onClick={() => {
                copyToClipboard("minecraft-srodziemie.tasrv.com");
                handleIPTooltip(setTooltipText, setTooltipShown);
              }}
            >
              minecraft-srodziemie.tasrv.com
            </button>
          </span>
        </span>
        <span className="flex items-center gap-2">
          <a
            href="#instalacja"
            className="inline-flex items-center gap-2 border border-yellow-600 bg-dark/70 from-yellow-600/30 to-yellow-600 to-70%  px-4 py-1 font-semibold text-white  hover:bg-gradient-to-br "
          >
            Instalacja <ArrowDown />
          </a>
          <button className="border-discord ">
            <a
              href="https://discord.gg/6uddsDd"
              className=" flex gap-2 py-1 text-white "
            >
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
              <Image src={discordIcon} alt="Discord icon" priority />
              Discord
            </a>
          </button>
        </span>
      </span>
    </header>
  );
};

export default Header;
