import React from "react";
import { Skeleton } from "../skeleton";

const CategoriesSkeleton = () => {
  return (
    <div className="flex items-center gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-6 w-[140px] rounded-lg" />
      ))}
    </div>
  );
};

export default CategoriesSkeleton;
