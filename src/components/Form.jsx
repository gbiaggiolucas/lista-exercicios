// src/components/ExerciseForm.js
import React, { useState } from 'react';
import { useExercises } from '../contexts/Context';

const ExerciseForm = () => {
  const { addExercise } = useExercises();
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [description, setDescription] = useState('');
  const [muscle, setMuscle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addExercise({ name, reps, description, muscle });
    setName('');
    setReps('');
    setDescription('');
    setMuscle('');
  };

  return (
    <form onSubmit={handleSubmit} className="exercise-form">
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Repetições"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Músculo Treinado"
        value={muscle}
        onChange={(e) => setMuscle(e.target.value)}
        required
      />
      <button type="submit">Adicionar Exercício</button>
    </form>
  );
};

export default ExerciseForm;