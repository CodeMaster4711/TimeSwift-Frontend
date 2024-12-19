<script lang="ts">
    import { writable } from 'svelte/store';

    let username = writable('');
    let password = writable('');
    let isLoggedIn = writable(false);
    let isRotating = writable(false);

    function handleLogin() {
        isRotating.set(true);
        setTimeout(() => {
            isRotating.set(false);
            isLoggedIn.set(true);
        }, 520); // Dauer d
    }
</script>

<div class="container">
    <div class="left { $isLoggedIn ? 'slide-left' : '' }">
        <div class="square_left">
            <div class="circle { $isRotating ? 'rotate' : '' } { $isLoggedIn ? 'move-right' : '' }">
                <span class="material-symbols-outlined" id="lock">
                    key
                </span>
            </div>
        </div>
    </div>
    <div class="right { $isLoggedIn ? 'slide-right' : '' }">       
         <div class="square_right">
            <form on:submit={handleLogin}>
                <input type="text" bind:value={$username} placeholder="Username" />
                <input type="password" bind:value={$password} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        z-index: 200;
        width: 100%;
        height: 98vh;
    }

    .left, .right {
        display: flex;
        align-items: center;
        transition: transform 1s ease;
    }

    .left {
        gap: 1px;
        justify-content: flex-start;
        position: relative;
    }
    
    .square_left {
        width: 400px;
        height: 97vh;
        background-color: rgb(0, 0, 0);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        overflow: visible;
        transition: transform 1s ease;
        border-top: #777777 1px solid;
        border-bottom: #777777 1px solid;
        border-right: #5a5a5a 1px solid;
        border-radius: 0 20px 20px 0;
    }

    .square_right {
        flex-grow: 20;
        height: 97vh;
        background-color: rgb(0, 0, 0);
    }

    .circle {
        width: 150px;
        height: 150px;
        background-color: rgb(0, 0, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        position: absolute;
        right: -75px; /* Verschiebt den Kreis zur Hälfte über den Kasten */
        transition: transform 8s ease;
        border: 2px solid #fff; /* Setzt einen Rand */
    }

    .move-right {
        transform: translateX(-200px); /* Verschiebt den Kreis nach rechts */
    }

    .slide-left {
        transform: translateX(-100%);
        transition: transform 1.5s ease;
    }

    .slide-right {
        transform: translateX(110%);
    }

    #lock {
        font-size: 90px;
        color: aliceblue;
    }

    .rotate {
        animation: rotate 0.5s linear; /* Drehung für 0.5 Sekunden */
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>