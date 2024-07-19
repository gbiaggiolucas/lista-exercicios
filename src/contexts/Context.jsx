// src/contexts/ExerciseContext.js
import React, { createContext, useState, useContext } from 'react';

const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);

  const addExercise = (exercise) => {
    setExercises([...exercises, exercise]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  return (
    <ExerciseContext.Provider value={{ exercises, addExercise, removeExercise }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = () => useContext(ExerciseContext);