<script lang="ts">
    import { onMount } from 'svelte';
    import { token} from '$lib/config';

    export let clientId: string;
    export let locations: string[] = [];
    let newLocation = '';




    function addLocation() {
        if (newLocation.trim() !== '') {
            locations = [...locations, newLocation];
            newLocation = '';
        }
    }

    function addDummyLocation() {
        locations = [...locations, 'London'];
    }

    async function fetchLocations(id : string) {
        try {
            const response = await fetch(`http://localhost:3030/client-locations/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                if (Array.isArray(data.items)) {
                    locations = data.items;
                    console.log(locations);
                } else {
                    console.error('Response items are not an array:', data.items);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    onMount(() => {
        console.log('Client ID:', clientId);
        fetchLocations(clientId);
    });
</script>
<div class="main">
    <div class="location-bar">
        <ul class="location-list">
            <div class="header">Sites</div>
            {#each locations as location}
                <li class="location-item">{location}</li>
            {/each}
            <button class="addlocation" on:click={addDummyLocation}>+</button>
        </ul>
    </div>
    <div class="datawindow">
        <h1>Location</h1>
    </div> 
</div>
<style>
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
        padding-left: 20px;
        flex-grow: 1;
        background-color: #292929;
        z-index: 5000;
        border-radius: 20px;
    }

    
</style>