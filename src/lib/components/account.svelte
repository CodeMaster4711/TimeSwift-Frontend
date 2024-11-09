<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { fullname, Semail, ICON} from '$lib/config';

  let username: string | undefined;
  let tempuserimg: string | undefined;
  let userimg: string | undefined;
  export let showsettings = false;
  export let settingstoggle;
  let showEmailPopup = false;
  let showDeletePopup = false;
  let oldEmail: string | undefined;
  let newEmail: string | undefined;
  let tempusername: string | undefined;
  let isLoading = false;
  let deleteEmail = '';

  onMount(() => {
    oldEmail = get(Semail);
    username = get(fullname);
    userimg = get(ICON);
    tempusername = get(fullname);
    tempuserimg = userimg;
    newEmail = oldEmail;
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
        tempuserimg= e.target?.result as string;
        console.log(userimg);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmailChangeClick = () => {
    showEmailPopup = true;
  };

  const handleClosePopup = () => {
    showEmailPopup = false;
  };

  const handleSaveEmail = () => {
    // Hier können Sie die Logik zum Speichern der neuen E-Mail-Adresse hinzufügen
    console.log('Old Email:', oldEmail);
    console.log('New Email:', newEmail);
    showEmailPopup = false;
  };

  const handleUsernameChange = () => {
    isLoading = true;
    setTimeout(() => {
      console.log('New Username:', tempusername);
      isLoading = false;
    }, 2000); 
  };

  
  const handleDeleteAccountClick = () => {
    showDeletePopup = true;
  };

  const handleCancelDelete = () => {
    showDeletePopup = false;
  };

  const handleConfirmDelete = () => {
    if (deleteEmail === oldEmail) {
      console.log('Account deleted for email:', deleteEmail);
      showDeletePopup = false;
    } else {
      alert('E-Mail-Adresse stimmt nicht überein.');
    }
  };
</script>

<div class="account-container">
  <h1>Account</h1>
  <div id="bar" class="bartop"></div>
  <div class="userimg">
    {#if tempuserimg}
      <img src={tempuserimg} class="userimgfull" />
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="25vh" height="25vh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round">
        <path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>   
    {/if}
  </div>
  <button class="button-edit" on:click={handleEditClick}>Edit</button>
  <input id="fileInput" type="file" accept="image/*" style="display: none;" on:change={handleFileChange} />

  <div class="mail">
    <p>E-Mail-Adresse: {get(Semail)}</p>
    <button on:click={handleEmailChangeClick}>E-Mail ändern</button>
  </div>
  <br>
  <div id="bar"></div>
  <br>
  <div class="settings-group">
    <label for="username">Username:</label><br>
    <div class="input-container">
      <span class="material-symbols-outlined">account_circle</span>
      <input type="text" id="username" placeholder={tempusername} bind:value={tempusername} />
      {#if isLoading}
       <span class="loader"></span>
    {/if}
    </div>
    <button on:click={handleUsernameChange}>Username ändern</button>
  </div>
  <div id="bar"></div>
  <div class="delete-account">
    <h3>Account löschen</h3>
    <p>Wenn Sie Ihr Konto löschen, werden alle Ihre Daten gelöscht und können nicht wiederhergestellt werden.</p>
    <button on:click={handleDeleteAccountClick}>Account löschen</button>
  </div>
  {#if showEmailPopup}
  <div class="popup-overlay">
    <div class="popup">
      <h2>E-Mail ändern</h2>
      <label for="oldEmail">Alte E-Mail:</label>
      <input type="email" id="oldEmail" bind:value={oldEmail} readonly />
      <label for="newEmail">Neue E-Mail:</label>
      <input type="email" id="newEmail" bind:value={newEmail} />
      <button on:click={handleSaveEmail}>Speichern</button>
      <button on:click={handleClosePopup}>Abbrechen</button>
    </div>
  </div>
{/if}

{#if showDeletePopup}
  <div class="popup-overlay">
    <div class="popup">
      <h2>Account löschen</h2>
      <p>Bitte bestätigen Sie Ihre E-Mail-Adresse, um das Konto zu löschen:</p>
      <input type="email" bind:value={deleteEmail} placeholder="E-Mail-Adresse" />
      <button on:click={handleConfirmDelete}>Löschen</button>
      <button on:click={handleCancelDelete}>Abbrechen</button>
    </div>
  </div>
{/if}
</div>


<style>
  .userimgfull {
    width: 25vh;
    height: 25vh;
    border-radius: 50%;
    position: absolute;
    right: 12%;
    top: 7%;
  }
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
    position: absolute;
    right: 12%;
    top: 30%;
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


  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1200;
  }

  .popup {
    background: rgb(29, 29, 29);
    border: 1px solid #ff0000;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .popup h2 {
    margin-top: 0;
  }

  .popup label {
    display: block;
    margin-top: 10px;
  }

  .popup input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    box-sizing: border-box;
  }

  .popup button {
    margin-top: 10px;
    padding: 10px 20px;
  }

  .popup button + button {
    margin-left: 10px;
  }

  .loader {
  width: 25px;
  height: 25px;
}

.loader::before {
 content: "";
 box-sizing: border-box;
 position: absolute;
 width: 25px;
 height: 25px;
 border-radius: 50%;
 border-top: 2px solid #ff0000;
 border-right: 2px solid transparent;
 animation: spinner8217 0.8s linear infinite;
}

@keyframes spinner8217 {
 to {
  transform: rotate(360deg);
 }
}

</style>