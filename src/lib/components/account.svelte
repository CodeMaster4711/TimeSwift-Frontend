<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { fullname, Semail, ICON} from '$lib/config';

  let username: string | undefined;
  let userimg: string | undefined;
  export let showsettings = false;
  export let settingstoggle;

  onMount(() => {
    username = get(fullname);
    userimg = get(ICON);
  });

  const handleEditClick = () => {
    console.log('Edit clicked');
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        userimg = e.target?.result as string;
        // Hier kannst du den Base64-String speichern oder weiterverarbeiten
        console.log(userimg);
      };
      reader.readAsDataURL(file);
    }
  };
</script>

<div class="account-container">
  <h1>Account</h1>
  <div id="bar" class="bartop"></div>
  <div class="userimg">
      <svg xmlns="http://www.w3.org/2000/svg" width="25vh" height="25vh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>   
    <button class="button-edit" on:click={handleEditClick}>Edit</button>
    <input id="fileInput" type="file" accept="image/*" style="display: none;" on:change={handleFileChange} />
  </div>
  <div class="mail">
    <p>E-Mail-Adresse: {get(Semail)}</p>
    <button>E-Mail ändern</button>
  </div>
  <br>
  <div id="bar"></div>
  <br>
  <div class="settings-group">
    <label for="username">Username:</label><br>
    <div class="input-container">
      <span class="material-symbols-outlined">account_circle</span>
      <input type="text" id="username" placeholder={username} bind:value={username} />
    </div>
    <button>Username ändern</button>
  </div>
  <div id="bar"></div>
  <div class="delete-account">
    <h3>Account löschen</h3>
    <p>Wenn Sie Ihr Konto löschen, werden alle Ihre Daten gelöscht und können nicht wiederhergestellt werden.</p>
    <button>Account löschen</button>
  </div>
</div>

<style>
  #bar {
      width: 90%; /* Breite der Bar */
      height: 0.5px; /* Höhe der Bar */
      background: #D9D9D9; /* Farbe der Bar */
      border-radius: 20px; /* Runde Ecken */
      margin-left: 0px;
   }

  .bartop {
      width: 60% !important;
  }    
  .account-container {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    display: flex;
    flex-direction: column;
    padding: 2em;
    max-width: 100%;
    box-sizing: border-box;
  }

  .userimg {
    position: absolute;
    right: 12%;
    top: 7%;
  }

  .button-edit {
    margin-top: 1em;
    padding: 0.5em 1em;
    font-size: 1em;
    border-radius: 10px;
    background-color: transparent;
    border: 2px solid white;
    color: white;
    cursor: pointer;
  }

  .mail, .settings-group, .delete-account {
    width: 100%;
    max-width: 400px;
    margin-bottom: 2em;
  }

  .settings-group label {
    display: block;
    margin-bottom: 0.5em;
  }

  .input-container {
    position: relative;
    width: 100%;
  }

  .input-container .material-symbols-outlined {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
  }

  .settings-group input {
    width: 100%;
    padding: 0.5em 0.5em 0.5em 2.5em; /* Platz für das Icon */
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .settings-group button {
    margin-top: 1em;
    padding: 0.5em 1em;
    font-size: 1em;
  }

  .delete-account button {
    margin-top: 1em;
    padding: 0.5em 1em;
    font-size: 1em;
    background-color: red;
    color: white;
    border: none;
    border-radius: 4px;
  }
</style>