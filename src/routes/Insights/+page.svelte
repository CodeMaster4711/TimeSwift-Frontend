<script>
  import { get } from 'svelte/store';
  import {currentUser, token} from '$lib/auth';

  let weekNumber = 4;
  let weekData = null; // Variable zum Speichern der Daten

  function click() {
      fetch(`http://localhost:3030/db-data/${weekNumber}` , {
          headers: {
              'Authorization':`Bearer ${get(token)}`
          },
          cors: 'no-cors',
      })
      .then(response => response.text())
      .then(data => {
          weekData = JSON.parse(data); // Speichern Sie die Daten in der weekData Variable
          console.log(weekData); // Loggen Sie die Daten
      })
      .catch(error => console.error('Error:', error));
  }
</script>

<button on:click={click}>Daten abrufen</button>

<!-- Zeigen Sie die Daten an, wenn sie vorhanden sind -->
{#if weekData}
  <p>Die Daten für Woche {weekNumber} sind: {weekData}</p>
{/if}