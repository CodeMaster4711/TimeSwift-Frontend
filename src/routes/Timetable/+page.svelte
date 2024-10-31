<!--
<script>
    import {currentUser, token} from "$lib/auth";
    import {pb} from "$lib/auth";
    import {get, writable} from "svelte/store";
    import { goto } from '$app/navigation';

    let data = writable([]); // Erstellen Sie einen Svelte-Store, um die Daten zu speichern
    let entries = writable([]); // Erstellen Sie einen Svelte-Store, um die Daten zu speichern
    let records = []; // Array, um die Daten aus der API zu speichern


   //########Datensatz für die Tabelle#############################################################################
    let selectedDate01 = ''; // Variable, um das ausgewählte Datum zu speichern
    let selectedDate02 = ''; // Variable, um das ausgewählte Datum zu speichern
    let selectedClient = ''; // Variable, um den ausgewählten Kunden zu speichern
    let selectedLocation = ''; // Variable, um den ausgewählten Standort zu speichern
    let selectedTicket = ''; // Variable, um das ausgewählte Ticket zu speichern
    let selectedDescription = ''; // Variable, um die ausgewählte Beschreibung zu speichern
    let selectedStatus = ''; // Variable, um den ausgewählten Status zu speichern
    let selectedPartner = ''; // Variable, um den ausgewählten Ansprechpartner zu speichern
    let totalHours = '0:00'; // Variable, um die Gesamtstunden zu speichern
    //############################################################################################################
    async function timetabledata(){
        try {
            const response = await pb.collection('Times').getList(1, 50,{expand:"Client.Standorte,Location,State"});
            entries.set(response.items);
            console.log(response.items);

        }catch (err){
            console.error(err);
        }
    }
    timetabledata();
    function convertHTMLToText(htmlString) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlString, 'text/html');
        return dom.body.textContent || '';
    }
    let showPopup = false; // Variable, die den Zustand des Popup-Fensters darstellt
    function togglePopup() {
        showPopup = !showPopup; // Ändern Sie den Zustand des Popup-Fensters, wenn auf den Button geklickt wird
    }
    let selectedDate = new Date().toISOString().substring(0, 10); // Setzt das aktuelle Datum als Standardwert
    
    function closePopup() {
        showPopup = false;
        resetFields();
    }

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
    fetchData();

    function resetFields() {
        selectedDate = '';
        selectedDate01 = '';
        selectedDate02 = '';
        selectedClient = '';
        selectedLocation = '';
        selectedTicket = '';
        selectedDescription = '';
        selectedStatus = '';
        selectedPartner = '';
        totalHours = 0;
    }

    async function handleClientChange() {
        const currentlocation = await pb.collection('Clients').getFirstListItem('', {
            expand: 'relField1,relField2.subRelField',
        });
    }
    function save(){
        const data = {
            created: selectedDate,
            Date01: selectedDate01,
            Date02: selectedDate02,
            Client: selectedClient,
            Location: selectedLocation,
            Ticket: selectedTicket,
            Beschreibung: selectedDescription,
            Status: selectedStatus,
            Partner: selectedPartner,
            Hours: totalHours,
        };
        console.log(data);
        showPopup = false;
        resetFields();
        timetabledata();
    }
    // Funktion zum Berechnen der Gesamtzeit
    function calculateTotalTime() {
            // Umwandlung der Eingabewerte in Date-Objekte
            if (selectedDate01 && selectedDate02) {
            // Umwandlung der Eingabewerte in Date-Objekte
            const date1 = new Date(selectedDate01);
            const date2 = new Date(selectedDate02);

            // Berechnung der Differenz in Millisekunden
            const diff = date2 - date1;

            // Umwandlung der Differenz in Stunden und Minuten
            const hours = Math.floor(diff / 1000 / 60 / 60);
            const minutes = Math.floor((diff / 1000 / 60) % 60);

            // Formatierung der Gesamtzeit als String
            totalHours = `${hours}:${minutes}`;
        }
    }    

        // Aufruf der Funktion, wenn sich der Wert eines der Eingabefelder ändert
        $: calculateTotalTime(), selectedDate01, selectedDate02;

    async function dashboarddata(){
        goto('/Timetabledashboard');
    }

