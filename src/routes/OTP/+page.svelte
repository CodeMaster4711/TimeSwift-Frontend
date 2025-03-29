<script lang="ts">
    import {goto} from "$app/navigation";
    import { username_store } from '$lib/store';
    import { get } from 'svelte/store';
    import Loader from '$lib/components/loader.svelte';
    import {onMount} from "svelte";
    import { token, fullname, Semail, totalHours, totalInOnWeek, UID, id, ICON} from '$lib/config';
    import { IconMenuItem } from "@tauri-apps/api/menu";

    let otpInputs = ['', '', '', '', '', ''];
    let inputRefs = Array(6);

    function handleInput(index: number) {
        // Automatisch zum nächsten Feld springen
        otpInputs[index] = otpInputs[index].replace(/[^0-9]/g, '');
        
        if (otpInputs[index].length === 1 && index < 5) {
            inputRefs[index + 1].focus();
        }
    }

    function handleKeyDown(event: KeyboardEvent, index: number) {
        // Backspace Handling
        if (event.key === 'Backspace' && !otpInputs[index] && index > 0) {
            inputRefs[index - 1].focus();
        }
    }

    function verifyOTP() {
        const otpCode = otpInputs.join('');
        // Hier kommt die Verifikationslogik hin
        console.log('OTP Code:', otpCode);
    }


    function useAlternativeLogin() {
        goto('/login/alternative');
    }
</script>

<div class="main">
  <div class="image">
    <img src="/Group01.svg">
  </div>
  <div class="circle">
    <img class ="clock" src="/Clock.png">
  </div>
  <div class="login">
    <div class="innerlogin">
      <div class="header">2FA Verification</div>
      <div class="otp-description">
        Bitte geben Sie den 6-stelligen Code ein
    </div>
    <div class="otp-container">
        {#each otpInputs as input, i}
            <input
                type="text"
                maxlength="1"
                bind:value={otpInputs[i]}
                on:input={() => handleInput(i)}
                on:keydown={(e) => handleKeyDown(e, i)}
                bind:this={inputRefs[i]}
                class="otp-input"
            />
        {/each}
    </div>
    <div class="divider">oder</div>
    <button class="email-verification-button" on:click={useAlternativeLogin}>
        <span class="icon">
            <!-- Eingebettetes SVG-Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
                <path d="M12 12.713l11.985-8.713h-23.97l11.985 8.713zm0 2.574l-12-8.287v12h24v-12l-12 8.287z"/>
            </svg>
        </span>
        <span class="text">
            Per E-Mail verifizieren
            <br>
            <span class="subtext">Erhalten Sie einen Code per E-Mail</span>
        </span>
    </button>
    
    <button class="action-button" on:click={verifyOTP}>
        Verifizieren
    </button>
      
    </div>
  </div>
</div>

<style>
  :root {
    --primary-color: #ff0000;
    --primary-gradient-start: rgba(255, 0, 0, 1);
    --primary-gradient-end: rgba(150, 0, 0, 1);
    --background-color: #000000;
    --text-color: #ffffff;
    --input-border-color: #292929;
    --input-focus-color: #F00101;
    --background-color-light: #3e3e3e;
  }



  @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 10px;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(115deg, #56d8e4 10%, #9f01ea 90%);
  }
  .main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .image {
    position: fixed;
    left: 0;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    display: flex;
  }
  .login {
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    max-width: 50%;
    background-color: var(--input-border-color);
    color: var(--text-color);
    display: flex;
    justify-content: center; /* Zentriert den Inhalt horizontal */
    align-items: center; /* Zentriert den Inhalt vertikal */
    border-radius: 30px 0px 0px 30px;
  }
  .innerlogin {
    width: 70%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--input-border-color);
    position: relative; /* Relativ positioniert, um absolute Positionierung des Buttons zu ermöglichen */
  }
  .tabs {
    width: 80%;
    display: flex;
    border-radius: 30px;
    justify-content: center;
    margin-bottom: 20px;
    position: absolute;
    top: 11vh; /* Abstand vom oberen Rand der innerlogin-Div */
    margin-bottom: 5vh;
    background-color: var(--background-color-light);
  }
  .tabs button {
    background: none;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: lighter;
    color: #ffffff;
    flex:1;
  }
  .tabs button.active {
    background: rgb(255,0,0);
    background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(150,0,0,1) 100%);
    border-radius: 30px;
    flex: 1;
  }
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--input-border-color);
  }
  .input-data {
    position: relative;
    margin-bottom: 20px;
    width: 70%;
  }
  .input-data input {
    width: 100%;
    border: none;
    border-bottom: 2px solid var(--text-color);
    outline: none;
    font-size: 17px;
    padding: 10px 0;
    background: none;
  }
  .input-data label {
    position: absolute;
    pointer-events: none;
    bottom: 10px;
    left: 0;
    font-size: 16px;
    transition: all 0.3s ease;
  }
  .input-data input:focus ~ label,
  .input-data input:valid ~ label {
    transform: translateY(-32px);
    font-size: 13px;
    color: #F00101;
  }

  .input-data .underline {
    position: absolute;
    bottom: 0;
    height: 2px;
    width: 100%;
  }
  .input-data .underline:before {
    position: absolute;
    content: "";
    height: 2px;
    width: 100%;
    background: #F00101;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }
  .input-data input:focus ~ .underline:before,
  .input-data input:valid ~ .underline:before {
    transform: scale(1);
  }
  .header {
    font-size: 6vh;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 20px;
    background-color: var(--input-border-color);
    position: absolute;
    top: 3vh; /* Abstand vom oberen Rand der innerlogin-Div */
  }
  .action-button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 1.2em;
    background: rgb(255,0,0);
    background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(150,0,0,1) 100%);
    width: 60%;
    border-radius: 30px;
    color: var(--text-color);
    border: none;
    cursor: pointer;
    position: absolute; /* Absolute Positionierung innerhalb der innerlogin-Div */
    bottom: 5vh; /* Abstand vom unteren Rand der innerlogin-Div */
  }

  .action-button:hover {
    font-weight: bold;
    background-color:  var(--background-color-light)!important; 
    color:var(--text-color) !important;
   
  }

  .clock {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
  }
  
