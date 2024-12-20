import { useState, useCallback } from "react";

import { DataStructureParser } from "./components/DataStructureParser";
import { parseJSON } from "./parsers/jsonParser";
import { parseXML } from "./parsers/xmlParser";
import { detectFormat } from "./parsers/detectFormat";
import type { ParserType } from "./types/parser";
import { AnimatedLogo } from "./components/layout/AnimatedLogo";

export default function App() {
  const [input, setInput] = useState("");
  const [parsedOutput, setParsedOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [parserType, setParserType] = useState<ParserType | undefined>(
    undefined
  );

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    const detectedType = detectFormat(value);
    setParserType(detectedType);

    const parser = detectedType === "json" ? parseJSON : parseXML;
    const { result, error } = parser(value);
    setParsedOutput(result);
    setError(error);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 flex-none">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <h1 className="text-xl font-bold text-gray-800">
            Data Structure Parser
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Automatically detects and parses JSON or XML data structures
          </p>
        </div>
      </header>

      <main className="flex-1 py-2 overflow-hidden">
        <DataStructureParser
          input={input}
          onInputChange={handleInputChange}
          parsedOutput={parsedOutput}
          error={error}
          parserType={parserType}
        />
      </main>
      <footer className="flex-none gap-2 text-center text-sm text-gray-500 mx-auto pb-1">
        <AnimatedLogo animated={false} />
      </footer>
    </div>
  );
}
