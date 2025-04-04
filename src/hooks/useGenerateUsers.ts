import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

export interface Color {
  text: string;
  colorIndex: number;
}

export interface Day {
  colorIndex: number;
  code: string;
  startTime: string;
  stopTime: string;
}

export interface User {
  nom: string;
  prenom: string;
  colors: Color[];
  days: Day[];
}

export const useGenerateUsers = (count: number = 30) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Générer les utilisateurs avec des données aléatoires
    const generatedUsers = Array.from({ length: count }, () => {
      // Générer un tableau de 30 couleurs aléatoires
      const colors = Array.from({ length: 30 }, () => ({
        text: faker.lorem.word(),
        colorIndex: Math.floor(Math.random() * 10),
      }));

      // Générer un tableau de 30 jours
      const days = Array.from({ length: 30 }, () => {
        const code = faker.string.alpha({ length: 3, casing: "upper" });
        return {
          colorIndex: Math.floor(Math.random() * 10),
          code,
          startTime: "12:01",
          stopTime: "15:01",
        };
      });

      return {
        nom: faker.person.lastName(),
        prenom: faker.person.firstName(),
        colors,
        days,
      };
    });

    setUsers(generatedUsers);
  }, [count]);

  const deleteDay = (userId: number, dayIndex: number) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user, index) => {
        if (index === userId) {
          const newsDays = [...user.days];
          newsDays[dayIndex] = {
            ...newsDays[dayIndex],
            code: null,
            startTime: null,
            stopTime: null,
          };
          return {
            ...user,
            days: newsDays,
          };
        }
        return user;
      });
    });
  };

  return { users, deleteDay };
};
