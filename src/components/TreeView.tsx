import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

interface TreeNodeProps {
  label: string;
  value: unknown;
  depth: number;
  isLast: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ label, value, depth, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const isObject = value !== null && typeof value === "object";
  const hasChildren = isObject && Object.keys(value).length > 0;

  const renderValue = () => {
    if (value === null) return "null";
    if (typeof value === "string") return `"${value}"`;
    if (typeof value === "number" || typeof value === "boolean")
      return String(value);
    if (Array.isArray(value)) return isExpanded ? "" : `Array(${value.length})`;
    if (isObject) return isExpanded ? "" : "{...}";
    return String(value);
  };

  const toggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="font-mono">
      <div
        className={`flex items-center hover:bg-gray-100 cursor-pointer py-1 ${
          isLast ? "" : ""
        }`}
        style={{ paddingLeft: `${depth * 1.5}rem` }}
        onClick={toggleExpand}
      >
        {hasChildren && (
          <span className="mr-1 text-gray-500">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
        {!hasChildren && <span className="w-4 mr-1" />}
        <span className="text-blue-600">{label}</span>
        {label && <span className="text-gray-600 mr-1">: </span>}
        <span
          className={
            typeof value === "string"
              ? "text-green-600"
              : typeof value === "number"
              ? "text-orange-600"
              : typeof value === "boolean"
              ? "text-purple-600"
              : "text-gray-600"
          }
        >
          {renderValue()}
        </span>
      </div>
      {isExpanded && hasChildren && (
        <div>
          {Array.isArray(value)
            ? value.map((item, index) => (
                <TreeNode
                  key={index}
                  label={String(index)}
                  value={item}
                  depth={depth + 1}
                  isLast={index === value.length - 1}
                />
              ))
            : Object.entries(value).map(([key, val], index, arr) => (
                <TreeNode
                  key={key}
                  label={key}
                  value={val}
                  depth={depth + 1}
                  isLast={index === arr.length - 1}
                />
              ))}
        </div>
      )}
    </div>
  );
};

interface TreeViewProps {
  data: unknown;
}

export const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  return (
    <div className="text-sm">
      <TreeNode label="" value={data} depth={0} isLast={true} />
    </div>
  );
};
