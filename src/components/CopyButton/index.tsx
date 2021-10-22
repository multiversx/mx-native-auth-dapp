import * as React from "react";
import copyTextToClipboard from "./helpers/copyToClipboard";

interface CopyButtonType {
  text: string;
  className?: string;
}

const CopyButton = ({ text, className = "" }: CopyButtonType) => {
  const [copyResult, setCopyResut] = React.useState({
    default: true,
    success: false,
  });

  const handleCopyToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const noSpaces = text ? text.trim() : text;
    setCopyResut({
      default: false,
      success: await copyTextToClipboard(noSpaces),
    });

    setTimeout(() => {
      setCopyResut({
        default: true,
        success: false,
      });
    }, 1000);
  };

  return (
    <button
      onClick={handleCopyToClipboard}
      className={`btn btn-secondary ${className}`}
    >
      {copyResult.default || !copyResult.success ? "copy" : "copied"}
    </button>
  );
};

export default CopyButton;
