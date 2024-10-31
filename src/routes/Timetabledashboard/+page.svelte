<!--
<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import { get, writable } from 'svelte/store';
    import { token } from '$lib/auth';


    let currentWeek = getCurrentWeek();
    let weekchart = [];
    let chartData = writable([]);
    let temp = [];



    updateWeekData();
    async function kwfor() {
        currentWeek--; // Geht zur vorherigen Woche
        const templocal = await getWeekData(currentWeek); 
        createChart(templocal);// Aktualisiert das Diagramm
    }

    async function kwback() {
        currentWeek++; // Geht zur nächsten Woche
        const templocal = await getWeekData(currentWeek); 
        createChart(templocal);// Aktualisiert das Diagramm
    }

    async function updateWeekData() {
        const response = await getWeekData(currentWeek);
    }

    function getCurrentWeek() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        const week1 = new Date(date.getFullYear(), 0, 4);
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    async function getWeekData(weekNumber) {
        let weekData = null; // Variable zum Speichern der Daten
        try {
            const response = await fetch(`http://localhost:3030/db-data/${weekNumber}` , {
            headers: {
                'Authorization':`Bearer ${get(token)}`
            },
            cors: 'no-cors',
            });
            const data = await response.text();
            weekData = JSON.parse(data); // Speichern Sie die Daten in der weekData Variable
            chartData.set(weekData.data[0]);
            temp = [$chartData.MO, $chartData.TU, $chartData.WE, $chartData.TH, $chartData.FR, $chartData.SA, $chartData.SU];
            console.log(weekData); // Loggen Sie die Daten
            return temp;
        } catch (error) {
            console.error('Error:', error);
        }
}

let chart; // Deklarieren Sie eine Variable, um das Diagrammobjekt zu speichern

function createChart(data) {
    if (chart) { // Überprüfen Sie, ob das chart Objekt definiert ist
        chart.destroy(); // Zerstören Sie das alte Diagramm
    }
    chart = new Chart(weekchart.getContext('2d'), {
        type: 'bar', // Der Diagrammtyp
        data: {
            labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'], // Die Datenpunkte auf der x-Achse
            datasets: [{
                label: 'Hours', // Die Legende
                fill: false, 
                data: data,
                borderColor: 'rgb(75, 192, 192)',
                tension: 1,
                backgroundColor:['rgb(149, 1, 1)'],
                minBarLength: 0,
                maxBarLength: 10,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    max: 10, // Setzen Sie das Maximum der y-Achse auf 10
                    min: 0, // Optional: Setzen Sie das Minimum der y-Achse auf 0
                },
            },
        }
    });       
}

onMount(async() => {
    const templocal = await getWeekData(currentWeek); // Verwenden Sie await, um das Promise aufzulösen
    console.log(temp);
    createChart(templocal); // Erstellen Sie das Diagramm
});

    function goBack() {
        window.history.back();
    }




</script>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<div class="bar">
    <div class="back">
        <button class="button" on:click={goBack}>
            <span class="material-symbols-outlined">first_page</span>
        </button>
    </div>
    <div class="selectweek">
        <span>Week: {currentWeek}</span>
        <button class="button" on:click={kwfor}>
            <span class="material-symbols-outlined">arrow_back_ios</span>
        </button> 
        <button class="button" on:click={kwback}>
            <span class="material-symbols-outlined">arrow_forward_ios</span>
        </button>
    </div>
</div>
<div class="main"> 
    <div class="notification">
        <div class="notiglow"></div>
        <div class="notiborderglow"></div>
        <div class="notititle">Weektime Dashboard</div>
        <div class="notibody">
            <canvas bind:this={weekchart}></canvas>
       </div>
    </div>    
</div>
     

<style>
    .main{
        display: flex;
        margin: 9vw 0 0 10vw; 
        z-index: 0;
    }

    .notification {
        display: flex;
        flex-direction: column;
        isolation: isolate;
        position: relative;
        width: 88vw;
        height: 70vh;
        background: #29292c;
        border-radius: 1rem;
        overflow: hidden;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 25px;
        --color: #ffffff;
    }

    .notification:before {
        position: absolute;
        content: "";
        inset: 0.0625rem;
        border-radius: 0.9375rem;
        background: #18181b;
        z-index: 2;
    }

    .notification:after {
        position: absolute;
        content: "";
        width: 0.25rem;
        inset: 0.65rem auto 0.65rem 0.5rem;
        border-radius: 0.125rem;
        background: var(--gradient-red);
        transition: transform 300ms ease;
        z-index: 4;
    }

    .notification:hover:after {
        transform: translateX(0.15rem)
    }

    .notititle {
        position: absolute;
        left: 1px;
        top: 1px;
        color: var(--primary-color);
        padding: 0.65rem 0.25rem 0.4rem 1.25rem;
        font-weight: 500;
        font-size: 1.1rem;
        transition: transform 300ms ease;
        z-index: 5;
    }

    .notification:hover .notititle {
        transform: translateX(0.15rem)
    }

    .notibody {
        color: var(--light-color);
        text-shadow: 0.0625rem 0.0625rem 0.125rem var(--dark-color);
        padding: 0 1.25rem;
        transition: transform 300ms ease;
        z-index: 5;
        font-size: 45px;
        justify-content: center;
        align-items: center;
        display: flex;
        margin-top: 10%;
    }

    .notification:hover .notibody {
        transform: translateX(0.25rem)
    }

    .notiglow,
    .notiborderglow {
        position: absolute;
        width: 20rem;
        height: 20rem;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle closest-side at center, white, transparent);
        opacity: 0;
        transition: opacity 300ms ease;
    }

    .notiglow {
        z-index: 3;
    }

    .notiborderglow {
        z-index: 1;
    }

    .notification:hover .notiglow {
        opacity: 0.1
    }

    .notification:hover .notiborderglow {
        opacity: 0.1
    }

    .bar {
        left: 10vw;
        position: absolute;
        top: 2vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 7vh;
        width: 88%;
        background: var(--field-color);
        border-radius: 10px;
    }

    .back {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        left:2%;
        height: 5vh;
        width: 5vh;
    }

    .selectweek {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5vh;
        width: 20vh;
        margin-left: 80%;
    }

</style>
-->