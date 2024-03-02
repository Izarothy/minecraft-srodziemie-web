import React, { useEffect, useState } from "react";
import Image from "next/image";
import ArrowDown from "../Icons/ArrowDown";
import copyToClipboard from "~/utils/copyToClipboard";
import discordIcon from "public/images/discord-icon.svg";
import { chooseImage, imageNames } from "~/utils/chooseImage";
import handleIPTooltip from "~/utils/handleIPCopy";
import { Button } from "../ui/button";
import ClipboardCopy from "~/components/Icons/ClipboardCopy";

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
        className="object-cover opacity-30"
      />
      <span className="relative top-1/3 flex flex-col items-center gap-4">
        <h1 className="mb-8 text-3xl drop-shadow-lg sm:text-5xl lg:text-7xl">
          Minecraft Śródziemie
        </h1>
        <p className="max-w-sm text-center text-gray-200  md:max-w-xl">
          Serwer Minecraft osadzony w Śródziemiu! Jeśli jesteś fanem Tolkiena,
          znajdziesz tu coś dla siebie.
        </p>
        <span className="flex items-center gap-8">
          <a href="#instalacja">
            <Button className="inline-flex items-center gap-2 border border-gray-600 bg-purple-700 hover:bg-purple-600">
              Instalacja
              <ArrowDown />
            </Button>
          </a>

          <a href="https://discord.gg/6uddsDd">
            <Button className="inline-flex gap-2 border border-gray-500 bg-[#7289da] hover:bg-[#8ba0e9]">
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
              <Image src={discordIcon} alt="Discord icon" priority />
              Discord
            </Button>
          </a>
        </span>
        <span className="mt-0 font-semibold">
          <span className="relative flex flex-col">
            <div
              className={`${
                isTooltipShown ? ` ` : `invisible`
              } mx-auto mb-2 flex-1 rounded-md bg-dark/80 px-6 py-1 text-center text-sm font-normal`}
            >
              {hoverText}
            </div>
            <button
              className=" inline-flex gap-2 border-0 bg-dark/20 py-2 text-xs font-medium text-gray-300"
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
              <ClipboardCopy />
            </button>
          </span>
        </span>
      </span>
    </header>
  );
};

export default Header;