.success {
 width: 60px;
 height: 60px;
}

.success::before {
 content: "";
 box-sizing: border-box;
 position: absolute;
 width: 60px;
 height: 60px;
 border-radius: 50%;
 border-top: 2px solid #ff0000;
 border-right: 2px solid transparent;
 animation: spinner8217 0.8s linear infinite;
}

@keyframes spinner8217 {
 to {
  transform: rotate(360deg);
 }
}


.otp-description {
        text-align: center;
        color: var(--text-color);
        margin-bottom: 20px;
        font-size: 1.2em;
        position: absolute;
        top: 15vh;
    }

    .otp-container {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin: 20px 0;
        position: absolute;
        top: 25vh;
    }

    .otp-input {
        width: 50px;
        height: 50px;
        border: 2px solid var(--background-color-light);
        border-radius: 10px;
        text-align: center;
        font-size: 1.5em;
        background: none;
        color: var(--text-color);
        transition: all 0.3s ease;
    }

    .otp-input:focus {
        border-color: var(--input-focus-color);
        outline: none;
        box-shadow: 0 0 5px var(--input-focus-color);
    }


    .divider {
        position: absolute;
        bottom: 20vh;
        color: var(--text-color);
        font-size: 1em;
        opacity: 0.7;
        width: 60%;
        text-align: center;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .divider::before,
    .divider::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid var(--text-color);
        opacity: 0.3;
    }

    .email-verification-button {
        position: absolute;
        bottom: 25vh;  /* Position über dem Verifizieren-Button */
        width: 60%;
        padding: 12px 20px;
        border: none;
        border-radius: 5px;  /* eckigere Form */
        background: var(--background-color-light);  /* light gray Hintergrund */
        color: var(--text-color);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
        font-size: 1.1em;

    }

    .email-verification-button:hover {
        background: #4a4a4a;  /* etwas dunkleres Grau beim Hover */
        transform: translateY(-1px);
    }

    .email-verification-button .icon {
        font-size: 1.2em;
    }

    .email-verification-button .text {
        font-size: 0.9em;
        font-weight: bold;
        text-align: left;
        flex: 1;
    }
    .email-verification-button .subtext {
        font-size: 0.7em;
        opacity: 0.7;
    }

    /* Anpassung des action-button für korrekten Abstand */
    .action-button {
        bottom: 12vh;
    }

</style>