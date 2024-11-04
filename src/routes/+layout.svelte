<script lang="ts">
    import { page } from '$app/stores'
    import { get } from "svelte/store";
    import { onMount } from "svelte";
    import LogoutModal from '$lib/components/logout.svelte';
    import Settings from '$lib/components/settings-lokal.svelte';
    import {goto} from "$app/navigation";
    import { isCollapsed } from '$lib/navbar';

    let animation = false;
    let showPopup = false;
    let showConfirmPopup = false;
    let showsettings = false;
    let side = '';
    let isLoginPage = false;

    let activeTab = 'home';
    let localIsCollapsed = false; // Local variable

    onMount(() => {
        // Synchronize local variable with store
        isCollapsed.subscribe(value => {
            localIsCollapsed = value;
        });
    });

    function toggleNavbar() {
        localIsCollapsed = !localIsCollapsed; // Update local variable
        isCollapsed.set(localIsCollapsed); // Update the store
    }

    function setActiveTab(tab) {
       if(!isLoginPage) {
           activeTab = tab;
       }
    }


    function togglePopup() {
        showPopup = !showPopup;
    }
    function confirmLogout() {
        showConfirmPopup = true;
    }
    const logout = () => {
        window.location.href = '/';
    }

    let showLogoutModal = false;

    function toggleLogoutModalClick() {
        showLogoutModal = true;
    }

    function handleConfirm() {
        // Handle logout logic
        showLogoutModal = false;
    }

    function handleCancel() {
        showLogoutModal = false;
    }

    const settingstoggle = () => {
        showsettings = !showsettings;
    };

    function calendargoto() {goto('/Calendar')};
    function timetablegoto() {goto('/Timetable')};
    function databasegoto() {goto('/Database')};
    function timergoto() {goto('/Timer')};
    function homegoto() {goto('/Home')};


    
</script>

