<script lang="ts">
    import * as Calendar from 'svelte-calendar';
    import { onMount, onDestroy } from 'svelte';
    import { isCollapsed } from '$lib/navbar';
    import Chart from 'chart.js/auto';
    import { writable, get } from 'svelte/store';
    import CreateClient from '$lib/components/create-client.svelte';
 
    let localIsCollapsed = false;
    let show = false;

    isCollapsed.subscribe(value => {
        localIsCollapsed = value;
    });

    const customers = writable([
        { id: 1, name: 'Kunde 1', icon: '👤', customerNumber: '12345' },
        { id: 2, name: 'Kunde 2', icon: '👤', customerNumber: '67890' }
    ]);

    const addCustomer = () => {
       show = true;
    };

    const handleCustomerClick = (customer) => {
        console.log('Kunde geklickt:', customer);
    
    };

    const handleCancel = () => {
        show = false; // Popup schließen
    };

    const handleCreate = (event) => {
        const newCustomer = event.detail;
        customers.update(customers => {
            const newId = customers.length ? customers[customers.length - 1].id + 1 : 1;
            newCustomer.id = newId;
            newCustomer.icon = newCustomer.ClientLogo || '👤';
            newCustomer.customerNumber = `${Math.floor(Math.random() * 100000)}`;
            return [...customers, newCustomer];
        });
        show = false; // Popup schließen
    };
</script>
<div class:collapsed={localIsCollapsed} class="background"></div>
<div class:collapsed={localIsCollapsed} class="main">
    <div class="selector">
        <div class="header">Clients</div>
        <div class="customer-list">
            {#each $customers as customer}
                <div class="customer" on:click={() => handleCustomerClick(customer)}>
                    <div class="customer-icon">
                        {#if customer.icon && customer.icon.startsWith('data:image')}
                            <img src={customer.icon} alt="Client Logo" class="client-logo" />
                        {:else}
                            {customer.icon}
                        {/if}
                    </div>
                    <div class="customer-details">
                        <p>{customer.name}</p>
                        <p>{customer.customerNumber}</p>
                    </div>
                </div>
            {/each}
            <button class="addcustomer" on:click={addCustomer}>+</button>
        </div>
    </div>
    <div class="databaswindow">
        <CreateClient {show} on:cancel={handleCancel} on:create={handleCreate} />
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
        flex-grow: 1;
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
        z-index: 1;
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
        max-width: 50px;
        max-height: 50px;
    }
</style>
