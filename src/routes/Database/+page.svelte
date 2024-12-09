<script lang="ts">
    import * as Calendar from 'svelte-calendar';
    import { onMount, onDestroy } from 'svelte';
    import { isCollapsed } from '$lib/navbar';
    import Chart from 'chart.js/auto';
    import { writable, get } from 'svelte/store';
    import CreateClient from '$lib/components/create-client.svelte';
    import LocationBar from '$lib/components/location-bar.svelte';
    import ClientDatabase from '$lib/components/client-database.svelte';
    import { token} from '$lib/config';
    import type { newMenu } from '@tauri-apps/api/menu/base';
    import ColorThief from 'colorthief';

    let searchQuery = '';

    let localIsCollapsed = false;
    let show = false;
    let temptoken: string | undefined;
    let selectedCustomer = null;
    
    let gradientColors = [];

    isCollapsed.subscribe(value => {
        localIsCollapsed = value;
    });

    const customers = writable([]);

    const fetchCustomers = async (T: string ) => {
        console.log('Token:', T);
        const response = await fetch(`http://localhost:3030/getclients?token=${T}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Response:', response);
        if (!response.ok) {
            throw new Error('Error fetching customers');
        }
        const data = await response.json();
        console.log('Data:', data);
        // Entpacken des verschachtelten Arrays
        const unpackedData = data.flat();
        customers.set(unpackedData);
    };

    onMount(() => {

        token.subscribe(value => {
           temptoken = value;
        });
        if(temptoken != undefined) {
            fetchCustomers(temptoken);
        } else {
            console.error('Token is undefined');
        }
    });

    onMount(() => {
        const colorThief = new ColorThief();
        $customers.forEach(customer => {
            if (customer.logo && customer.logo.startsWith('data:image')) {
                const img = new Image();
                img.src = customer.logo;
                img.crossOrigin = 'Anonymous';
                img.onload = () => {
                    const color = colorThief.getColor(img);
                    gradientColors.push(`rgb(${color.join(',')})`);
                    updateGradient();
                };
            }
        });
    });

    const addCustomer = () => {
        console.log('Add customer');
       show = true;
    };

    const handleCustomerClick = (customer) => {
        selectedCustomer = customer;
    
    };

    const handleCancel = () => {
        show = false; // Popup schließen
    };

    const handleCreate = (event) => {
        const newCustomer = event.detail;
        show = false; // Popup schließen
    };

    interface Customer {
        name: string;
        manageid: string;
        logo?: string;
        icon?: string;
    }
</script>
<div class:collapsed={localIsCollapsed} class="background"></div>
<div class:collapsed={localIsCollapsed} class="main">
    <div class="selector">
        <div class="header">Clients</div>
        <div class="customer-list">
            {#each $customers as customer}
                <div class="customer" on:click={() => handleCustomerClick(customer)}>
                    <div class="customer-icon">
                        {#if customer.logo && customer.logo.startsWith('data:image')}
                            <img src={customer.logo} alt="Client Logo" class="client-logo" />
                        {:else if customer.icon}
                            {customer.icon}
                        {:else}
                            <div class="placeholder"><span class="material-symbols-outlined">apartment</span></div>
                        {/if}
                    </div>
                    <div class="customer-details">
                        <p>{customer.name}</p>
                        <p>{customer.manageid}</p>
                    </div>
                </div>
            {/each}
            <button class="addcustomer" on:click={addCustomer}>+</button>
        </div>
    </div>
    <div class="databaswindow">
        {#if selectedCustomer}
            <ClientDatabase {selectedCustomer} />
        {:else}
            <CreateClient {show} on:cancel={handleCancel} on:create={handleCreate} />
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
        margin-top: 10px;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;  
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
    .addcustomer {
        background-color: transparent;
        border: 2px dashed #f7f7f7;
        border-radius: 4px;
        color: rgb(255, 255, 255);
        font-size: 40px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .addcustomer:hover {
        border: 2px dashed #940000;
        color: #940000;
    }
    .header {
        font-weight: bold;
        color: rgb(255, 255, 255);
        font-size: 30px;
        margin-top: 10px;
        margin-left: 10px;
    }
    .customer {
        display: flex;
        align-items: center;
        background-color: #2d2d2d;
        border-radius: 4px;
        padding: 10px;
        margin-top: 10px;
        cursor: pointer;
    }
    .customer-icon {
        font-size: 30px;
        margin-right: 10px;
    }
    .customer-details p {
        margin: 0;
        color: #ffffff;
    }
    .client-logo {
        border-radius: 5px;
        width: 50px;
        height: 50px;
        object-fit: cover;
    }

    .placeholder {
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
