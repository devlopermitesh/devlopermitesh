import Image from "next/image";

interface LogoProps {
  src: string;
  alt?: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}

const Logo = ({
  src,
  alt = "logo",
  size,
  width = size || 100,
  height = size || 100,
  className = "object-contain",
}: LogoProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  );
};

export default Logo;
