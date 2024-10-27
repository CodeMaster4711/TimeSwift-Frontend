<script lang="ts">
    import * as Calendar from 'svelte-calendar';
    import { onMount, onDestroy } from 'svelte';
    import { isCollapsed } from '$lib/navbar';
    import Chart from 'chart.js/auto';

    let progress = 0;
    let date = new Date();
    let time = new Date();
    let percentage = 70;
    let localIsCollapsed = false;

    // Aktualisieren Sie die Zeit jede Sekunde
    setInterval(() => {
        time = new Date();
    }, 1000);

    isCollapsed.subscribe(value => {
        localIsCollapsed = value;
    });

    function formatTime(date: Date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    let chart: Chart;

    onMount(() => {
        const ctx = document.getElementById('weekBarChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'Hours per Month',
                    data: [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });

    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    });

</script>
<div class:collapsed={localIsCollapsed} class="background"></div>
<div class:collapsed={localIsCollapsed} class="main">
    <div id="top1"></div>
    <div id="top2">
        <input placeholder="Search" class="input" />
    </div> 
    <div id="top3">{formatTime(time)}</div>    
    <div id="user">
        <div class="leftuser">
            <span class="useruser">Basti</span>
            <br>
            <span class="email">basti@local.com</span>
        </div>
        <div class="centeruser">
            <span class="user-img"><img src="./Userlogo.png"></span>
            <br>
            <span class="role">Admin</span>
        </div>
        <div class="rightuser">

            <span class="Hours">Hours: </span><span class="Week">6484h</span>

            <br>
            <span class="Hours">week:</span> <span class="Week">26h</span>
        </div>  
    </div>
    <div id="Ticket"></div>
    <div id="Projects"></div>
    <div id="Calender">
    </div>
    <div id="circle1">
        <div class="timer">
            <div class="pie animate" style="--p:{percentage};--c:var(--primary-color)">{percentage}%
            </div>
        </div>
    </div>
    <div id="circle2">
        <div class="timer2">
            <div class="pie2 animate2" style="--p:{percentage};--c:var(--primary-color)">{percentage}%
            </div>
        </div>
    </div>
    <div id="weektime">
        <canvas id="weekBarChart" width="400" height="200"></canvas>
    </div>
    <div id="Stats"></div>
</div>

<style>
    @import './user.css';
    @import './main.css';
    
    .main {
        display: flex;
        margin-left: 16vw;
        margin-top: 2vh;
        transition: margin-left 0.3s;
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


    canvas {
        max-width: 100%;
    }

</style>
