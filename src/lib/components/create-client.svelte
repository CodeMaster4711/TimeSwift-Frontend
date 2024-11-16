<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { token} from '$lib/config';
  import { get } from "svelte/store";

  export let show = false;

  let ClientLogo = '';
  let name = '';
  let id = '';
  let address = '';
  let errorMessage = '';  


  const dispatch = createEventDispatcher();

  const handleCancel = () => {
    dispatch('cancel');
  };

  const handleCreate = async () => {
    const clientData = { name, id, address, ClientLogo };
    console.log('Create client', clientData);
    try {
      const temptoken = get(token);
      const response = await fetch('http://localhost:3030/createclient', {
        method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    id: id,
                    address: address,
                    logo: ClientLogo,
                    token: temptoken
              })
        });
        if (response.ok) {
          dispatch('create', clientData);
          ClientLogo = '';
          name = '';
          id = '';
          address = '';
        }
      } catch (error) {
        console.error('Create failed', error);
      }
  };

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

      const maxSize = 40 * 1024; // 40 KB in Bytes

      if (file.size > maxSize) {
        let errorMessage = 'Die Datei ist zu groß. Maximal zulässig sind 40 KB.';
        return errorMessage;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        ClientLogo = e.target?.result as string;
        errorMessage = '';
      };
      reader.readAsDataURL(file);
    }
  };
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
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .popup-content {
    color: white;
    background: #1b1b1b;
    border-radius: 8px;
    padding: 20px;
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .popup-content .form-content {
    display: flex;
    gap: 20px;
  }

  .popup-content .form-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .popup-content input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .popup-content .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }

  .popup-content button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  .popup-content .cancel {
    background-color: #ff000000;
    border: 1px solid #ffffff;
    color: #fff;
  }

  .popup-content .create {
    background-color: #00ff0000;
    border: 1px solid #ffffff;
    color: #fff;
  }

  .popup-content .cancel:hover {
    background-color: #cc0000;
    border: 1px solid #cc0000;
  }

  .popup-content .create:hover {
    background-color: #00cc00;
    border: 1px solid #00cc00;
  }

  .input-data {
    position: relative;
    margin-bottom: 20px;
    width: 90%;
  }
  .input-data input {
    width: 100%;
    border: none;
    color: #ffffff;
    border-bottom: 2px solid #292929;
    outline: none;
    font-size: 17px;
    padding: 10px 0;
    background: none;
  }
  .input-data label {
    position: absolute;
    pointer-events: none;
    bottom: 10px;
    left: 0;
    font-size: 16px;
    transition: all 0.3s ease;
  }
  .input-data input:focus ~ label,
  .input-data input:valid ~ label {
    transform: translateY(-32px);
    font-size: 13px;
    color: #F00101;
  }
  .input-data .underline {
    position: absolute;
    bottom: 0;
    height: 2px;
    width: 100%;
  }
  .input-data .underline:before {
    position: absolute;
    content: "";
    height: 2px;
    width: 100%;
    background: #F00101;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }
  .input-data input:focus ~ .underline:before,
  .input-data input:valid ~ .underline:before {
    transform: scale(1);
  }

  .clientimg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .clientimgfull {
    max-width: 100%;
    max-height: 100%;
  }

  .button-logo {
    align-self: center;
    background-color: #2d2d2d;
    width: 50%;
    color: #fff;
    font-size: bold;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .button-logo:hover {
    transition: ease-in-out 0.3s;
    background-color: #F00101;
  }

  .error-message {
    color: #F00101;
    font-size: 16px;
    text-align: center;
  }
  
</style>

{#if show}
  <div class="popup-overlay">
    <div class="popup-content">
      <h2>Create Client</h2>
      <div class="form-content">
        <div class="form-column">
          <div class="input-data">
            <input type="text" bind:value={name} required>
            <div class="underline"></div>
            <label>Name</label>
          </div>
          <div class="input-data">
            <input type="address" bind:value={address} required>
            <div class="underline"></div>
            <label>Address</label>
          </div>
          <div class="input-data">
            <input type="text" bind:value={id} required>
            <div class="underline"></div>
            <label>ID</label>
          </div>
        </div>
        <div class="form-column">
          <div class="clientimg">
            {#if ClientLogo}
              <img src={ClientLogo} class="clientimgfull" />
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="25vh" height="25vh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round">
                <path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>   
            {/if}
          </div>
          <button class="button-logo" on:click={handleEditClick}>Logo</button>
          <input id="fileInput" type="file" accept="image/*" max="" style="display: none;" on:change={handleFileChange} />
          {#if errorMessage}
            <div class="error-message">{errorMessage}</div>
          {/if}
        </div>
      </div>
      <div class="button-container">
        <button class="cancel" on:click={handleCancel}>Cancel</button>
        <button class="create" on:click={handleCreate}>Create</button>
      </div>
    </div>
  </div>
{/if}