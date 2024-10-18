import React from "react";
import { useForm } from "react-hook-form";
const effectList = {
  night_vision: "Widzenie w ciemności",
  jump_boost: "Skakanie",
  invisibility: "Niewidzialność",
};

type FormData = {
  playerName: string;
  effectName: string;
  effectDuration: number;
};
const EffectPicker = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = handleSubmit(
    ({ playerName, effectName, effectDuration }) => {
      navigator.clipboard
        .writeText(`/effect ${playerName} ${effectName} ${effectDuration}`)
        .catch(console.log);
    }
  );

  return (
    <div>
      <h2>1. Efekt</h2>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <div className="flex items-center gap-12">
          <label>
            <span className="label">Nick</span>
            <input type="text" {...register("playerName")} />
          </label>
          <label>
            <span className="label">Nazwa efektu</span>

            <select {...register("effectName")} className="">
              {Object.entries(effectList).map((effect) => {
                return (
                  <option key={effect[0]} value={effect[0]}>
                    {effect[1]}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            <span className="label">Długość w sekundach</span>
            <input type="number" {...register("effectDuration")} />
          </label>
        </div>
        <span>
          <button className="bg-green-600">Kopiuj</button>
        </span>
      </form>
    </div>
  );
};

export default EffectPicker;
