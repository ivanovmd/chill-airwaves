import React, { useEffect } from "react";
import { airports } from "../../../settings/liveatc";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedAirport, setSelectedAirportIata } from "../../store/atc/atsSlice";
import { useModal } from "../../../app/hooks/useModal";
import { Share } from "./Share";


export const Settings = () => {
  const dispatch = useDispatch();
  const selectedAirport = useSelector(getSelectedAirport)
  const { hideModal, showModal } = useModal();

  return (
    <div className="max-w-screen-md w-full space-y-6 flex flex-col">
      <h1 className="text-xl">Settings</h1>

      <div className="flex flex-col w-full overflow-auto">
        <h2>Themes:</h2>

        <div className="grid grid-cols-4 gap-4 w-full max-h-full overflow-auto">
          {Array.from({ length: 39 }).map((_, index) => (
            <div key={index}>
              <div className="w-24 h-16 overflow-hidden rounded-md">
                <img src="https://cdn.midjourney.com/aeb9cae2-47e3-4edf-97b1-5170e511429f/0_0.png" alt="" className="w-full h-full object-cover object-center " />
              </div>
              <div className="flex space-x-1 mt-1">
                <div className="rounded-md h-5 w-full bg-red-700"></div>
                <div className="rounded-md h-5 w-full bg-slate-700"></div>
                <div className="rounded-md h-5 w-full bg-blue-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*<button onClick={() => showModal(<Share />)}>Share</button>*/}
    </div>
  );
}