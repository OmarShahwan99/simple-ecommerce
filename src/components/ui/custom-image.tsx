import Image, { ImageProps } from "next/image";
import React from "react";
import Fallback from "@/assets/cHddUCu.webp";

const CustomImage = ({ src, width, height, alt, ...rest }: ImageProps) => {
  const validSrc =
    typeof src === "string" && src.startsWith("http") ? src : Fallback;

  return (
    <Image src={validSrc} alt={alt} width={width} height={height} {...rest} />
  );
};

export default CustomImage;
