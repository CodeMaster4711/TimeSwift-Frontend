<script lang="ts">
    export let selectedCustomer;
    import LocationAdder from './location-bar.svelte';
    import Network from './network.svelte';
    import Networkadder from './network.svelte';
    let newLocation = '';
    let locations: string[] = [];
    let currentTab = 'Informations';

    const tabs = ['Informations', 'Networkplan', 'Locations & Sites'];

    $: if (selectedCustomer) {
        currentTab = 'Informations';
    }

    const selectTab = (tab) => {
        currentTab = tab;
    };

    function addLocation() {
        if (newLocation.trim() !== '') {
            locations.push(newLocation);
            newLocation = '';
        }
    }    
</script>

<div class="client-database">
    <div class="client-icon">
        {#if selectedCustomer.logo && selectedCustomer.logo.startsWith('data:image')}
            <img src={selectedCustomer.logo} alt="Client Logo" class="client-logo" />
        {:else}
            {selectedCustomer.icon}
        {/if}
    </div>
    <div class="client-details">
        <h2>{selectedCustomer.name}</h2>
        <p>{selectedCustomer.manageid}</p>
    </div>
</div>

<div class="tabs">
    {#each tabs as tab}
        <button class:active={currentTab === tab} on:click={() => selectTab(tab)}>{tab}</button>
    {/each}
</div>

<div class="tab-content">
    {#if currentTab === 'Informations'}
        <div class="maininfos">
            <h3>Informations</h3>
        </div>    
    {:else if currentTab === 'Networkplan'}
        <div class="mainnetwork">
            <div class="selector"> 
                <Network {locations} clientId={selectedCustomer.id}/>
            </div>
        </div>
    {:else if currentTab === 'Locations & Sites'}
        <div class="mainsites">
            <div class="selector"> 
                <LocationAdder {locations} clientId={selectedCustomer.id}/>
            </div>
        </div>
    {/if}
</div>

<style>
     .client-database {
        display: flex;
        align-items: center;
        padding: 20px;
        border-radius: 8px;
        justify-content: space-between; /* Platz zwischen den Elementen */
    }
    .client-icon {
        margin-right: 20px;
    }
    .client-logo {
        border-radius: 10px;
        width: 70px;
        height: 70px;
        object-fit: cover;
    }
    .client-details {
        color: #ffffff;
        font-family: Arial, sans-serif;
        flex-grow: 1; /* Nimmt den verfügbaren Platz ein */
    }
    .client-details h2 {
        margin: 0;
        font-size: 24px;
    }
    .client-details p {
        margin: 5px 0 0;
        font-size: 16px;
    }
    .tabs {
        margin-left: 20px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        background-color: #292929;
        width: 96%;
        height: 30px;
        margin-top: 20px;
    }
    .tabs button {
        border-radius: 5px;
        padding: 5px;
        border: none;
        background-color: #292929;
        color: #ffffff;
        cursor: pointer;
        flex-grow: 1; /* Gleichmäßige Verteilung der Buttons */
        text-align: center; /* Zentrierung des Textes */
    }
    .tabs button.active {
        border-radius: 5px;
        background-color: #ffffff;
        color: black;
        transition: all 0.3s;
    }
    .tab-content {
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 10px; /* Abstand zur unteren Leiste */
        flex-grow: 0;
        width: 96%;
        height: calc(100% - 190px); /* Höhe des Inhaltsbereichs */
        display: flex;
        flex-direction: column;
    }
    .maininfos {
        color: #ffffff;
        padding: 20px;
        background-color: #292929;
        border-radius: 8px;
    }

    .maininfos {
        overflow-y: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;   
    }

    

</style>