import { FaLock } from "react-icons/fa";

export default function BetLocked() {
  return (
    <div className="absolute top-0 bg-black/60 flex justify-center items-center w-full h-full disabled:cursor-pointer">
      <FaLock size={16} className="text-white" />
    </div>
  );
}

