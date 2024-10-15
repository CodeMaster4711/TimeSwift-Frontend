<script>
    import { src_url_equal } from "svelte/internal";
    import {pb} from "$lib/auth";
    import {goto} from "$app/navigation";
    import { username_store } from '$lib/store';
    import { token } from '$lib/auth';
    import { get } from 'svelte/store';
    import Loader from '$lib/components/loader.svelte';
    import {onMount} from "svelte";

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

  const login = async () => {
        loading = true;
        error = "";

        try {
            const response = await fetch('http://localhost:3030/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Error while logging in!');
            }

            const data = await response.json();
            if (data.success) {
                username = "";
                password = "";
                goto('/Home');
            } else {
                throw new Error('Invalid login credentials!');
            }
        } catch (e) {
            console.error('Fetch error:', e); // Ausgabe des Fehlers in der Konsole
            error = e.message;
        } finally {
            loading = false;
        }
    }

    const switchTab = (tab) => {
        activeTab = tab;
    }

    const signup = async () => {
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
      <div class="header">TimeSwift</div>
      <div class="tabs">
        <button class:active={activeTab === 'login'} on:click={() => switchTab('login')}>Login</button>
        <button class:active={activeTab === 'createAccount'} on:click={() => switchTab('createAccount')}>Create Account</button>
      </div>
      {#if activeTab === 'login'}
        <!-- Login-Formular -->
        <div class="form">
          <div class="input-data">
            <input type="text" bind:value={username} required>
            <div class="underline"></div>
            <label>Username</label>
          </div>
          <div class="input-data">
            <input type="password" bind:value={password} required>
            <div class="underline"></div>
            <label>Password</label>
          </div>
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
            <input type="email" bind:value={email} required>
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
      <div>{error}</div>
    </div>
  </div>
</div>

<style>
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
    background-color: #FFFFFF;
    display: flex;
    justify-content: center; /* Zentriert den Inhalt horizontal */
    align-items: center; /* Zentriert den Inhalt vertikal */
    border-radius: 30px 0px 0px 30px;
  }
  .innerlogin {
    width: 70%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
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
    background-color: #2A2A2A;
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
    background-color: rgb(255, 255, 255);
  }
  .input-data {
    position: relative;
    margin-bottom: 20px;
    width: 70%;
  }
  .input-data input {
    width: 100%;
    border: none;
    border-bottom: 2px solid #292929;
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
    background-color: rgb(255, 255, 255);
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
    color: #fff;
    border: none;
    cursor: pointer;
    position: absolute; /* Absolute Positionierung innerhalb der innerlogin-Div */
    bottom: 5vh; /* Abstand vom unteren Rand der innerlogin-Div */
  }

  .action-button:hover {
    font-weight: bold;
    background-color: #2A2A2A !important; 
    color:#fff !important;
   
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
  
  
</style>