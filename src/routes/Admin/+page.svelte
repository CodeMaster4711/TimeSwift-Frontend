<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { isCollapsed } from '$lib/navbar';
  import { token, id} from '$lib/config';
  import AUser from '$lib/components/admin-user.svelte';
  import AGroup from '$lib/components/admin-group.svelte';

  let localIsCollapsed = false;

  isCollapsed.subscribe(value => {
      localIsCollapsed = value;
  });

  let showUserSettings = false;
    let showGroupSettings = false;
    let showOrganization = false;
    let showLicence = false;

    function toggleUserSettings() {
        showUserSettings = true;
        showGroupSettings = false;
        showOrganization = false;
        showLicence = false;
    }

    function toggleGroupSettings() {
        showUserSettings = false;
        showGroupSettings = true;
        showOrganization = false;
        showLicence = false;
    }

    function toggleOrganization() {
        showUserSettings = false;
        showGroupSettings = false;
        showOrganization = true;
        showLicence = false;
    }

    function toggleLicence() {
        showUserSettings = false;
        showGroupSettings = false;
        showOrganization = false;
        showLicence = true;
    }
</script>

<div class:collapsed={localIsCollapsed} class="background"></div>
<div class:collapsed={localIsCollapsed} class="main">
  <div class="selector">
      <div class="header">Admin Settings</div>
      <!-- Group Settings -->
        <div class="customer-list">
          <div class="customer" on:click={toggleGroupSettings}>
            <div class="placeholder"><span class="material-symbols-outlined">groups</span></div>
            <div class="customer-details">
                <p>Group Settings</p>
            </div>
        </div>
        <!-- User Settings -->
          <div class="customer" on:click={toggleUserSettings}>
            <div class="placeholder"><span class="material-symbols-outlined">manage_accounts</span></div>
            <div class="customer-details">
                <p>User Settings</p>
            </div>
        </div>  
        <!-- Organization -->
          <div class="customer" on:click={toggleOrganization}>
            <div class="placeholder"><span class="material-symbols-outlined">apartment</span></div>
            <div class="customer-details">
                <p>Organization</p>
            </div>
        </div>
        <!-- Licence -->
          <div class="customer" on:click={toggleLicence}>
            <div class="placeholder"><span class="material-symbols-outlined">license</span></div>
            <div class="customer-details">
                <p>Licence</p>
            </div>
        </div>
        </div>
  </div>
  <div class="databaswindow">
       {#if showUserSettings}
            <AUser/>
        {/if}
        {#if showGroupSettings}
            <AGroup/>
        {/if}
        {#if showOrganization}
            <Organization/>
        {/if}
        {#if showLicence}
            <Licence/>
        {/if}
  </div>
</div>



<style>

  .main {
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      display: flex;
      margin-left: 16vw;
      margin-top: 2vh;
      transition: margin-left 0.3s;
      flex-direction: row;
  }
  .background {
      top: 1vh;
      position: absolute;
      width: 94vw;
      height: 99vh;
      background-color: #000;
      z-index: 0;
      margin-left: 15vw;
      border-radius: 20px 20px 0 0;
      transition: margin-left 0.3s, width 0.3s;
  }
  .collapsed.main {
      margin-left: 6vw; /* Adjust this value as needed */
  }
  .collapsed.background {
      margin-left: 5vw; /* Adjust this value as needed */
  }


  .selector {
      display: flex;
      flex-direction: column;
      width: 300px;
      height: 95vh;
      background-color: #1d1d1d;
      z-index: 1;
      border-radius: 20px;
      margin-right: 1vw;
      padding: 10px;
  }
  .customer-list {
      display: flex;
      flex-direction: column;
      overflow-y: auto; /* Ermöglicht das Scrollen innerhalb des Containers */
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none;
      gap: 10px;  
  }
  .databaswindow {
      flex-grow: 1;
      margin-right: 2vw;
      height: 97vh;
      background-color: #1d1d1d;
      z-index: 5000;
      border-radius: 20px;
  }
  .full-width-height {
      width: 100%; /* Volle Breite des Containers */
      height: 50px;
  }
  .header {
      font-weight: bold;
      color: rgb(255, 255, 255);
      font-size: 30px;
      margin-left: 10px;
      margin-bottom: 20px;
  }
  .customer {
      display: flex;
      align-items: center;
      background-color: #2d2d2d;
      border-radius: 4px;
      padding: 10px;
      cursor: pointer;
  }
  .customer-details p {
      margin: 0;
      color: #ffffff;
      font-size: 20px;
      font-weight: bold;
  }

  .placeholder {
      margin-right: 10px;
      display: flex;
      border-radius: 5px;
      background-color: #757575;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      object-fit: cover;
  }
</style>
