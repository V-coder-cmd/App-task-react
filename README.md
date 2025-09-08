**Guia de Desenvolvimento do App: Gerenciador de Tarefas (To-Do List)**

---

## Estrutura do Projeto

```
src/
 ├── main.jsx
 ├── index.css
 ├── App.jsx
 ├── App.module.css
 └── components/
      ├── Header/
      │     ├── index.jsx
      │     └── Header.module.css
      ├── TaskInput/
      │     ├── index.jsx
      │     └── TaskInput.module.css
      ├── TaskList/
      │     ├── index.jsx
      │     └── TaskList.module.css
      ├── TaskItem/
      │     ├── index.jsx
      │     └── TaskItem.module.css
      └── Clock/
            ├── index.jsx
            └── Clock.module.css
```

Cada componente possui seu CSS separado utilizando **CSS Modules**, garantindo que os estilos sejam isolados e não afetem outros componentes.

---

## Lógica do App

### 1. `main.jsx`

- Ponto de entrada da aplicação.
- Renderiza o componente `<App />` dentro do `root` do `index.html`.
- Inclui os estilos globais `index.css`.

### 2. `App.jsx`

- Componente principal que gerencia o estado da aplicação.
- **Estados (`useState`)**:
  - `tasks`: array de tarefas com propriedades `{ id, text, completed }`.
- **Efeitos (`useEffect`)**:
  - Salva e carrega tarefas do `localStorage` para persistência.
- **Funções principais**:
  - `addTask(task)`: adiciona uma nova tarefa.
  - `toggleTask(id)`: marca tarefa como concluída ou pendente.
  - `editTask(id, newText)`: edita o texto de uma tarefa.
  - `deleteTask(id)`: exclui uma tarefa.
  - `restoreTask(id)`: restaura uma tarefa concluída para pendente.
- Divide a tela em **dois containers**:
  - Tarefas pendentes (editáveis)
  - Tarefas concluídas (apenas restaurar)
- Inclui o componente `<Clock />` que exibe data e hora em tempo real.

### 3. `Header/index.jsx`

- Exibe o título do aplicativo.
- Simples, com estilo centralizado e cores elegantes.

### 4. `Clock/index.jsx`

- Utiliza `useState` para armazenar a data e hora atuais.
- Utiliza `useEffect` para atualizar o relógio a cada segundo com `setInterval`.
- Exibe data e hora em elementos `<span>` lado a lado.
- Estilizado com cores e fundo azul elegante.

### 5. `TaskInput/index.jsx`

- Formulário para inserir novas tarefas.
- Controla o valor do input com `useState`.
- Ao submeter (`onSubmit`), chama `addTask` do `App.jsx`.
- Botão estilizado para adicionar tarefas.

### 6. `TaskList/index.jsx`

- Recebe lista de tarefas (pendentes ou concluídas) via props.
- Mapeia cada tarefa para um `<TaskItem />`.
- Recebe `isCompletedList` como prop para ajustar comportamento:
  - Pendentes: editáveis e concluíveis
  - Concluídas: apenas restaurar

### 7. `TaskItem/index.jsx`

- Cada tarefa individual.
- Controla estado de edição (`isEditing`) com `useState`.
- Aplica diferentes estilos se a tarefa estiver concluída (`completedHighlight`).
- Funções:
  - `handleEdit()`: permite editar tarefa somente se não estiver concluída.
  - Clique no texto marca tarefa como concluída (pendente → concluída) se não for lista concluída.
  - Botão de editar salva alterações ou alterna para modo de edição.
  - Botão de deletar remove tarefa ou restaura se for lista de concluídas.
- Estilos incluem destaque para tarefas concluídas e responsividade.

---

## Hooks do React explicados

### `useState`

- Permite criar **variáveis de estado** dentro de componentes funcionais.
- Cada chamada retorna um **valor do estado** e uma **função para atualizá-lo**.
- Exemplo no App:

```jsx
const [tasks, setTasks] = useState([]); // lista de tarefas
```

- Sempre que o estado muda, o React **re-renderiza** o componente com os novos valores.

### `useEffect`

- Permite executar **efeitos colaterais** dentro do componente, como acessar API ou `localStorage`.
- Pode ser configurado para rodar:
  - Sempre que o componente renderiza
  - Apenas na primeira renderização (`[]`)
  - Sempre que uma variável específica mudar (`[tasks]`)
- Exemplo no App:

```jsx
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]); // salva tarefas sempre que mudar
```

- Também usado no `Clock` para atualizar a hora a cada segundo.

---

## Diagrama de Fluxo do App

```
      +----------------+
      |  App.jsx       |
      |(estado tasks)  |
      +--------+-------+
               |
      +--------v--------+
      |  TaskInput      | <-- adiciona nova tarefa
      +--------+--------+
               |
       +-------v-------+
       |  TaskList      | <-- lista pendentes ou concluídas
       +---+--------+---+
           |        |
   +-------v-+    +-v-------+
   | TaskItem|    | TaskItem| <-- tarefas individuais
   +---+-----+    +----+---+
       |              |
  toggleTask()   restoreTask()
  editTask()     deleteTask()
```

- **Fluxo resumido**:
  1. Usuário adiciona tarefa via `TaskInput` → atualiza estado `tasks`
  2. `TaskList` renderiza cada `TaskItem` de acordo com o estado
  3. `TaskItem` pode ser editado, concluído ou restaurado
  4. `useEffect` salva tarefas no `localStorage`
  5. `Clock` exibe data/hora em tempo real

---

## Comentários sobre lógica e boas práticas

- **useState**: gerencia estado local de cada componente e da lista de tarefas.
- **useEffect**: mantém persistência no localStorage e atualiza relógio em tempo real.
- **Props**: passam funções e estados entre componentes para comunicação hierárquica.
- **CSS Modules**: evita conflitos de nomes e mantém estilo encapsulado.
- **Responsividade**: media queries ajustam containers e relógio em telas pequenas.
- **Separação de responsabilidades**: cada componente tem uma função clara (Input, Lista, Item, Header, Clock).
- **Interatividade**: tarefas pendentes podem ser editadas e concluídas; tarefas concluídas podem ser restauradas.
- **Acessibilidade**: botões possuem texto ou ícone claro indicando ação (✏️, 💾, ✕, ↩️).

---

## Observações

1. Sempre comentar código explicando o que cada função faz.
2. Utilizar CSS Modules para manter estilo isolado.
3. Manter lógica de estado clara, separando funções de adição, edição, conclusão e restauração.
4. Testar a responsividade em diferentes tamanhos de tela.
5. Aproveitar hooks do React (`useState`, `useEffect`) para funcionalidades dinâmicas.