import React from "react";
import { SignIn } from "@/components/sign-in";

const Signin = () => {
  return (
    <div className="flex items-center p-3 rounded-lg hover:bg-sidebar-background cursor-pointer hover:text-green-800 justify-between">
      <SignIn />
    </div>
  );
};

export default Signin;
