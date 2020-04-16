import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const repository = await api.post('/repositories', {
      title: "GoStack 3",
      url: "ramon.mello.com",
      techs: "cerebro"
    });
    console.log(repository.data);
    console.log(repositories);
    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {

    const repository = repositories.find(
      repository => repository.id === id
    );
    const filterRepositories = repositories.filter(item => item.id !== repository.id)
    
    setRepositories(filterRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <strong>{repository.title}</strong>
            <p>repository.url</p>
            <p>repository.techs</p>
            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
