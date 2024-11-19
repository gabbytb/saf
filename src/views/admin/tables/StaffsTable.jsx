import React from "react";

// components
import { CardAllStaffs } from "../../../components";










export default function StaffsTable() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardAllStaffs color="dark" />
        </div>
      </div>
    </>
  );
}
