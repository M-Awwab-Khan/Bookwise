"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Printer } from "lucide-react";
import { generateReceipt } from "@/lib/actions/book";

const DownloadReciept = ({ borrowRecord }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);

      const buffer = await generateReceipt(borrowRecord);

      // Create a blob from the PDF buffer
      const blob = new Blob([buffer], { type: "application/pdf" });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = `receipt-${borrowRecord.id}.pdf`;

      // Trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download receipt:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      className="book-overview_btn font-bebas-neue text-xl text-dark-100"
      onClick={handleDownload}
      disabled={isLoading}
    >
      <Printer size={20} />
      {isLoading ? "Generating..." : "Generate Receipt"}
    </Button>
  );
};

export default DownloadReciept;
