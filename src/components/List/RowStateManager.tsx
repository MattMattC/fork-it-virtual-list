import React, { useState, useEffect } from "react";
import Row from "./Row";
import RowPlaceholder from "./RowPlaceholder";
import { fa } from "@faker-js/faker";

interface RowStateManagerProps {
  userId: number;
  nom: string;
  prenom: string;
  colors: Array<{ text: string; colorIndex: number }>;
  days?: Array<{
    colorIndex: number;
    code: string;
    startTime: string;
    stopTime: string;
  }>;
  delay?: number;
  priority?: number;
  isInView?: boolean;
}

const RowStateManager: React.FC<RowStateManagerProps> = ({
  userId,
  nom,
  prenom,
  days = [],
}) => {
  // TODO :
  const [showFullContent, setShowFullContent] = useState(false);
// TODO :
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowFullContent(true);
    }, 10);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!showFullContent) {
    return <RowPlaceholder />;
  }

  return <Row userId={userId} nom={nom} prenom={prenom} days={days} />;
};

export default RowStateManager;
