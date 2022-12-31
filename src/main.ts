import { mockFetch } from './server';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Show & Tour Backend Interview</h1>
    <div class="card">
      <button type="button" id="fetch-clients">Fetch Clients</button>
    </div>
    <pre id="output"></pre>
  </div>
`;

(() => {
  const output = document.querySelector('#output')!;
  const fetchClients = document.querySelector('#fetch-clients')!;
  fetchClients.addEventListener('click', async () => {
    output.textContent = `Fetching`;
    const response = await mockFetch('/client');
    await new Promise((resolve) => setTimeout(resolve, 200));
    try {
      let content = `API Response: ${response.status}`;
      const body = await response.json();
      content += `\n${JSON.stringify(body, undefined, 2)}`;
      output.textContent = content;
    } catch (error) {
      output.textContent = `API threw error: ${error}`;
    }
  });
})();
