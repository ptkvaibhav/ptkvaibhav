import { cn } from "@/lib/utils";

type StampProps = {
  children: React.ReactNode;
  rotate?: number;
  className?: string;
  tone?: "red" | "blue" | "ink";
};

export function Stamp({ children, rotate = -8, className, tone = "red" }: StampProps) {
  return (
    <span
      className={cn(
        "stamp",
        tone === "blue" && "!text-blueink",
        tone === "ink" && "!text-foreground",
        className
      )}
      style={{ ["--stamp-rot" as string]: `${rotate}deg` }}
    >
      {children}
    </span>
  );
}
