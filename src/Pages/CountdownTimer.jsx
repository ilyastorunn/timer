import { useEffect } from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IoPauseOutline, IoClose, IoAdd } from "react-icons/io5";

const CountdownTimer = () => {
  const initialTime = 60 * 60;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(60);

  useEffect(() => {
    let timerInterval;
    if (isRunning && timeRemaining > 0) {
      timerInterval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, timeRemaining]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <>
      <div className="bg-[#0A0A0A] h-screen flex flex-col items-center relative pt-[40px]">
        <span className="text-5xl text-[#D4D4D4] font-semibold italic">
          timer
        </span>
        <span className="text-2xl text-[#D4D4D4] font-semibold italic">
          track and record your work times on one page
        </span>
        <Card className="w-[340px] h-[340px] bg-[#171717] border-none mt-[60px] relative">
          <IoAdd className="text-white text-2xl absolute right-4 top-4" />
          <CardContent className="flex items-center justify-center">
            <div className="flex items-center justify-center w-[260px] h-[260px] bg-neutral-700 rounded-full border-[5px] border-[#e99d28]">
              <span className="text-5xl text-[#E5E5E5]">30:00</span>
            </div>
          </CardContent>
          <CardFooter className="relative h-[60px]">
            <IoClose className="text-white text-2xl absolute left-4 bottom-4" />
            <IoPauseOutline className="text-white text-2xl absolute right-4 bottom-4" />
          </CardFooter>
        </Card>
      </div>
    </>
    // <div className="relative">
    //   <p>Countdown Timer:</p>
    //   <p>{`${hours}h ${minutes}m ${seconds}s`}</p>
    //   <input
    //     type="number"
    //     value={inputMinutes}
    //     onChange={(e) => setInputMinutes(Number(e.target.value))}
    //   />
    //   <button
    //     className="bg-blue-500 hover:bg-yellow-500 p-2"
    //     onClick={() => {
    //       setTimeRemaining(inputMinutes * 60);
    //       setIsRunning(true);
    //     }}
    //   >
    //     Start Timer!
    //   </button>
    //   <button
    //     className="bg-yellow-500 hover:bg-blue-500"
    //     onClick={() => setIsRunning(false)}
    //   >
    //     Stop Timer!
    //   </button>
    // </div>
  );
};

export default CountdownTimer;
