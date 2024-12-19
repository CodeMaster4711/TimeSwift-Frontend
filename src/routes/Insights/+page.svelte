<script lang="ts">
    import * as Calendar from 'svelte-calendar';
    import { onMount, onDestroy } from 'svelte';
    import { isCollapsed } from '$lib/navbar';
    import Chart from 'chart.js/auto';
    import { get } from 'svelte/store';
    import { fullname, Semail, totalHours, totalInOnWeek, ICON} from '$lib/config';
    import Authentik from '$lib/components/Verification/frontend.svelte';

    let localIsCollapsed = false;
 
    isCollapsed.subscribe(value => {
        localIsCollapsed = value;
    });

   
</script>
<div class:collapsed={localIsCollapsed} class="background"></div>
<div class:collapsed={localIsCollapsed} class="main">
    <Authentik />
</div>

<style>
    .main {
        display: flex;
        margin-left: 16vw;
        margin-top: 2vh;
        transition: margin-left 0.3s;
        overflow: hidden;
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

    .userimgfull {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    


 
    canvas {
        max-width: 100%;
    }

</style>