{#if $page.url.pathname !== '/routes' && $page.url.pathname !== '/login' && $page.url.pathname !== '/loader' && $page.url.pathname !== '/'}
    <div>
        <style>
            @import url("https://fonts.googleapis.com/css2?family=Yeon+Sung&display=swap");

            :root {
                --navbar-width: 14.5vw;
                --navbar-width-collapsed: 4.5vw;
            }

            html, body {
                margin: 0;
                background: #333333;
            }

            #nav-bar-right {
                position: fixed;
                left: 0vw;
                top: 0vw;
                height: 100%;
                width: var(--navbar-width);
                background: #333333;
                display: flex;
                flex-direction: column;
                align-items: flex-start; /* Elemente nach links ausrichten */
                justify-content: flex-start; /* Elemente nach oben ausrichten */
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                overflow: hidden;
                user-select: none;
                z-index: 10;
                transition: right 0.5s;
            }

            #nav-bar-right.collapsed {
                width: var(--navbar-width-collapsed);
            }

            /*#nav-bar-right.visible, #nav-bar-right:hover {
                width: var(--navbar-width); 
            }*/
            
            #nav-bar-right.collapsed .nav-item i {
                margin: 0 auto;
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
                width: 90%; /* Breite der Bar */
                height: 0.5px; /* Höhe der Bar */
                background: #D9D9D9; /* Farbe der Bar */
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
            #header {
                display: flex;
                align-items: center;
                justify-content: center; /* Center horizontally */
                margin-top: 20px; /* Space above the header */
                width: 100%; /* Full width to center the content */
                cursor: pointer; /* Change cursor to pointer to indicate it's clickable */
            }

            #header img {
                height: 40px; /* Adjust the height of the logo */
                margin-right: 10px; /* Space between logo and text */
            }

            #header h1 {
                font-size: 24px; /* Adjust the font size */
                margin: 0; /* Remove default margin */
            }

            .time {
                color: black; /* Color for "Time" */
            }

            .swift {
                color: red; /* Color for "Swift" */
            }

            .nav-text , .nav-header {
                display: inline-block;
                transition: opacity 0.3s, width 0.3s;
                white-space: nowrap;
            }


            #nav-bar-right.collapsed .nav-text, #nav-bar-right.collapsed .nav-header {
                opacity: 0;
                width: 0;
                overflow: hidden;
            }

            #nav-bar-right.collapsed .nav-icon {
                display: flex;
                justify-content: center; /* Center horizontally */
                align-items: center; /* Center vertically */
                width: 60%; /* Full width to center the content */
            }

            .admin {
                background: #262626;
                border-radius: 10px; /* Ecken abrunden */
                width: 80%; /* Breite anpassen */
                margin: 0 auto; /* Zentriert das Element horizontal */
                padding: 10px; /* Innenabstand */
                transition: background 0.3s, border-radius 0.3s; /* Animation für Hintergrundfarbe und Ecken */
            }

            
            .admin.collapsed {
                background: none;
                color: #AE0000;
            }

            .active {
                position: relative;
            }

            .active::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 2px; /* Breite des Streifens */
                height: 70%; /* Höhe des Streifens */
                background-color: red; /* Farbe des Streifens */
            }
            
        </style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <div id="nav-bar-right" class:visible={!localIsCollapsed} class:collapsed={localIsCollapsed}>
            <div id="header" on:click={toggleNavbar}>
                <img src="Clock 56x56.png" alt="Logo" /> 
                <h1 class="nav-header"><span class="time">Time</span><span class="swift">Swift</span></h1>
            </div>
            <br>
            <div id="bar"></div> <!-- Trennlinie -->
            <div class="nav-item" class:active={activeTab === 'home'} on:click={() => setActiveTab('home')}>
                    <span class="material-symbols-outlined nav-icon"on:click={homegoto}>home</span>
                    <span class="nav-text"on:click={homegoto}>Home</span>
            </div>
            <div class="nav-item" class:active={activeTab === 'calendar'} on:click={() => setActiveTab('calendar')}>
                <span class="material-symbols-outlined nav-icon"on:click={calendargoto}>calendar_today</span>
                <span class="nav-text animte"on:click={calendargoto}>Calender</span>
            </div>
            <div class="nav-item" class:active={activeTab === 'timetable'} on:click={() => setActiveTab('timetable')}>
                <span class="material-symbols-outlined nav-icon"on:click={timetablegoto}>schedule</span>
                <span class="nav-text"on:click={timetablegoto}>Timetable</span>
            </div>
            <div class="nav-item" class:active={activeTab === 'database'} on:click={() => setActiveTab('database')}>
                <span class="material-symbols-outlined nav-icon"on:click={databasegoto}>database</span>
                <span class="nav-text"on:click={databasegoto}>Database</span>
            </div>
            <div class="nav-item" class:active={activeTab === 'insights'} on:click={() => setActiveTab('insights')}>
                <span class="material-symbols-outlined nav-icon"on:click={timergoto}>timer</span>
                <span class="nav-text"on:click={timergoto}>Timer</span>
            </div>

            <div id="bar"></div> <!-- Trennlinie -->

            <div class="nav-item">
                <span class="material-symbols-outlined nav-icon" on:click={settingstoggle}>settings</span>
                <span class="nav-text"on:click={settingstoggle}>Settings</span>
            </div>
            <div class="nav-item">
                <span class="material-symbols-outlined nav-icon" on:click={settingstoggle}>settings</span>
                <span class="nav-text"on:click={settingstoggle}>Settings</span>
            </div>
            <br>
            <div id="bar"></div> <!-- Trennlinie -->
            <br>
            <div class="nav-item">
                <span class="material-symbols-outlined nav-icon">search_insights</span>
                <span class="nav-text">Insights</span>
            </div>

            <div class="nav-item">
                <span class="material-symbols-outlined nav-icon nav-icon-logout"on:click={toggleLogoutModalClick}>logout</span>
                <span class="nav-text nav-text-logout" on:click={toggleLogoutModalClick}>Logout</span>
            </div>
            <br>
            <div id="bar"></div> <!-- Trennlinie -->
            <br>
            <div class="nav-item admin" class:collapsed={isCollapsed}>
                    <span class="material-symbols-outlined nav-icon">admin_panel_settings</span>
                    <span class="nav-text">Admin</span>
            </div>

        </div>
    </div>
    <div class="fancy-layout">
        <slot />
    </div>
{:else}
    <slot />
{/if}

{#if showLogoutModal}
  <LogoutModal 
    show={showLogoutModal} 
    onConfirm={handleConfirm} 
    onCancel={handleCancel} 
  />
{/if}

{#if showsettings}
    <Settings {showsettings} {settingstoggle} />
{/if}