<script lang="ts">
    import {goto} from "$app/navigation";
    import { username_store } from '$lib/store';
    import { get } from 'svelte/store';
    import Loader from '$lib/components/loader.svelte';
    import {onMount} from "svelte";
    import { token, fullname, Semail, totalHours, totalInOnWeek, UID, id, ICON} from '$lib/config';
    import { IconMenuItem } from "@tauri-apps/api/menu";
   


  let error = "";
  let activeTab = 'login'; // Zustand für die aktive Registerkarte
  let username = ""; // Deklaration der username-Variable
  let password = ""; // Deklaration der password-Variable
  let name = ""; // Deklaration der name-Variable
  let firstname = ""; // Deklaration der firstname-Variable
  let email = ""; // Deklaration der email-Variable
  let create_password = ""; // Deklaration der create_password-Variable
  let confirm_password = ""; // Deklaration der confirm_password-Variable
  let loading = false;
  let tokensession: string | undefined;
  
  token.subscribe(value => {
        // Weist den Wert des `token` Stores der lokalen Variable `tokensession` zu
        tokensession = value;
        // Protokolliert den aktuellen Wert des Tokens in der Konsole
        console.log('Checking token', tokensession);
        // Wenn `tokensession` einen Wert hat, wird die `validateToken`-Funktion aufgerufen
        if (tokensession) {
            validateToken(tokensession);
        }
    });

    function validateEmail(email: string) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) {
        throw new Error('E-Mail is not valid!');
      }
    }

    const validateToken = async (sessionToken: string) => {
        try {
            const response = await fetch('http://localhost:3030/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: sessionToken,
                })
            });

            if (!response.ok) {
                throw new Error('Invalid token');
            }
            console.log('Response:', response);
            if (response) {
                console.log('Token is valid:', sessionToken);
                goto('/Home');
            } else {
                console.log('Token is invalid:', sessionToken);
                token.set(undefined);
                fullname.set(undefined);
                Semail.set(undefined);
                UID.set(undefined);
                id.set(undefined);
            }
        } catch (e) {
            console.error('Token validation error:', e);
            token.set(undefined);
            fullname.set(undefined);
            Semail.set(undefined);
            UID.set(undefined);
            id.set(undefined);
        }
    };



  const login = async () => {
        loading = true;
        error = "";

        try {
            validateEmail(username);
            const response = await fetch('http://localhost:3030/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Error while logging in!');
            }

            const data = await response.json();
            console.log('Server response:', data); // Ausgabe der Serverantwort

            if (data.token) {
                username = "";
                password = "";
                token.set(data.token);
                fullname.set(data.firstname + ' ' + data.name);
                UID.set(data.U_ID);
                Semail.set(data.email);
                id.set(data.id);
                ICON.set(data.icon);
                goto('/Home');
            } else {
                throw new Error('Invalid login credentials!');
            }
        } catch (e) {
            console.error('Fetch error:', e); // Ausgabe des Fehlers in der Konsole
            error = e.message;
            username = "";
            password = "";
        } finally {
            loading = false;
        }
    }

    const switchTab = (tab) => {
        activeTab = tab;
    }

    const signup = async () => {
        validateEmail(email);
        loading = true;
        error = "";

        if (create_password !== confirm_password) {
            error = "Passwords do not match!";
            loading = false;
            return;
        }

        try {
            const response = await fetch('http://localhost:3030/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    firstname: firstname,
                    email: email,
                    password: create_password,
                })
            });

            if (!response.ok) {
                throw new Error('Error while signing up!');
            }
            const data = await response.json();

            if (data.success) {
                name = "";
                firstname = "";
                email = "";
                create_password = "";
                confirm_password = "";
                activeTab = 'login';
            } else {
                throw new Error('Invalid signup credentials!');
            }
        } catch (e) {
            console.error('Fetch error:', e); // Ausgabe des Fehlers in der Konsole
            error = e.message;
        } finally {
            loading = false;
        }
    }

    async function loginWithPasskey() {
        loading = true;
        try {
            // Hier würde die eigentliche WebAuthn/Passkey-Authentifizierung stattfinden
            console.log("Passkey-Authentifizierung gestartet");
            // Demo-Implementierung
            
        } catch (e) {
            console.error('Passkey error:', e);
            error = "Passkey-Authentifizierung fehlgeschlagen";
            loading = false;
        }
    }


    // In Ihrem <script>-Bereich hinzufügen
// In Ihrem <script>-Bereich aktualisieren
onMount(() => {
  let secondHand = document.querySelector('.second-hand') as HTMLElement;
  let minuteHand = document.querySelector('.minute-hand') as HTMLElement;
  let hourHand = document.querySelector('.hour-hand') as HTMLElement;
  
  function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12; // 12-Stunden-Format für die Rotation
    
    // Berechnung der Winkel
    // Sekundenzeiger: 6 Grad pro Sekunde (360° / 60s)
    const secondsDegrees = ((seconds / 60) * 360);
    
    // Minutenzeiger: 6 Grad pro Minute + anteilige Bewegung durch Sekunden
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6);
    
    // Stundenzeiger: 30 Grad pro Stunde + anteilige Bewegung durch Minuten
    const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30);
    
    // Anwenden der Rotationen
    // Spezialbehandlung für den Übergang von 59 auf 0 Sekunden für den Sekundenzeiger
    secondHand.style.transition = seconds === 0 ? 'none' : 'transform 0.1s ease-in-out';
    secondHand.style.transform = `translate(-50%, -100%) rotate(${secondsDegrees}deg)`;
    
    // Minutenzeiger bewegt sich kontinuierlich
    minuteHand.style.transform = `translate(-50%, -100%) rotate(${minutesDegrees}deg)`;
    
    // Stundenzeiger bewegt sich kontinuierlich
    hourHand.style.transform = `translate(-50%, -100%) rotate(${hoursDegrees}deg)`;
  }

  // Initial update
  updateClock();
  
  // Update jede Sekunde
  const timer = setInterval(updateClock, 1000);
  
  // Cleanup bei Komponentenabbau
  return () => clearInterval(timer);
});
</script>

