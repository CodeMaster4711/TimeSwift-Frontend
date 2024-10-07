
<script>
    import { get } from 'svelte/store';
    import {currentUser, token} from '$lib/auth';
    import { onMount } from 'svelte';


    let records = [];

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
    function formatDoc(cmd, value=null) {
        if(value) {
            document.execCommand(cmd, false, value);
        } else {
            document.execCommand(cmd);
        }
    }




</script>

<div class="main">
    <div class="background_cards">
        <div class="card1">
            <div class="titel">Clients</div>
            <div class="elements_card1">
                <div class="color-strip"></div>
                {#each records as client (client.id)}
                    <a class="element" href={`/client/${client.Client_Number}`}>{client.Client_Number.toString().padStart(5, '0')}--{client.Name}</a>
                {/each}
            </div>
        </div>
        <div class="card2">
            <div class="titel2">Database</div>
        </div>
    </div>
</div>

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
    .card1{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 25vw;
        height: 97vh;
        background: #1a1a1a;
        border-radius: 20px;
        box-shadow: white 0px 0px 10px;
        margin-top: 2vh;
    }
    .card2{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 87vw;
        height: 97vh;
        background: #1a1a1a;
        border-radius: 20px;
        box-shadow: white 0px 0px 10px;
        margin-top: 2vh;
        margin-left: 10px;
        margin-right: 10px;
    }

    .background_cards{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 90vw;
    }
    .elements_card1 {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        width: 90%;
        height: 90%;
        overflow-y: auto;
        margin-top: 10px;
        margin-left: 20px;

    }
    .elements_card1 {
    position: relative;
    /* Rest of your styles */
    }

    .color-strip {
        position: fixed;
        z-index: 1;
        left: 12vw;
        top: 6vh;
        border-radius: 10px;
        bottom: 5vh;
        width: 7px;
        background: var(--gradient-red);
    }

    .element {
        text-decoration: none;
        color: white;
        padding: 2px;
        margin: 5px;
        border-radius: 5px;
        transition: background 0.3s, color 0.3s;
    }
    .element:hover {
        background: lightgray;
        width: 80%;
        color: black;
    }
    .titel {
        font-size: 30px;
        color: var(--light-light-color);
        margin-top: 10px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .titel2 {
        font-size: 30px;
        color: var(--light-light-color);
        margin-top: 10px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    body {
        background: #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    li {
        margin-left: 16px;
    }

    a {
        cursor: pointer;
    }




    .container {
        max-width: 991px;
        width: 100%;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
    }
    .toolbar {
        padding: 16px;
        background: #eee;
    }
    .toolbar .head {
        display: flex;
        grid-gap: 10px;
        margin-bottom: 16px;
        flex-wrap: wrap;
    }
    .toolbar .head > input {
        max-width: 100px;
        padding: 6px 10px;
        border-radius: 6px;
        border: 2px solid #ddd;
        outline: none;
    }
    .toolbar .head select {
        background: #fff;
        border: 2px solid #ddd;
        border-radius: 6px;
        outline: none;
        cursor: pointer;
    }
    .toolbar .head .color {
        background: #fff;
        border: 2px solid #ddd;
        border-radius: 6px;
        outline: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        grid-gap: 6px;
        padding: 0 10px;
    }
    .toolbar .head .color span {
        font-size: 14px;
    }
    .toolbar .head .color input {
        border: none;
        padding: 0;
        width: 26px;
        height: 26px;
        background: #fff;
        cursor: pointer;
    }
    .toolbar .head .color input::-moz-color-swatch {
        width: 20px;
        height: 20px;
        border: none;
        border-radius: 50%;
    }
    .toolbar .btn-toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        grid-gap: 10px;
    }
    .toolbar .btn-toolbar button {
        background: #fff;
        border: 2px solid #ddd;
        border-radius: 6px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }
    .toolbar .btn-toolbar button:hover {
        background: #f3f3f3;
    }
    #content {
        padding: 16px;
        outline: none;
        max-height: 50vh;
        overflow: auto;
    }
    #show-code[data-active="true"] {
        background: #eee;
    }
</style>