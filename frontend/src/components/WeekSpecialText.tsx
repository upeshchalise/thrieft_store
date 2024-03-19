import React from "react";

const WeekSpecialText: React.FC = () => {
  return (
    <div className="w-fit mx-auto my-3 flex flex-col gap-2">
      <span className="text-5xl">New This Week</span>
      <hr className="h-1 bg-black" />
    </div>
  );
};

export default WeekSpecialText;
