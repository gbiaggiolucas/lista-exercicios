# Lista de Exercícios Físicos

Um aplicativo simples para gerenciar uma lista de exercícios físicos. Permite adicionar, visualizar e excluir exercícios. Desenvolvido com React e Context API.

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Explicação do Código](#explicação-do-código)
- [Instalação e Execução](#instalação-e-execução)
- [Uso](#uso)
- [Estilização](#estilização)
- [Deploy com Surge](#deploy-com-surge)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Descrição do Projeto

Este aplicativo permite que você gerencie uma lista de exercícios físicos, oferecendo funcionalidades para adicionar, visualizar e excluir exercícios.

## Tecnologias Utilizadas

- **React:** Biblioteca para criar interfaces de usuário.
- **Context API:** Para gerenciamento de estado global.
- **CSS:** Para estilização dos componentes.

## Estrutura do Projeto

```
/src
  /components
    ExerciseList.js        # Componente para exibir a lista de exercícios
    ExerciseForm.js        # Componente para adicionar novos exercícios
    ExerciseItem.js        # Componente para exibir cada exercício individualmente
  /contexts
    ExerciseContext.js     # Contexto para gerenciar o estado dos exercícios
  App.js                   # Componente principal do aplicativo
  App.css                  # Arquivo de estilização
```

## Explicação do Código

### 1. Contexto (`ExerciseContext.js`)

```javascript
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
```

- **`createContext` e `useContext`:** Criam e utilizam um contexto React para compartilhar o estado da lista de exercícios entre componentes.
- **`ExerciseProvider`:** Provedor do contexto que mantém o estado dos exercícios e funções para adicionar e remover exercícios.
- **`useExercises`:** Hook customizado para acessar o contexto de exercícios.

### 2. Formulário de Exercícios (`ExerciseForm.js`)

```javascript
import React, { useState } from 'react';
import { useExercises } from '../contexts/ExerciseContext';

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
```

- **`useState`:** Gerencia o estado dos campos do formulário (nome, repetições, descrição, músculo).
- **`handleSubmit`:** Função que é chamada ao enviar o formulário. Adiciona um novo exercício usando a função `addExercise` e limpa os campos.

### 3. Item de Exercício (`ExerciseItem.js`)

```javascript
import React from 'react';
import { useExercises } from '../contexts/ExerciseContext';

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
```

- **`removeExercise`:** Função para remover um exercício da lista, chamada quando o botão "Excluir" é clicado.
- **`onClick`:** Handler para o botão de exclusão que usa o índice do exercício para removê-lo da lista.

### 4. Lista de Exercícios (`ExerciseList.js`)

```javascript
import React from 'react';
import { useExercises } from '../contexts/ExerciseContext';
import ExerciseItem from './ExerciseItem';

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
```

- **`exercises`:** Obtém a lista de exercícios do contexto.
- **`map`:** Itera sobre a lista de exercícios e renderiza um `ExerciseItem` para cada exercício.

### 5. Componente Principal (`App.js`)

```javascript
import React from 'react';
import { ExerciseProvider } from './contexts/ExerciseContext';
import ExerciseForm from './components/ExerciseForm';
import ExerciseList from './components/ExerciseList';
import './App.css';

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
```

- **`ExerciseProvider`:** Envolve os componentes `ExerciseForm` e `ExerciseList` para fornecer o contexto de exercícios.
- **`ExerciseForm` e `ExerciseList`:** Inclui o formulário para adicionar exercícios e a lista de exercícios, respectivamente.

## Instalação e Execução

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/lista-exercicios.git
   cd lista-exercicios
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm start
   ```

   O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).

## Uso

1. **Adicionar Exercício:**
   - Preencha os campos do formulário com o nome, repetições, descrição e músculo treinado do exercício.
   - Clique em "Adicionar Exercício" para adicionar o exercício à lista.

2. **Exibir Exercícios:**
   - Abaixo do formulário, você verá a lista de exercícios que foram adicionados.

3. **Excluir Exercício:**
   - Cada exercício na lista tem um botão "Excluir" ao lado. Clique neste botão para remover o exercício da lista.

## Estilização

O aplicativo utiliza CSS básico para estilização. O arquivo `App.css` define estilos para:

- O contêiner principal do aplicativo.
- O formulário de adição de exercícios.
- A lista e os itens individuais de exercícios.
- Botões para adicionar e excluir exercícios.

### Exemplo de CSS

```css
/* src/App.css */
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.exercise-form input, 
.exercise-form textarea,
.exercise-form button {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.exercise-list {
  margin-top: 20px;
}

.exercise-item {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.exercise-item button {
  background-color: red

;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.exercise-item button:hover {
  background-color: darkred;
}
```

## Deploy com Surge

Para fazer o deploy do seu aplicativo usando Surge, siga os passos abaixo:

1. **Instale o Surge (se ainda não o fez):**

   ```bash
   npm install -g surge
   ```

2. **Crie uma build de produção do seu aplicativo:**

   ```bash
   npm run build
   ```

   Isso criará uma pasta `build` com os arquivos otimizados para produção.

3. **Faça o deploy com Surge:**

   ```bash
   surge ./build
   ```

   O Surge pedirá uma URL para o seu projeto. Você pode definir um nome de domínio personalizado ou aceitar o nome padrão fornecido pelo Surge.

4. **Acesse seu aplicativo:**
   - Após o deploy, você receberá um link para acessar seu aplicativo online.