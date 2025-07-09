import React, { useMemo } from "react";
import DOMPurify from "dompurify";

interface DangerousContentProps {
  content: string;
  className?: string;
}

export const DangerousContent: React.FC<DangerousContentProps> = ({ content, className }) => {
  const sanitizedContent = useMemo(() => DOMPurify.sanitize(content), [content]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className={`sanitized__content ${className ? className : ""}`}
    />
  );
};

export default DangerousContent;
