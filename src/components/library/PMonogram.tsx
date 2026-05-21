import logoUrl from "@/assets/pasted-p-oval.png";

type Props = {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
  /** when true, the asset is rendered as a plain image (preserving its native off-white tone). */
  asImage?: boolean;
  title?: string;
};

/**
 * The PASTED P-in-oval mark. Rendered via CSS mask so it can be tinted any color.
 * Use `asImage` when you want the native off-white asset (e.g. on dark backgrounds where the original tone is correct).
 */
export const PMonogram = ({
  size = 32,
  color = "currentColor",
  opacity = 1,
  className,
  style,
  asImage = false,
  title,
}: Props) => {
  const width = size;
  const height = Math.round(size * 1.05); // asset is near-square but slightly taller (oval)

  if (asImage) {
    return (
      <img
        src={logoUrl}
        alt={title ?? ""}
        width={width}
        height={height}
        className={className}
        style={{ display: "inline-block", opacity, ...style }}
        draggable={false}
      />
    );
  }

  return (
    <span
      role={title ? "img" : undefined}
      aria-label={title}
      className={className}
      style={{
        display: "inline-block",
        width,
        height,
        backgroundColor: color,
        opacity,
        WebkitMaskImage: `url(${logoUrl})`,
        maskImage: `url(${logoUrl})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...style,
      }}
    />
  );
};

export const P_MONOGRAM_URL = logoUrl;
export default PMonogram;
