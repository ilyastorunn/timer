import { useEffect } from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IoPauseOutline, IoClose, IoAdd } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import { GoTrash } from "react-icons/go";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const CountdownTimer = () => {
  const [timers, setTimers] = useState(() => {
    const savedTimers = localStorage.getItem("timers");
    return savedTimers
      ? JSON.parse(savedTimers)
      : [{ id: 1, timeRemaining: 40 * 60, isRunning: false }];
  });
  // const [isRunning, setIsRunning] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTimerMinutes, setNewTimerMinutes] = useState(40);

  // useEffect(() => {
  //   let timerInterval;
  //   if (isRunning && timeRemaining > 0) {
  //     timerInterval = setInterval(() => {
  //       setTimeRemaining((prevTime) => {
  //         if (prevTime <= 1) {
  //           setIsRunning(false);
  //           return 0;
  //         }
  //         return prevTime - 1;
  //       });
  //     }, 1000);
  //   }
  //   return () => clearInterval(timerInterval);
  // }, [isRunning, timeRemaining]);

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  // const minutes = Math.floor((timeRemaining % 3600) / 60);
  // const seconds = timeRemaining % 60;

  useEffect(() => {
    const intervals = timers.map((timer) => {
      if (timer.isRunning && timer.timeRemaining > 0) {
        return setInterval(() => {
          setTimers((prevTimers) =>
            prevTimers.map((t) => {
              if (t.id === timer.id) {
                if (t.timeRemaining <= 1) {
                  return { ...t, timeRemaining: 0, isRunning: false };
                }
                return { ...t, timeRemaining: t.timeRemaining - 1 };
              }
              return t;
            })
          );
        }, 1000);
      }
      return null;
    });

    return () =>
      intervals.forEach((interval) => interval && clearInterval(interval));
  }, [timers]);

  const openDialog = () => {
    setIsDialogOpen(true);
    setNewTimerMinutes(40);
  };

  const addTimer = () => {
    if (newTimerMinutes <= 0) return;

    setTimers((prevTimers) => {
      const newTimer = {
        id: Date.now(),
        timeRemaining: newTimerMinutes * 60,
        isRunning: false,
      };
      return [...prevTimers, newTimer];
    });
    setIsDialogOpen(false);
  };

  const removeTimer = (id) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  const resetTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id
          ? { ...timer, timeRemaining: 40 * 60, isRunning: false }
          : timer
      )
    );
  };

  const toggleTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
      )
    );
  };

  const updateTimerTime = (id, mins, secs) => {
    if (!isNaN(mins) && !isNaN(secs)) {
      setTimers((prevTimers) =>
        prevTimers.map((timer) =>
          timer.id === id
            ? { ...timer, timeRemaining: mins * 60 + secs }
            : timer
        )
      );
    }
  };

  return (
    <>
      <div className="bg-[#0a0a0a] h-screen flex flex-col items-center relative pt-[40px]">
        <span className="text-5xl text-[#d4d4d4] font-semibold italic">
          timer
        </span>
        <span className="text-2xl text-[#d4d4d4] font-semibold italic">
          track and record your work times on one page
        </span>
        <div
          className={`grid gap-[15px] mt-5 ${
            timers.length === 1
              ? "grid-cols-1 place-items-center"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {timers.map((timer) => {
            const minutes = Math.floor((timer.timeRemaining % 3600) / 60);
            const seconds = timer.timeRemaining % 60;

            return (
              <Card
                key={timer.id}
                className="w-[340px] h-[340px] bg-[#171717] border-none relative"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-4"
                  onClick={() => resetTimer(timer.id)}
                >
                  <VscDebugRestart className="text-white text-2xl" />
                </Button>
                <Button
                  className="absolute right-4 top-4 hover:text-red-500 transition text-white cursor-pointer"
                  onClick={() => removeTimer(timer.id)}
                >
                  <GoTrash className="w-5 h-5" />
                </Button>
                <CardContent className="flex items-center justify-center">
                  <div className="flex items-center justify-center w-[260px] h-[260px] bg-neutral-700 rounded-full border-[5px] border-[#e99d28]">
                    <input
                      type="text"
                      value={`${minutes}:${seconds.toString().padStart(2, "0")}`}
                      onChange={(e) => {
                        const [mins, secs] = e.target.value.split(":").map(Number);
                        updateTimerTime(timer.id, mins, secs);
                      }}
                      className="text-4xl md:text-5xl text-[#e5e5e5] bg-transparent border-none text-center w-[110px] md:w-[120px] focus:outline-none"
                      disabled={timer.isRunning}
                    />
                  </div>
                </CardContent>
                <CardFooter className="relative h-[60px] flex items-center justify-center gap-4">
                  <button
                    className={`hover:text-[#404040] text-[#e5e5e5] ${timer.isRunning ? '' : 'opacity-60'}`}
                    onClick={() => toggleTimer(timer.id)}
                    disabled={!timer.isRunning}
                  >
                    <IoClose className="text-2xl" />
                  </button>
                  <button
                    className={`hover:text-[#404040] text-[#e5e5e5] ${!timer.isRunning ? '' : 'opacity-60'}`}
                    onClick={() => toggleTimer(timer.id)}
                    disabled={timer.isRunning}
                  >
                    <IoPauseOutline className="text-2xl" />
                  </button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <Button className="w-[345px] h-[60px] my-[16px]" onClick={openDialog}>
          <FaPlus className="w-6 h-6 text-neutral-200" />
          <span className="text-neutral-200">add more</span>
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-neutral-900 text-neutral-300 border-none">
            <DialogHeader>
              <DialogTitle>new timer</DialogTitle>
            </DialogHeader>
            <Input
              type="number"
              className="text-neutral-200 border-neutral-800"
              placeholder="minutes"
              value={newTimerMinutes}
              onChange={(e) => setNewTimerMinutes(Number(e.target.value))}
            />
            <DialogFooter>
              <Button
                onClick={() => setIsDialogOpen(false)}
                className="text-neutral-400 bg-neutral-800 hover:bg-neutral-700"
              >
                Cancel
              </Button>
              <Button
                onClick={addTimer}
                className="text-neutral-950 bg-neutral-200 hover:bg-neutral-300"
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
