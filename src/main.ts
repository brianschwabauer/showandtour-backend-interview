import { mockFetch } from './server';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Show & Tour Backend Interview</h1>
    <form id="client-form">
      <input type="text" placeholder="ID" name="id" id="id">
      <input type="text" placeholder="Name" name="name">
      <input type="text" placeholder="Company" name="company">
      <input type="email" placeholder="Email" name="email">
    </form>
    <div class="card">
      <button type="button" id="get-client-list">Fetch Client List</button>
      <button type="button" id="get-client">Get Client</button>
      <button type="button" id="update-client">Update Client</button>
      <button type="button" id="delete-client">Delete Client</button>
    </div>
    <pre id="output">Ready for Request</pre>
  </div>
`;

(() => {
  let fetching = false;
  const form = document.querySelector('form')!;
  const idElement = document.querySelector('#id')! as HTMLInputElement;
  const output = document.querySelector('#output')!;
  const getJSON = () =>
    JSON.stringify(Object.fromEntries(new FormData(form) as any));

  const fetchApi = async (path: string, method = 'GET') => {
    if (fetching) return;
    fetching = true;
    output.textContent = `Fetching`;
    const response = await mockFetch(path, {
      method: method || 'GET',
      ...(method === 'GET' ? {} : { body: getJSON() }),
    });
    await new Promise((resolve) => setTimeout(resolve, 200));
    try {
      let content = `API Response: ${response.status}`;
      const body = await response.json().catch(() => ({}));
      content += `\n${JSON.stringify(body, undefined, 2)}`;
      output.textContent = content;
    } catch (error) {
      output.textContent = `API threw error: ${error}`;
    }
    fetching = false;
  };

  const getClientListButton = document.querySelector('#get-client-list')!;
  getClientListButton.addEventListener('click', () => fetchApi(`/client`));
  const getClientButton = document.querySelector('#get-client')!;
  getClientButton.addEventListener('click', () =>
    fetchApi(`/client/${idElement.value}`)
  );
  const updateClientButton = document.querySelector('#update-client')!;
  updateClientButton.addEventListener('click', () =>
    fetchApi(`/client/${idElement.value}`, 'PATCH')
  );
  const deleteClientButton = document.querySelector('#delete-client')!;
  deleteClientButton.addEventListener('click', () =>
    fetchApi(`/client/${idElement.value}`, 'DELETE')
  );
})();
