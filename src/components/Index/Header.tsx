import React, { useState } from "react";
import Image from "next/image";
import ArrowDown from "../Icons/ArrowDown";
import copyToClipboard from "~/utils/copyToClipboard";
import discordIcon from "public/images/discord-icon.svg";
import handleIPTooltip from "~/utils/handleIPCopy";
import { Button } from "../ui/button";
import ClipboardCopy from "~/components/Icons/ClipboardCopy";

const Header = () => {
  const [isTooltipShown, setTooltipShown] = useState(false);
  const [hoverText, setTooltipText] = useState("Kliknij, by skopiować");

  return (
    <header className="relative mx-auto flex h-screen w-screen flex-col gap-16 px-[5vw] py-4 sm:w-[92%] sm:gap-0 md:mt-8 md:h-[75vh] md:flex-row md:py-[13vh]">
      <div className="mt-auto flex flex-1 flex-col gap-4 pt-16 sm:pt-0 md:pl-6">
        <h1 className="mb-8 text-center text-2xl drop-shadow-lg sm:text-left sm:text-5xl">
          Minecraft Śródziemie
        </h1>
        <p className="max-w-sm px-4 text-sm text-gray-300 sm:px-0  sm:text-base md:max-w-lg">
          Serwer Minecraft osadzony w Śródziemiu! <br /> Jeśli jesteś fanem
          Tolkiena, znajdziesz tu coś dla siebie.
        </p>
        <span className="flex justify-center gap-8 sm:justify-normal">
          <a href="#instalacja">
            <Button className=" bg- inline-flex items-center gap-2 border-none ">
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
              } mx-auto mb-2 flex-1 rounded-md bg-dark/80 py-1 text-center text-sm font-normal`}
            >
              {hoverText}
            </div>
            <button
              className=" mx-auto inline-flex w-fit gap-2 border border-gray-800 bg-dark/20 py-2 text-xs font-medium text-gray-300 sm:mx-0"
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
      </div>
      <div className="relative flex-1">
        <Image
          src={`/images/locations/tol-morwen.png`}
          priority
          alt="Tło"
          quality={100}
          width={700}
          height={500}
          className="mx-auto my-auto h-full w-[90%] rounded-md border border-gray-700 object-cover opacity-70"
        />
      </div>
    </header>
  );
};

export default Header;
