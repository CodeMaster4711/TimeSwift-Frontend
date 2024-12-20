<script lang="ts">
    import { onMount } from 'svelte';
    import { token, id } from '$lib/config';
    import { get } from 'svelte/store';

    let temptoken: string | undefined;
    let tempid: string | undefined;
    let users: any[] = [];
    let currentuserid: string | undefined;

    async function fetchuser(T: string, userid: string) {
        console.log('Token:', T);
        const response = await fetch(`http://localhost:3030/getallusers?token=${T}&userid=${userid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Response:', response);
        if (!response.ok) {
            throw new Error('Error fetching user');
        }
        const data = await response.json();
        console.log('Data:', data);
        users = data[0];
    };

    onMount(() => {
        token.subscribe(value => {
            temptoken = value;
        });

        id.subscribe(value => {
            tempid = value;
            currentuserid = value;
        });

        if (temptoken && tempid) {
            fetchuser(temptoken, tempid);
        } else {
            console.log('Token or ID is undefined');
        }
    });
</script>

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<div class="main">
    <div class="main-header">
        <span class="material-icons">manage_accounts</span> <!-- Icon hinzugefügt -->
        User Settings
    </div>
    <div class="header">
        <span>Icon</span>
        <span>Vorname</span>
        <span>Name</span>
        <span>Email</span>
        <span>Auswahl</span>
    </div>
    {#each users as user}
        <div class="user {user.id === currentuserid ? 'current-user' : ''}">
            {#if user.icon}
                <img id="usericon" src={user.icon} alt="User Icon" />
            {:else}
                <span id="usericon" class="material-icons">person</span>
            {/if}
            <span>{user.firstname}</span>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <input class="checkbox" type="checkbox" />
        </div>
    {/each}
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .header, .user {
        display: grid;
        max-width: 99%;
        grid-template-columns: 40px 1fr 1fr 2fr 60px; /* Passen Sie die Werte hier an */
        align-items: center;
        padding: 20px;
    }
    .header {
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 10px;
        font-weight: bold;
        color: #fff;
        background-color: #2d2d2d;
        margin-bottom: 10px;
    }

    .user:hover {
        transform: translateY(-0.5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        background-color: #333333;
    }
    .user {
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 10px;
        margin-bottom: 2px;
        background-color: #2d2d2d;
        color: #fff;
    }
    .user:nth-child(even) {
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 2px;
        border-radius: 10px;
        background-color: #2d2d2d;
    }

    .user:nth-child(even):hover {
        background-color: #303030;
    }
    .user .material-icons, .header span {
        margin-right: 10px;
    }
    #usericon {
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }

    .main-header {
        font-size: 30px;
        font-weight: bold;
        color: #fff;
        padding: 20px;
        margin-bottom: 5px;
    }

    .checkbox {
        width: 15px;
        height: 15px;
        accent-color: #F00101;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .current-user {
        opacity: 0.5; /* Ausgrauen des aktuellen Benutzers */
    }

    .user {
        animation: fadeIn 0.3s ease-out;
    }
</style>