<script lang="ts">
    import { onMount } from 'svelte';
    import { token} from '$lib/config';
    import { get } from 'svelte/store';

    export let clientId: string;
    export let locations: string[] = [];
    let newLocation = '';
    let temptoken: string | undefined;
    temptoken = get(token);
    let selectedLocation = null;

    let mapUrl = '';


    function addLocation() {
        if (newLocation.trim() !== '') {
            locations = [...locations, newLocation];
            newLocation = '';
            updateMapUrl();
        }
    }


    function addDummyLocation() {
        locations = [...locations, 'London'];
        updateMapUrl();
    }


    async function fetchLocations(id: string, T: string | undefined) {
        if (T == undefined) {
            console.error('Token is undefined');
            return false;
        }
        try {
            console.log('Token:', T);
            const response = await fetch(`http://localhost:3030/clientlocations?token=${T}&clientId=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log('Response:', response);
                const data = await response.json();
                if (Array.isArray(data.items)) {
                    locations = data.items.flat(); // Flatten the array if it's nested
                    console.log(locations);
                } else {
                    console.error('Response items are not an array:', data.items);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    function getinfos(location) {
        console.log('Get Infos');
        selectedLocation = location;
        console.log(selectedLocation);
    }

    onMount(() => {
        console.log('Client ID location-bar:', clientId);
        fetchLocations(clientId, temptoken);
    });
</script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<div class="main">
    <div class="location-bar">
        <ul class="location-list">
            <div class="header">Sites</div>
            {#each locations as location}
                <li class="location-item" on:click={() => getinfos(location)}>{location.city}</li>
            {/each}
            <button class="addlocation" on:click={addDummyLocation}>+</button>
        </ul>
    </div>
    <div class="datawindow">
        {#if selectedLocation}
            <div class="header-container">
                <div class="headerdata">
                    {selectedLocation.city}
                </div>
                <div class="header-line"></div>
            </div>
            <div class="order">
                <div class="address">
                    <div class="address-header"><span class="material-symbols-outlined">distance</span> Address</div>
                    <span class="address-text">{selectedLocation.street} {selectedLocation.housenumber}</span> <br>
                    <span class="address-text">{selectedLocation.city} {selectedLocation.postcode}</span>
                    <div class="map-link">
                        <button class="map-button" on:click={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedLocation.street}+${selectedLocation.housenumber},+${selectedLocation.city}`, '_blank')}>
                            View on Google Maps
                        </button>
                    </div>
                </div>
                <div class="description">
                    <div class="header-dis">Description</div>
                    <span class="description-text">{selectedLocation.description || 'Nothing here yet ＞︿＜ ...'}</span>
                </div>
            </div>
        {/if}
    </div> 
</div>
<style>

    iframe {
        width: 100%;
        height: 400px;
        border: none;
    }
    .main {
       display: flex;
       flex-direction: row;
    }

    .location-bar {
        flex-direction: row;
        display: flex;
        justify-content: center;
        justify-self: left;
        width: 150px;
        height: calc(100vh - 230px);
        padding: 10px;
        background-color: #292929;
        border-radius: 8px;
        color: #ffffff;
        overflow-y: auto;
        scrollbar-width: none; 
        -ms-overflow-style: none;   
    }
    .header {
        justify-self: center;
        display: flex;
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 10px;
    }

    .addlocation {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
        background-color: #1e1e1e;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        cursor: pointer;
    }
    .location-list {
        margin-top: 0;
        list-style-type: none;
        padding: 0;
        width: 100%;
    }
    .location-item {
        display: flex;
        justify-content: center;
        font-weight: 600;
        font-size: 20px;
        max-width: 95%;
        background-color: #1e1e1e;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        cursor: pointer;
        margin-top: 5px;
    }

    .datawindow {
        height: calc(100vh - 210px);
        margin-left: 15px;
        flex-grow: 1;
        color: #ffffff;
        background-color: #292929;
        z-index: 5000;
        border-radius: 20px;
    }
    
    .header-container {
        display: flex;
        font-size: 30px;
        font-weight: bold;	
        padding: 5px;
        margin: 10px;
        border-radius: 10px;
        flex-grow: 1;
        background-color: #1e1e1e;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .order {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .address {
        flex-grow: 1; /* Blöcke füllen den verfügbaren Platz */
        background-color: #1e1e1e;
        font-size: 14px;
        margin: 0 10px;
        padding: 15px;
        color: #ffffff;
        border-radius: 10px;
        height: calc(100vh - 320px);
    }

    .description {
        flex-grow: 4; /* Blöcke füllen den verfügbaren Platz */
        background-color: #1e1e1e;
        font-size: 14px;
        margin: 0 10px;
        padding: 15px;
        color: #ffffff;
        border-radius: 10px;
        height: calc(100vh - 320px);
    }
    
    .description-text {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: #aaaaaa; /* Leicht gräuliche Farbe */
    }

    .header-dis {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .address-header {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }    

    .address-text {
        font-size: 17px;
        margin-left: 10px;
        display: flex;
    }

    .map-link {
        margin-top: calc(100vh - 500px);
        text-align: center;
    }

    .map-button {
        background-color: #ff5722;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    .map-button:hover {
        background-color: #e64a19;
    }
</style>