import React, { useState, useEffect } from "react";
import Row from "./Row";
import RowPlaceholder from "./RowPlaceholder";

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
  priority?: number; // Plus le nombre est bas, plus la priorité est élevée
  isInView?: boolean; // Si la ligne est actuellement visible dans la vue
}

/**
 * Gestionnaire d'état qui commence par afficher un placeholder puis passe à la ligne complète
 * avec un délai pour améliorer les performances de rendu
 */
const RowStateManager: React.FC<RowStateManagerProps> = ({
  userId,
  nom,
  prenom,
  days = [],
}) => {
  // État pour suivre si le contenu complet doit être affiché
  console.log('=> coucou')
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    // Définir un timeout pour passer au contenu complet après 30ms
    const timeoutId = setTimeout(() => {
      setShowFullContent(true);
    }, 10);

    // Nettoyage du timeout si le composant est démonté
    return () => clearTimeout(timeoutId);
  }, []);

  // Rendu conditionnel basé sur l'état
  if (!showFullContent) {
    return <RowPlaceholder />;
  }

  // Rendu de la ligne complète avec toutes les données
  return (
    <Row
      userId={userId}
      nom={nom}
      prenom={prenom}
      days={days}
    />
  );
};

export default RowStateManager;
