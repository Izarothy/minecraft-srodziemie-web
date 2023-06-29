import React from "react";
import LocationImage from "./LocationImage";

const ImageShowcase = () => {
  return (
    <section className="mt-16 w-[90%] lg:w-[70%]">
      <h2 className="text-center text-3xl sm:text-4xl">Lokacje na serwerze</h2>
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:gap-x-16 ">
        <LocationImage src="/images/locations/linhir.png" name="Linhir" />
        <LocationImage src="/images/locations/dale.png" name="Dale" />
        <LocationImage
          src="/images/locations/tol-morwen.png"
          name="Tol Morwen"
        />
        <LocationImage src="/images/locations/mt-gram.png" name="Góra Gram" />
      </div>
    </section>
  );
};

export default ImageShowcase;