<div class="main">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  <div class="image">
    <img src="/Group01.svg">
  </div>
  <div class="circle">
    <img class ="clock" src="/Clock.png">
    <div class="hour-hand"></div>
    <div class="minute-hand"></div>
    <div class="second-hand"></div>
  </div>
  <div class="login">
    <div class="innerlogin">
      <div class="header">TimeSwift</div>
      <div class="tabs">
        <button class:active={activeTab === 'login'} on:click={() => switchTab('login')}>Login</button>
        <button class:active={activeTab === 'createAccount'} on:click={() => switchTab('createAccount')}>Create Account</button>
      </div>
      {#if activeTab === 'login'}
        <!-- Login-Formular -->
        <div class="form">
          <div class="input-data">
            <input type="text"  bind:value={username} required>
            <div class="underline"></div>
            <label>E-Mail</label>
          </div>
          <div class="input-data">
            <input type="password" bind:value={password} required>
            <div class="underline"></div>
            <label>Password</label>
          </div>
          <button class="passkey-button" on:click={loginWithPasskey}>
            <img src="/icons/passkey.svg" alt="Passkey Icon" class="passkey-icon" />
            Mit Passkey anmelden
          </button>
        </div>
      {:else if activeTab === 'createAccount'}
        <!-- Account erstellen Formular -->
        <div class="form">
          <div class="input-data">
            <input type="text" bind:value={name} required>
            <div class="underline"></div>
            <label>Name</label>
          </div>
          <div class="input-data">
            <input type="text" bind:value={firstname} required>
            <div class="underline"></div>
            <label>Firstname</label>
          </div>
          <div class="input-data">
            <input type="text" bind:value={email} required>
            <div class="underline"></div>
            <label>Email</label>
          </div>
          <div class="input-data">
            <input type="password" bind:value={create_password} required>
            <div class="underline"></div>
            <label>Password</label>
          </div>
          <div class="input-data">
            <input type="password" bind:value={confirm_password} required>
            <div class="underline"></div>
            <label>Confirm Password</label>
          </div>
        </div>
      {/if}
      <button class="action-button" on:click={activeTab === 'login' ? login : signup}>
        {activeTab === 'login' ? 'Login' : 'Create Account'}
      </button>
      <div>
        {#if loading}
          <div class="success"></div>
        {/if}
        {#if error}
          <div class="error">{error}</div>
        {/if}
      </div>
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
  width: 50%;    /* 50% der Bildschirmbreite einnehmen */
  height: 100%;  /* Volle Höhe einnehmen */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;  /* Verhindert Überläufe */
}

.image img {
  width: 100%;    /* Bild füllt den Container aus */
  height: 100%;   /* Bild füllt den Container aus */
  object-fit: cover;  /* Behält Seitenverhältnis bei und füllt den Container */
  object-position: center;  /* Zentriert das Bild */
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


  .second-hand {
  position: absolute;
  width: 2px;
  height: 78px; /* Länge des Zeigers relativ zur Uhr */
  background-color: #ff0000;
  top: 50%; /* Setzt den Ursprung in die Mitte */
  left: 50%; /* Setzt den Ursprung in die Mitte */
  transform-origin: bottom center; /* Ursprung für die Rotation */
  transform: translate(-50%, -100%) rotate(0deg); /* Zentriert den Zeiger */
  z-index: 1002;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.7);
}

.hour-hand {
  position: absolute;
  width: 4px;
  height: 50px; /* Kürzer als Minuten- und Sekundenzeiger */
  background-color: #ffffff; /* Weiß für den Stundenzeiger */
  top: 50%;
  left: 50%;
  transform-origin: bottom center;
  transform: translate(-50%, -100%) rotate(0deg);
  z-index: 1002;
  box-shadow: 0 0 3px rgba(255, 255, 255, 0.7);
  border-radius: 3px 3px 0 0;
}

.minute-hand {
  position: absolute;
  width: 3px;
  height: 65px; /* Länger als Stundenzeiger, kürzer als Sekundenzeiger */
  background-color: #cccccc; /* Grau für den Minutenzeiger */
  top: 50%;
  left: 50%;
  transform-origin: bottom center;
  transform: translate(-50%, -100%) rotate(0deg);
  z-index: 1002;
  box-shadow: 0 0 3px rgba(204, 204, 204, 0.7);
  border-radius: 2px 2px 0 0;
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

.passkey-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 70%;
  margin-top: 15px;
  padding: 10px 16px;
  background: none;
  border: 2px solid var(--background-color-light);
  border-radius: 30px;
  color: var(--text-color);
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.passkey-button:hover {
  background-color: rgba(255, 1, 1, 0.1);
  border-color: var(--input-focus-color);
}

.passkey-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}
</style>