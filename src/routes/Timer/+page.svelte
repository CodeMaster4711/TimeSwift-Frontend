<style>
    :root {
        --purple-color: #7e30e1;
        --light-purple-color: #E26EE5;
        --light-light-color: #ffffff;
        --dark-dark-color: #000000;
        --gradient--purple: linear-gradient(to bottom, var(--purple-color), var(--light-purple-color), var(--light-light-color));
    }

    .main{
        display: flex;
        margin-left: 10vw;
        z-index: 0;
    }
    .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 87vw;
        height: 97vh;
        background: #1a1a1a;
        border-radius: 20px;
        box-shadow: white 0px 0px 10px;
        margin-top: 12px;
    }
    .timer {
        position: relative;
    }

    @property --p{
        syntax: '<number>';
        inherits: true;
        initial-value: 0;
    }

    .pie {
        --p:22;
        --b:24px;
        --c:var(--primary-color);
        --w:450px;
        width:var(--w);
        aspect-ratio:1;
        position:relative;
        display:inline-grid;
        margin:10px;
        place-content:center;
        font-size:40px;
        font-weight:bold;
        font-family:sans-serif;
        color:var(--light-color);
        z-index: 1;
    }
    .pie:before,
    .pie:after {
        content:"";
        position:absolute;
        border-radius:50%;
    }
    .pie:before {
        inset:0;
        background:
                radial-gradient(farthest-side,var(--primary-color) 98%,#0000) top/var(--b) var(--b) no-repeat,
                conic-gradient(var(--c) calc(var(--p)*1%),#0000 0);
        -webkit-mask:radial-gradient(farthest-side,#0000 calc(99% - var(--b)),#000 calc(100% - var(--b)));
        mask:radial-gradient(farthest-side,#0000 calc(99% - var(--b)),#000 calc(100% - var(--b)));
    }
    .pie:after {
        inset:calc(50% - var(--b)/2);
        background:var(--c);
        transform:rotate(calc(var(--p)*3.6deg)) translateY(calc(50% - var(--w)/2));
    }
    .animate {
        animation:p 1s .5s both;
    }
    @keyframes p {
        from{--p:0}
    }

    body {
        background:#f2f2f2;
    }

    .terminal {
        flex-direction: row;
        margin-top:20px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 50px;
    }
    .start_stop, .delete {
        border-radius: 50%;
        border-color: var(--light-light-color);
        border-style: solid;
        border-width: 5px;
        background: #1a1a1a;
        height: 80px;
        width: 80px;
    }

    .material-symbols-outlined {
        font-size: 35px;
        color: var(--light-light-color);
    }

    .start_stop:hover {
        background: #545454FF;
    }
    .delete:hover {
        background: #545454;
    }

    .customerSelect, .customerSelect2 {
        top:5vh;
        position: absolute;
        font-size: 15px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        height: 30px;
        width:200px;
        text-align: center;
        background: rgba(150, 150, 150, 0.7);
        border-radius: 7px;
        color: white;
    }

    .customerSelect{
        left:12vw;
    }
    .customerSelect2{
        left:32vw;
    }


</style>
<script>
    import {get} from "svelte/store";
    import {currentUser, token} from "$lib/auth.ts";

    let records = [];

    let time_add = 300; // 5 Minuten
    let time_remove = 300; // 5 Minuten
    let time = 3600; // Start bei 3600 Sekunden (1 Stunde)
    let intervalId;
    let percentage = 100; // Start bei 100%
    let time_c = time;

    let selectedUser = '';
    let locations = [];

    let selectedClient;
    let clientLocations = [];

    const addTime = () => {
            time += time_remove;
            time_c += time_remove;
    };

    const removeTime = () => {
        if(time === 300){
            time = time_c;
        }else {
            time -= time_remove;
            time_c -= time_remove;
        }
    };
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startStop = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        } else {
            intervalId = setInterval(() => {
                if(time === 0) {
                    clearInterval(intervalId);
                    intervalId = null;
                    time = time_c; // Zurücksetzen auf 3600 Sekunden
                    percentage = 100; // Zurücksetzen auf 100%
                } else {
                    time -= 1;
                    percentage = (time / time_c) * 100; // Berechnung der verstrichenen Zeit in Prozent
                }
            }, 1000);
        }
    };


    const reset = () => {
        clearInterval(intervalId);
        intervalId = null;
        time = time_c; // Zurücksetzen auf 3600 Sekunden
        percentage = 100; // Zurücksetzen auf 100%
    };

    async function fetchData() {
        try {
            const response = await fetch('http://localhost:3030/pocketbase-data', {
                headers: {
                    'Authorization':`Bearer ${get(token)}`
                },
                cors: 'no-cors',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                if (Array.isArray(data.items)) {
                    records = data.items;
                    console.log(records);
                } else {
                    console.error('Response items are not an array:', data.items);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
    async function fetchclientlocations() {
        try {
            const response = await fetch('http://localhost:3030/client-loctaions', {
                headers: {
                    'Authorization':`Bearer ${get(token)}`
                },
                cors: 'no-cors',
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
    fetchData();
    fetchclientlocations();
    console.log(records);
    console.log(locations);


    // Reaktive Anweisung, die auf Änderungen des ausgewählten Benutzers reagiert
    $: {
                if (selectedUser) {
                    clientLocations = locations.filter(location => location.Kunde === selectedUser.id);

                } else {
                    console.log('Kein Benutzer mit dieser ID gefunden');
                    clientLocations = [];
                }
            }

    let selectedLocation;

</script>

<div class="main">
    <div class="card">
        <select id="customerSelect" class="customerSelect">
            <option value="">--Kunde Wählen--</option>
            {#each records as client (client.id)}
                <option class="element" value={client.Client_Number}>{client.Name}</option>
            {/each}
        </select>
        <select bind:value={selectedLocation} class="customerSelect2">
            <option value="">--Standort Wählen--</option>
            {#each clientLocations as location (location.id)}
                <option value={location.id}>{location.name}</option>
            {/each}
        </select>
        <div class="timer">
            <div class="pie animate" style="--p:{percentage};--c:var(--primary-color)"> {formatTime(time)}
            </div>
        </div>
        <div class="terminal">
            <button class="delete" on:click={reset}><span class="material-symbols-outlined" id="delete">delete</span></button>
            <button class="start_stop" on:click={startStop}><span class="material-symbols-outlined" id="pause">pause</span></button>
            <button class="delete" on:click={removeTime}><span class="material-symbols-outlined" id="delete">remove</span></button>
            <button class="start_stop" on:click={addTime}><span class="material-symbols-outlined" id="pause">add</span></button>

        </div>
    </div>
</div>