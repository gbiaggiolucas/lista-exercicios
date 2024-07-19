// src/App.js
import React from 'react';
import { ExerciseProvider } from './contexts/Context';
import ExerciseForm from './components/Form';
import ExerciseList from './components/List';
import './App.css'; // Para estilizar os componentes

const App = () => {
  return (
    <ExerciseProvider>
      <div className="app">
        <h1>Lista de Exercícios</h1>
        <ExerciseForm />
        <ExerciseList />
      </div>
    </ExerciseProvider>
  );
};

export default App;