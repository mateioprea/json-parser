import React from "react";
import { AlertCircle } from "lucide-react";
import type { ParserType } from "../types/parser";
import { TreeView } from "./TreeView";

interface ParserProps {
  input: string;
  onInputChange: (value: string) => void;
  parsedOutput: string;
  error: string | null;
  parserType: ParserType | undefined;
}

export const DataStructureParser: React.FC<ParserProps> = ({
  input,
  onInputChange,
  parsedOutput,
  error,
  parserType,
}) => {
  const parsedData = parsedOutput ? JSON.parse(parsedOutput) : null;

  return (
    <div className="h-full max-w-[1600px] mx-auto px-6">
      <div className="grid grid-cols-2 gap-4 h-[calc(100vh-8.5rem)]">
        {/* Input Panel */}
        <div className="flex flex-col h-full">
          <div className="mb-2 flex items-center justify-between flex-none">
            <h2 className="text-lg font-semibold text-gray-700">Input</h2>
            {parserType && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  Detected format:{" "}
                  <span className="font-medium text-gray-700">
                    {parserType.toUpperCase()}
                  </span>
                </span>
                <button
                  onClick={() => onInputChange("")}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            className="flex-1 w-full p-4 font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Paste your JSON or XML here..."
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col h-full">
          <div className="mb-2 flex items-center justify-between flex-none">
            <h2 className="text-lg font-semibold text-gray-700">
              Formatted Output
            </h2>
            <button
              onClick={() => {
                navigator.clipboard.writeText(parsedOutput);
              }}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Copy
            </button>
          </div>
          <div className="flex-1 relative">
            {error && parserType ? (
              <div className="absolute inset-0 p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-start gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">
                      Invalid {parserType.toUpperCase()}
                    </h3>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 p-4 bg-gray-50 border border-gray-200 rounded-lg overflow-auto">
                {parsedData && <TreeView data={parsedData} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
