import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IoPauseOutline, IoClose, IoAdd } from "react-icons/io5";
import { useState } from "react";

const Home = () => {
  const [time, setTime] = useState(30);

  const handleTimeChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 60) {
      setTime(value);
    }
  };

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
              {/* <Input
                type="number"
                value={time}
                onChange={handleTimeChange}
                className="text-5xl text-[#E5E5E5] bg-transparent border-none"
                min={0}
                max={60}
              /> */}
            </div>
          </CardContent>

          <CardFooter className="relative h-[60px]">
            <IoClose className="text-white text-2xl absolute left-4 bottom-4" />
            <IoPauseOutline className="text-white text-2xl absolute right-4 bottom-4" />
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Home;
