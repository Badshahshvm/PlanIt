import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-around  w-full bg-slate-900 text-white py-4">
      <div className="logo">
        <span className="font-bold text-xl mx-8">PlanIt</span>
      </div>
      <ul className=" flex gap-8 mx-8">
        <l1 className="cursor-pointer hover:font-bold tansition-all duration-500">
          Home
        </l1>
        <li className="cursor-pointer hover:font-bold tansition-all duration-500">
          Your Tasks
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
