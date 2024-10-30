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
    let isLoaded = false;  
    let temp = [];

    const currentMonth = new Date().getMonth(); // Get the current month (0-11)
    console.log(currentMonth);

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

    async function setnormalvalues(temp: number[]) {
          for(let i = 0; i < temp.length; i++){
            temp[i] = temp[i] / 5;
          }
        return temp;
    }

    onMount(() => {
        setTimeout(() => {
            isLoaded = true;
        }, 100); // Delay to start the animation

        const heights = [25, 30, 20, 50, 100, 10, 5, 6, 66, 77, 44, 12]; // Heights in vh
        const bars = document.querySelectorAll('.bar');
        setnormalvalues(heights).then(heightbars => {
            bars.forEach((bar, index) => {
                if (bar instanceof HTMLElement) {
                    bar.style.setProperty('height', `${heightbars[index]}vh`);
                    if (index === currentMonth) {
                        bar.id = 'current-month'; // Set ID for the current month
                    } else {
                        bar.id = `bar${index + 1}`; // Set unique ID for other bars
                    }
                    setTimeout(() => {
                        bar.classList.add('loaded');
                    }, 100); // Delay to start the animation
                }
            });
        });
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
        <div id="yearstats">
            <div id="yearstats">
                {#each Array(12) as _, i}
                    <div class="bar-container">
                        <div class="bar" id='{i}'></div>
                        <div class="monthlabel" id='month-{i}'>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div id="Stats"></div>
</div>

<style>
    @import './user.css';
    @import './main.css';
    @import './stats.css';
    
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
