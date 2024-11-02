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
    let selectedView = 'year';

    const currentMonth = new Date().getMonth(); // Get the current month (0-11)
    const currentWeek = Math.floor(new Date().getDate() / 7); // Get the current week of the month
    const currentDay = new Date().getDay(); // Get the current day of the week (0-6)

    const yearValues = [25, 30, 20, 50, 100, 10, 5, 6, 66, 77, 44, 12]; // Heights in vh for year
    let monthValues = [ 50, 10, 20, 1, 90]; // Heights in vh for month
    let weekValues = [ 10, 1, 0, 5, 8, 9, 4]; // Heights in vh for week

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
            if(temp[i] > 100){
                temp[i] = 100;
            } else if (temp[i] <= 0){
                temp[i] = 1;
            }
          }
        return temp;
    }

    function getWeeksInMonth(month: number, year: number) {
        const weeks = [];
        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0);
        const numDays = lastDate.getDate();
        let start = 1;
        let end = 7 - firstDate.getDay();
        while (start <= numDays) {
            weeks.push({ start, end });
            start = end + 1;
            end = end + 7;
            if (end > numDays) {
                end = numDays;
            }
        }
        return weeks;
    }

    function getDaysInWeek(date: Date) {
        const days = [];
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());

        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            days.push(day.getDate());
        }

        return days;
    }

    function selectView(view: string) {
        selectedView = view;
        loadValuesForSelectedView();
    }

    console.log('Current Month:', currentMonth);
    console.log('Current Week:', currentWeek);
    console.log('Current Day:', currentDay);

    async function loadValuesForSelectedView() {
        let values: number[] = [];
        if (selectedView === 'year') {
            values = await setnormalvalues([...yearValues]);
        } else if (selectedView === 'month') {
            values = await setnormalvalues([...monthValues]);
        } else if (selectedView === 'week') {
            values = await setnormalvalues([...weekValues]);
        }

        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (bar instanceof HTMLElement) {
                bar.style.setProperty('height', `${values[index]}vh`);
                bar.classList.remove('current'); // Remove current class from all bars
                if (selectedView === 'year' && index === currentMonth) {
                    bar.setAttribute('id', 'current');
                } else if (selectedView === 'month' && index === currentWeek) {
                    bar.setAttribute('id', 'current');
                } else if (selectedView === 'week' && index === currentDay - 1) {
                    bar.setAttribute('id', 'current');
                }
                setTimeout(() => {
                    bar.classList.add('loaded');
                }, 100); // Delay to start the animation
            }
        });
    }

    onMount(() => {
        setTimeout(() => {
            isLoaded = true;
        }, 100); // Delay to start the animation

        // Load values for the initial view
        loadValuesForSelectedView();
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
    <div id="Stats">
        <h1 id="Statsheader">Stats </h1>
        <div id="Statsselector">
            <div class="selector" data-view="year" on:click={() => selectView('year')}>Year</div>
            <div class="selector" data-view="month" on:click={() => selectView('month')}>Month</div>
            <div class="selector" data-view="week" on:click={() => selectView('week')}>Week</div>
        </div>    
        {#if selectedView === 'year'}
        <div id="yearstats">
            {#each Array(12) as _, i}
                    <div class="bar-container">
                        <div class="bar"></div>
                        <div class="monthlabel" id='month-{i}'>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</div>
                    </div>
                {/each}
            </div>
        {/if}
        {#if selectedView === 'month'}
            <div id="monthstats">
                {#each getWeeksInMonth(date.getMonth(), date.getFullYear()) as week, i}
                    <div class="bar-container">
                        <div class="bar"></div>
                        <div class="weeklabel">W{i + 1}</div>
                    </div>
                {/each}
            </div>
        {/if}
        {#if selectedView === 'week'}
            <div id="weekstats">
                {#each getDaysInWeek(date) as day, i}
                    <div class="bar-container">
                        <div class="bar"></div>
                        <div class="daylabel">D{i + 1}</div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>        
    <div id="weektime"></div>
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

    .bar.current {
        background: white; /* Apply gradient for the current month */
    }
    


 
    canvas {
        max-width: 100%;
    }

</style>
