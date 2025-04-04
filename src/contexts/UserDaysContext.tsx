import { useGenerateUsers, User } from "@/hooks/useGenerateUsers";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserDayVisibility {
  userId: number;
  dayIndex: number;
  visible: boolean;
}

interface UserDaysContextType {
  users: User[];
  deleteDay: (userId: number, dayIndex: number) => void;
  // Récupérer l'état de visibilité d'un jour spécifique
  isDayVisible: (userId: number, dayIndex: number) => boolean;
  // Basculer la visibilité d'un jour
  toggleDayVisibility: (userId: number, dayIndex: number) => void;
}

const UserDaysContext = createContext<UserDaysContextType | undefined>(
  undefined
);

export const useUserDays = () => {
  const context = useContext(UserDaysContext);
  if (!context) {
    throw new Error(
      "useUserDays doit être utilisé à l'intérieur d'un UserDaysProvider"
    );
  }
  return context;
};

interface UserDaysProviderProps {
  children: ReactNode;
}

const NB_USERS = 100;

export const UserDaysProvider: React.FC<UserDaysProviderProps> = ({
  children,
}) => {
  const { users, deleteDay } = useGenerateUsers(NB_USERS);
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean>>(
    {}
  );

  const isDayVisible = (userId: number, dayIndex: number): boolean => {
    const key = `${userId}-${dayIndex}`;
    return visibilityMap[key] !== false; // Par défaut visible (true) si non défini
  };

  const toggleDayVisibility = (userId: number, dayIndex: number): void => {
    const key = `${userId}-${dayIndex}`;
    setVisibilityMap((prev) => ({
      ...prev,
      [key]: !prev[key], // Si c'est undefined, ça devient false (inversé)
    }));

    // Si le jour devient invisible, on le supprime
    if (!isDayVisible(userId, dayIndex)) {
      deleteDay(userId, dayIndex);
    }
  };

  const value: UserDaysContextType = {
    deleteDay,
    users,
    isDayVisible,
    toggleDayVisibility,
  };

  return (
    <UserDaysContext.Provider value={value}>
      {children}
    </UserDaysContext.Provider>
  );
};
