<script>
    import { page } from '$app/stores'
    import PocketBase from 'pocketbase';
    import { currentUser } from "$lib/auth";
    import { get } from "svelte/store";
    import { onMount } from "svelte";
    const pb = new PocketBase('http://127.0.0.1:8090');

    let animation = false;
    let showPopup = false;
    let showConfirmPopup = false;
    function togglePopup() {
        showPopup = !showPopup;
    }
    console.log($currentUser);
    function confirmLogout() {
        showConfirmPopup = true;
    }
    function logout() {
        pb.authStore.clear();
        window.location.href = '/';
    }
</script>

{#if $page.url.pathname !== '/routes' && $page.url.pathname !== '/login' && $page.url.pathname !== '/loader'}
    <div>
        <style>
            @import url("https://fonts.googleapis.com/css2?family=Yeon+Sung&display=swap");

            :root {
                --navbar-width: 13vw;
                --navbar-width-min: 80px;
            }

            html, body {
                margin: 0;
                background: #8F8F8F;
            }

            #nav-bar-top {
                position: fixed;
                left: 1vw;
                top: 0.5vw;
                height: calc(77% - 2vw);
                width: var(--navbar-width);
                border-radius: 20px;
                background: #111111;
                display: flex;
                flex-direction: column;
                align-items: flex-start; /* Elemente nach links ausrichten */
                justify-content: flex-start; /* Elemente nach oben ausrichten */
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                overflow: hidden;
                user-select: none;
                z-index: 10;
            }

            #nav-bar-bottom {
                position: fixed;
                left: 1vw;
                bottom: 1vw;
                height: 23%;
                width: var(--navbar-width);
                margin-top: 1vw;
                border-radius: 20px;
                background: #111111;
                display: flex;
                flex-direction: column;
                align-items: flex-start; /* Elemente nach links ausrichten */
                justify-content: flex-start; /* Elemente nach oben ausrichten */
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                overflow: hidden;
                user-select: none;
                z-index: 10;       
            }

            .nav-item {
                display: flex;
                align-items: center;
                padding: 20px; /* Mehr Padding für mehr Abstand */
                padding-left: 15%;
                color: white;
                text-align: left; /* Text links ausrichten */
                cursor: pointer;
                transition: background 0.3s;
                width: 100%; /* Volle Breite für bessere Ausrichtung */
                font-size: 17px; /* Größere Schriftgröße */
                font-weight: 400; /* Semi-bold Schrift */
            }

            .nav-item:hover {
                background: #0a5bb5;
            }

            .nav-icon {
                font-size: 20px; /* Größere Icon-Größe */
                padding: 0 7% 0 0; /* Mehr Abstand zwischen Icon und Text */
            }

            .nav-text, .nav-text-logout {
                flex: 1; /* Nimmt den restlichen Platz ein */
            }

            .nav-text-logout {
                color: red; /* Rote Schrift für Logout */
            }

            .nav-icon-logout {
                color: red; /* Rotes Icon für Logout */
            }

            .nav-icon-offline {
                color: gray; /* Graues Icon für Offline */
            }


            #bar {
                width: 80%; /* Breite der Bar */
                height: 2px; /* Höhe der Bar */
                background: white; /* Farbe der Bar */
                margin: 0 auto; /* Zentriert die Bar */
                border-radius: 20px; /* Runde Ecken */
            }

            #avatar-container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%; /* Volle Breite für zentrierte Ausrichtung */
                margin-top: auto; /* Abstand nach oben */
                margin-bottom: auto; /* Abstand nach unten */
            }

            #avatar img {
                border-radius: 50%; /* Runde Ecken für das Avatar-Bild */
            }
        </style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <div id="nav-bar-top">
            <div class="nav-item">
                <span class="material-symbols-outlined nav-icon">home</span>
                <span class="nav-text animate">Home</span>
            </div>
            <div class="nav-item">
                <span class="material-symbols-outlined nav-icon">calendar_today</span>
                <span class="nav-text animte">Calender</span>
            </div>
            <div class="nav-item">
                <span class="material-symbols-outlined nav-icon">schedule</span>
                <span class="nav-text">Timetable</span>
            </div>
            <div class="nav-item">
                <span class="material-symbols-outlined nav-icon">database</span>
                <span class="nav-text">Database</span>
            </div>
            <div class="nav-item">
                <span class="material-symbols-outlined nav-icon">timer</span>
                <span class="nav-text">Timer</span>
            </div>
            <div id="bar"></div> <!-- Trennlinie -->
            <div class="nav-item">
                <span class="material-symbols-outlined nav-icon">settings</span>
                <span class="nav-text">Settings</span>
            </div>
            <div class="nav-item">
                <span class="material-symbols-outlined nav-icon nav-icon-logout">logout</span>
                <span class="nav-text nav-text-logout">Logout</span>
            </div>
        </div>
        <div id="nav-bar-bottom">
            <div class="nav-item">
                <span class="material-symbols-outlined nav-icon nav-icon-offline">search_insights</span>
                <span class="nav-text">Insights</span>
            </div>
            <div id="avatar-container">
                <div id="avatar" on:click={togglePopup}>
                    {#if $currentUser && $currentUser.avatar}
                        <img src={pb.files.getUrl($currentUser, $currentUser.avatar)} alt="Avatar">
                    {:else}
                        <img src="/None-Avatar.png" alt="Default Avatar">
                    {/if}
                </div>
            </div>    
        </div>
    </div>
    <div class="fancy-layout">
        <slot />
    </div>
{:else}
    <slot />
{/if}