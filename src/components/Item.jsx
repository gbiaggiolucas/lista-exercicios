// src/components/ExerciseItem.js
import React from 'react';
import { useExercises } from '../contexts/Context';

const ExerciseItem = ({ exercise, index }) => {
  const { removeExercise } = useExercises();

  return (
    <div className="exercise-item">
      <h3>{exercise.name}</h3>
      <p>Repetições: {exercise.reps}</p>
      <p>Descrição: {exercise.description}</p>
      <p>Músculo Treinado: {exercise.muscle}</p>
      <button onClick={() => removeExercise(index)}>Excluir</button>
    </div>
  );
};

export default ExerciseItem;