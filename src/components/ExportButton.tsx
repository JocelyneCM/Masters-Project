import React from "react";

interface ExportButtonProps {
  onExport: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onExport }) => {
  return (
    <button 
      onClick={onExport}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        transition: "background-color 0.3s"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#45a049";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#4CAF50";
      }}
    >
      Export Test Data (JSON)
    </button>
  );
};

export default ExportButton;