// src/components/ExerciseList.js
import React from 'react';
import { useExercises } from '../contexts/Context';
import ExerciseItem from './Item';

const ExerciseList = () => {
  const { exercises } = useExercises();

  return (
    <div className="exercise-list">
      {exercises.length === 0 ? (
        <p>Nenhum exercício adicionado ainda.</p>
      ) : (
        exercises.map((exercise, index) => (
          <ExerciseItem key={index} exercise={exercise} index={index} />
        ))
      )}
    </div>
  );
};

export default ExerciseList;