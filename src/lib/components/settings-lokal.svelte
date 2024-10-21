<!-- Settings_lokal.svelte -->
<script>
  export let showsettings = false;
  export let settingstoggle;
</script>

<style>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .popup-content {
    background: rgb(46, 46, 46);
    color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 600px;
    display: flex;
    flex-direction: column;
    height: 80vh; /* Höhe des Popups */
  }

  .menu {
    width: 30%;
    border-right: 1px solid #ccc;
    padding-right: 20px;
  }

  .menu h2 {
    margin-bottom: 20px;
  }

  .menu ul {
    list-style: none;
    padding: 0;
  }

  .menu ul li {
    margin-bottom: 10px;
  }

  .menu ul li a {
    color: white;
    text-decoration: none;
  }

  .content {
    flex-grow: 1; /* Nimmt den verfügbaren Platz ein */
    padding-left: 20px;
    overflow-y: auto; /* Ermöglicht Scrollen, wenn der Inhalt zu groß ist */
  }

  .content h2 {
    margin-bottom: 20px;
  }

  .settings-group {
    margin-bottom: 20px;
  }

  .settings-group label {
    display: block;
    margin-bottom: 5px;
  }

  .settings-group input {
    width: 100%;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 10px;
  }
</style>

{#if showsettings}
  <div class="popup-overlay" on:click={settingstoggle}>
    <div class="popup-content" on:click|stopPropagation>
      <div style="display: flex; flex-grow: 1;">
        <div class="menu">
          <h2>Menu</h2>
          <ul>
            <li><a href="#account">Account</a></li>
            <li><a href="#appearance">Appearance</a></li>
            <li><a href="#LandB">Billing and Licence</a></li>
            <li><a href="#Password">Password</a></li>
            <li><a href="#Sessions">Sessions</a></li>
            <li><a href="#Organization">Organization</a></li>
          </ul>
        </div>
        <div class="content">
          <h2>Settings</h2>
          <!-- Weitere Einstellungen hier hinzufügen -->
        </div>
      </div>
      <div class="footer">
        <div class="buttons">
          <button on:click={settingstoggle}>Close</button>
          <button on:click={settingstoggle}>Save</button>
        </div>
      </div>
    </div>
  </div>
{/if}