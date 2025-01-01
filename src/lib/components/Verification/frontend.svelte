<script lang="ts">
    import { writable } from 'svelte/store';
    import { createEventDispatcher } from 'svelte';
    
    let verificationCode = writable('');
    let isVerified = writable(false);
    let isRotating = writable(false);

    const dispatch = createEventDispatcher();
    function verify() {
        // Verifizierungslogik hier
        // ...
        setTimeout(() => {
            isRotating.set(false);
            isVerified.set(true);
            // Warte, bis die Animationen abgeschlossen sind
            setTimeout(() => {
                dispatch('verified');
            }, 600); // Dauer der Animationen anpassen
        }, 500);
    }

    function handleVerify() {
        isRotating.set(true);
        verify();
    }
</script>

<div class="container">
    <div class="left { $isVerified ? 'slide-left' : '' }">
        <div class="square_left">
            <div class="circle { $isRotating ? 'rotate' : '' } { $isVerified ? 'move-left' : '' }">
                <span class="material-symbols-outlined" id="verify-icon">
                    verified
                </span>
            </div>
        </div>
    </div>
    <div class="right { $isVerified ? 'slide-right' : '' }">       
        <div class="square_right">
            <form on:submit={handleVerify}>
                <h2>Verification Code</h2>
                <div class="code-input">
                    <input 
                        type="text" 
                        maxlength="6" 
                        pattern="\d{6}" 
                        bind:value={$verificationCode} 
                        placeholder="000000"
                    />
                </div>
                <button type="submit" on:click={verify}>Verify</button>
            </form>
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        width: 100%;
        height: 98vh;
        overflow-x: hidden;
        background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
    }

    .left, .right {
        display: flex;
        align-items: center;
        transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1); 
    }
    .left {
        z-index: 200;
    }

    .right {
        z-index: 100;
    }


    .square_left {
        left: -20px;
        width: 400px;
        height: 97vh;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        overflow: visible;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 0 20px 20px 0;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }

    .circle {
        width: 150px;
        height: 150px;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        position: absolute;
        right: -75px;
        transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        border: 2px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
    }

    .code-input {
        margin: 20px 0;
    }

    input {
        width: 200px;
        padding: 15px;
        text-align: center;
        font-size: 24px;
        letter-spacing: 8px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 10px;
        color: white;
    }

    input:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
    }

    button {
        padding: 15px 40px;
        border: none;
        border-radius: 10px;
        background: linear-gradient(135deg, #00a8ff 0%, #007bff 100%);
        color: white;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .move-left {
        transition: transform 2.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .slide-left {
        transform: translateX(-200%);
    }

    .slide-right {
        transform: translateX(200%);
    }

    #verify-icon {
        font-size: 90px;
        color: #00a8ff;
    }

    .rotate {
        animation: rotate 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes rotate {
        0% { 
            transform: rotate(0deg); 
        }
        100% { 
            transform: rotate(360deg);
        }
    }
    .square_right {
        width: 1000px;
        height: 97vh;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
    }

    .background-text {
        position: absolute;
        font-size: 120px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.1);
        z-index: 0;
        pointer-events: none;
    }

    form {
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    button {
        padding: 15px 40px;
        border: none;
        border-radius: 10px;
        background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
        color: white;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 0, 0, 0.4);
    }

    input:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.2);
    }

    .circle {
        border: 2px solid rgba(255, 0, 0, 0.2);
        box-shadow: 0 0 30px rgba(255, 0, 0, 0.1);
    }

    #verify-icon {
        color: #ff0000;
    }
</style>