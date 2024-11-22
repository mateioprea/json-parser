import { useState, useEffect } from "react";
import { Ampersand } from "lucide-react";

const words = ["stuff", "mobile", "ux", "ui", "apps"];

const RollingText = ({ animated }: { animated?: boolean }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!animated) {
    return <>{words[position]}</>;
  }
  return (
    <div className="relative h-5 overflow-hidden">
      <div
        className="transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateY(-${position * 24}px)`,
        }}
      >
        {words.map((word, i) => (
          <div key={i} className="h-6 w-fit">
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export const AnimatedLogo = ({ animated = false }: { animated?: boolean }) => (
  <div className="font-mono text-white flex items-center">
    <span className="text-gray-500">//:</span>
    <span className="text-indigo-400">web</span>
    <Ampersand className="h-5 w-5 mx-1 text-purple-400" />
    <span className="text-indigo-400">
      <RollingText animated={animated} />
    </span>
  </div>
);