</script>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<div>
    <div class="card">
        <div class="bar">
            <div class="user">
                <div class="icon">
                    {#if $currentUser && $currentUser.avatar}
                        <img src={pb.files.getUrl($currentUser ,$currentUser.avatar)} alt="Avatar">
                    {:else}
                        <span class="material-symbols-outlined">account_circle</span>
                    {/if}
                </div>
                <span id="bar_title">{$currentUser === null ? "undefined" : $currentUser.username}</span>
            </div>
            <div id="button">
                <button id="s_1" on:click={togglePopup}><span class="material-symbols-outlined">not_started</span></button>
                <button id="s_2" on:click={timetabledata}><span class="material-symbols-outlined">sync</span></button>
                <button id="s_3" on:click={dashboarddata}><span class="material-symbols-outlined">bar_chart_4_bars</span></button>
                <button id="s_4"><span class="material-symbols-outlined">ios_share</span></button>
            </div>
        </div>
        <table id="data-table">
            <thead>
            <tr>
                <th>Datum</th>
                <th>Kunde</th>
                <th>Standort</th>
                <th>Ticket</th>
                <th>Beschreibung</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {#each $entries as entry}
                <tr>
                    <td>{entry.created || ''}</td>
                    <td>{entry.expand.Client.Name || ''}</td>
                    <td>{entry.expand.Location ? entry.expand.Location.Ort : ''}</td>
                    <td>{entry.Ticket || ''}</td>
                    <td>{convertHTMLToText(entry.Beschreibung) || ''}</td>
                    <td>{entry.expand.State ? entry.expand.State.Status : ''}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>

{#if showPopup}
    <div class="popup">
        <div class="timeselection">
            <input class="Time" type="datetime-local" bind:value={selectedDate01} required>
            <input class="Time" type="datetime-local" bind:value={selectedDate02} required>
            <span id="hour">{totalHours}</span>
        </div>
        <div>
            <select id="customerSelect" class="customerSelect" on:change={handleClientChange} required>
                <option value="">--Kunde Wählen--</option>
                {#each records as client (client.id)}
                    <option class="element" value={client.Client_Number}>{client.Name}</option>
                {/each}
            </select>
        </div>
        <div>
            <select id="locationSelect" class="locationselect" required>
                <option value="">--Standort Wählen--</option>

            </select>
        </div>
        <div class="Beschreibung">
            <label for="text">Beschreibung</label>
            <br>
            <textarea bind:value={selectedDescription} id="text" name="text" width="30vw" rows="4" required></textarea> 	
        </div>
        <div class="ticket">
            <label for="ticket">Ticket</label>
            <br>
            <input bind:value={selectedTicket} type="text" id="ticket" name="ticket" required>
        </div>    
        <div class="status">
            <label for="status">Status</label>
            <br>
            <select id="status" class="locationselect" bind:value={selectedStatus} required>
                <option value="">--Status Wählen--</option>
                <option value="Offen">Offen</option>
                <option value="In Bearbeitung">In Bearbeitung</option>
                <option value="Abgeschlossen">Abgeschlossen</option>
            </select>
        </div>
        <div class="partner"> 
            <label for="ansprechpartner">Ansprechpartner</label>
            <br>
            <input bind:value={selectedPartner} type="text" id="ansprechpartner" name="ansprechpartner" required> 
            <br>
        </div>    
        <div class="button-container">
            <button id="close" on:click={closePopup}>Schließen</button>
            <button id="save" on:click={save}>Speichern</button>
        </div>


    </div>
{/if}

<style>
    :root {
        --white-primary: #ffffff;
        --white-secondary: #aba8a8;
    }

    .card {
        display: flex;
        width: 87vw;
        height: 97vh;
        background: #18181b;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        margin-left: 10vw;
        margin-top: 2vh;

        flex-direction: column;
        isolation: isolate;
        position: relative;
        overflow: auto;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 25px;
        --color: #ffffff;
    }

    .bar {
        position: absolute;
        top: 2vh;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 7vh;
        width: 99%;
        background: var(--field-color);
        border-radius: 10px;
    }
    .user {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: auto;
    }
    .icon {
        margin: 11px 0 11px 16px;
        left: 0;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        transform: translate(0);
        transition: 0.2s;
    }
    .icon img {
        height: 100%;
    }
    #bar_title {
        margin-left: 10px;
        color: var(--light-color);
    }
    .frame {
        top: 4.2vh;
        width: 86vw;
        height: 85vh;
        background: #29292d;
        margin: 5px;
        position: relative;
        border-radius: 10px;
    }
    #button {
        margin: 0 10px 0 0;
    }
    #s_1 {
        background: var(--primary-color);
        color: #ffffff;
        border: none;
        border-radius: 10px;
        padding: 10px;
        margin: 0 5px 0 0;
    }
    #s_2 {
        background: var(--light-color);
        color: var(--dark-color);
        border: none;
        border-radius: 10px;
        padding: 10px 20px 10px 20px;
        margin: 0 5px 0 0;
    }
    #s_3 {
        background: var(--light-color);
        color: var(--dark-color);
        border: none;
        border-radius: 10px;
        padding: 10px 20px 10px 20px;
        margin: 0 5px 0 0;
    }
    #s_4 {
        background: var(--light-color);
        color: var(--dark-color);
        border: none;
        border-radius: 10px;
        padding: 10px 20px 10px 20px;
        margin: 0 5px 0 0;
    }


    #s_1:hover  {
        background: var(--dark-color);
    }
    #s_2:hover  {
        background: var(--dark-color);
        color: var(--light-color);
    }
    #s_3:hover  {
        background: var(--dark-color);
        color: var(--light-color);
    }
    #s_4:hover  {
        background: var(--dark-color);
        color: var(--light-color);
    }
    #data-table th {
        color: white;
        background:#29292d;
        border-bottom: 1px solid white;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 25px;
        height: 10vh;
        font-weight: normal;
    }

    #data-table {
        width: 100%;
        border-collapse: collapse;
        top:12vh;
        position: absolute;
    }

    #data-table td {
        color: black;
        border-bottom: 1px solid white;
        padding: 10px;
        box-sizing: border-box;

    }

    #data-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
    }
    #data-table th, #data-table td {
        text-align: center;
    }
    #data-table tr:nth-child(even) {
    background-color: var(--white-primary); /* Dunklere Farbe für gerade Zeilen */
    }

    #data-table tr:nth-child(odd) {
        background-color: var(--white-secondary); /* Hellere Farbe für ungerade Zeilen */
    }

    .popup {
        flex-direction: column;
        position: absolute;
        justify-content: center;
        align-items: center;
        display: flex;
        width: 40vw;
        height: 80vh;
        background:var(--light-color); /* Weißes Hintergrund mit 80% Deckkraft */
        top:10%;
        left: 30%;
        border-radius: 10px;
        border: solid 1px var(--dark-color);
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .Time {
        flex-direction: row;
        background-color: var(--light-color); /* Hintergrundfarbe */
        padding: 5px; /* Innenabstand */
        margin: 5px; /* Außenabstand */
        border-radius: 5px; /* Eckenradius */
        text-align: center; /* Textausrichtung */
        font-size: 13px; /* Schriftgröße */
        width: 30vw;
    }

    .customerSelect, .locationselect {
        flex-direction: row;
        background-color: var(--light-color); /* Hintergrundfarbe */
        padding: 5px; /* Innenabstand */
        margin: 5px; /* Außenabstand */
        border-radius: 5px; /* Eckenradius */
        text-align: center; /* Textausrichtung */
        font-size: 13px; /* Schriftgröße */
        width: 30vw;
    }

    .locationselect {
        margin-bottom: 20px;
    }

    #text, #ticket, #status, #ansprechpartner{
        width: 30vw;
        border-radius: 5px;
        border: 1px solid var(--dark-color);
    }

    #ticket, #status, #ansprechpartner {
        height: 5vh;
    }

    .Beschreibung {
        margin: 10px 0 15px 0;
    }

    .ticket, .status, .partner{
        margin: 10px 0 15px 0;
    }
    .button-container {
        display: flex;
        justify-content: center;
        margin-top: 10%;
    }

   #close{
        background-color: none;
        color: var(--dark-color);
        border: none;
        border-radius: 10px;
        padding: 10px;
        margin-right: 60%;
        font-weight: bold;
    }

    #save{
        background-color: none;
        color: var(--dark-color);
        border: none;
        border-radius: 10px;
        padding: 10px;
        margin-left: 60%;
         font-weight: bold;
   }
   #save:hover {
        background-color: green;
        color: var(--light-color);
   }

   #close:hover {
        background-color: red;
        color: var(--light-color);
    }

    #hour {
        background-color: lightgray;
        width: 7vw;
        height: 3vh;
        border-radius: 5px;
        margin: 10px 0 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }


    .timeselection {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #status {
        font-size: 15px;
    }

</style>
-->