<!-- Settings_lokal.svelte -->
<script lang="ts">
    import { get } from "svelte/store";
    // @ts-ignore
    import { onMount } from "svelte";
    import { tempfullname, tempICON, tempdelete as tempDeleteStore, tempemail } from "$lib/settings";
    import { fullname, ICON, Semail, id, token } from "$lib/config";



  export let showsettings = false;
  export let settingstoggle;
  
  let tempid: string | undefined;
  let tempToken: string | undefined;
  // @ts-ignore
  let currentComponent = null;

  let tfullname: string | undefined;
  let tICON: string | undefined;
  let temail: string | undefined;
  let tdelete: boolean | undefined;

  onMount (() => {
    tfullname = get(tempfullname);
    tICON = get(tempICON);
    temail = get(tempemail);
    tdelete = get(tempDeleteStore);
    tempid = get(id);
    tempToken = get(token);
  });

  const loadComponent = async (component) => {
    switch (component) {
      case 'account':
        currentComponent = (await import('./account.svelte')).default;
        break;
      // Weitere Komponenten hier hinzufügen
      default:
        currentComponent = null;
    }
  };

  const handleClose = () => {
    // Temp Stores leeren
    tempfullname.set('');
    tempICON.set('');
    tempDeleteStore.set(false);
    tempemail.set('');
    showsettings = false;
  };

  const handleSave = async() => {
    await update(tempid, tempToken, tdelete);
    showsettings = false;
};

  async function update(temp : string | undefined, temptok : string | undefined, del : boolean | undefined) {
      console.log("id", temp , "token", temptok, "fullname", tfullname, "email", temail,  "delete", tdelete);
    try {
       
       const response = await fetch (`http://localhost:3030/userupdate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: temp,
          token: temptok,
          fullname: tfullname,
          email: temail,
          icon: tICON,
          delete: del,
        }),
    });
    console.log("id", temp , "token", temptok, "fullname", tfullname, "email", temail, "icon", tICON, "delete", tdelete);
    console.log('Update successful', response);
    fullname.set(tfullname);
    ICON.set(tICON);
    Semail.set(temail);
    
  } catch (error) {
    console.error('Update failed', error);
}
}

</script>

<style>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: transparent;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .popup-content {
    color: white;
    padding: 20px;
    width: 80%;
    display: flex;
    flex-direction: column;
    height: 90%; /* Höhe des Popups */
    
  }

  .menu {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    width: 20%;
    left:5%;
    padding: 20px;
    border-right: 1px solid #000000;
    padding-right: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 20px 0 0 20px;
    backdrop-filter: blur(30px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.3em;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .menu h2 {
    margin-bottom: 20px;
    font-size: 1.5em;
  }

  .menu ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }

  .menu ul li {
    margin-bottom: 10px;
    width: 100%;
  }

  .menu ul li a {
    text-decoration: none;
    color: white;
    display: block;
    padding: 10px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  .menu ul li a:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .content {
    border-radius: 0 20px 20px 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color:#2b2b2b ;
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto; /* Ermöglicht das Scrollen, wenn der Inhalt zu groß ist */
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
    position: absolute;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    bottom: 7%;
    right: 15%;
    padding-top: 10px;
    z-index: 1001;
  }

  .close {
    padding: 10px 20px;
    background-color: transparent;
    color: rgb(255, 255, 255);
    border: 2px solid white;
    border-radius: 4px;
    cursor: pointer;
  }
  .close:hover {
    padding: 10px 20px;
    background-color: #ff0000;
    color: rgb(0, 0, 0);
    border: 2px solid #ff0000;
    border-radius: 4px;
    cursor: pointer;
  }

  .save {
    padding: 10px 20px;
    background-color: transparent;
    color: rgb(255, 255, 255);
    border: 2px solid white;
    border-radius: 4px;
    cursor: pointer;
  }
  .save:hover {
    padding: 10px 20px;
    background-color: #00ff00;
    color: rgb(0, 0, 0);
    border: 2px solid #00ff00;
    border-radius: 4px;
    cursor: pointer;
  }


</style>

{#if showsettings}
  <div class="popup-overlay" on:click={settingstoggle}>
    <div class="popup-content" on:click|stopPropagation>
      <div style="display: flex; flex-grow: 1;">
        <div class="menu">
          <h2>Menu</h2>
          <ul>
            <li><a href="#account" on:click={() => loadComponent('account')}>Account</a></li>
            <li><a href="#appearance" on:click={() => loadComponent('appearance')}>Appearance</a></li>
            <li><a href="#LandB" on:click={() => loadComponent('billing')}>Billing and Licence</a></li>
            <li><a href="#Password" on:click={() => loadComponent('password')}>Password</a></li>
            <li><a href="#Sessions" on:click={() => loadComponent('sessions')}>Sessions</a></li>
            <li><a href="#Organization" on:click={() => loadComponent('organization')}>Organization</a></li>
          </ul>
        </div>
        <div class="content">
          {#if currentComponent}
            <svelte:component this={currentComponent} />
          {/if}
        </div>
      </div>
      <div class="footer">
        <div class="buttons">
          <button class="close" on:click={handleClose}>Close</button>
          <button class="save" on:click={handleSave}>Save</button>
        </div>
      </div>
    </div>
  </div>
{/if}