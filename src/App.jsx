import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  const [novaTarefa, setNovaTarefa] = useState('');

  const [mostrarPix, setMostrarPix] = useState(false);
  const chavePix = '2e12fbc3-53ca-4f14-a22b-f89eb25fe177';

  const copiarPix = () => {
    navigator.clipboard.writeText(chavePix);
    alert('Chave Pix Copiada!');
  };

  const [modoEscuro, setModoEscuro] = useState(false)

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;

    const nova = {
      id: Date.now(),
      texto: novaTarefa,
      feita: false,
    };

    setTarefas([
      ...tarefas, nova
    ]);
    setNovaTarefa('');
  };

  const alternarTarefa = (id) => {
    const atualizadas = tarefas.map(tarefa => tarefa.id === id ? {
      ...tarefa, feita: !tarefa.feita } : tarefa);
      setTarefas(atualizadas);
  };

  const removerTarefa = (id) => {
    const atualizadas = tarefas.filter(tarefa => tarefa.id !== id);
    setTarefas(atualizadas);
  };

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas])

  return (
    <div className={`container ${modoEscuro ? 'escuro' : ''}`}>

        <button className='toggle-tema' onClick={() => setModoEscuro(!modoEscuro)}>{modoEscuro ? '☀️ Modo Claro' : '🌙 Modo Escuro'}</button>

      <h1>Meu Planner Fácil 📝</h1>

      <div className='form'>
        <input type="text" placeholder='Digite sua tarefa...' value={novaTarefa} onChange={(e) => setNovaTarefa(e.target.value)} />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      <div className='pix-doacao'>
         <button onClick={() => setMostrarPix(true)}>💖 Apoie este projeto</button> 
      </div>

      {
        mostrarPix && (
          <div className='modal'>
            <div className='modal-conteudo'>
              <h2>Obrigado pelo apoio!🐶</h2>
              <p>Chave Pix:</p>
              <strong>{chavePix}</strong>
              <button onClick={copiarPix}>📋 Copiar chave</button>
              <button onClick={() => setMostrarPix(false)}>Fechar</button>
            </div>
          </div>
        )
      }

      <ul className="lista">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className={tarefa.feita ? 'feita' : ''}>
            <span onClick={() => alternarTarefa(tarefa.id)}>{tarefa.texto}</span>
            <button onClick={() => removerTarefa(tarefa.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
