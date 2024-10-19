import React, { useEffect, useState } from "react";

const InvoiceViewer = ({ blob }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (blob) {
      const blobUrl = URL.createObjectURL(blob);
      setUrl(blobUrl);

      return () => {
        URL.revokeObjectURL(blobUrl);
      };
    }
  }, [blob]);

  return (
    <iframe
      src={url}
      width="100%"
      height="100%"
      className="border-none flex-grow"
      title="PDF Preview"
      style={{ minHeight: "600px" }}
    />
  );
};

export default InvoiceViewer;
