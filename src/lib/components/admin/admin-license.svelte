<script lang="ts">
    import { onMount } from 'svelte';
    import { token, id } from '$lib/config';
    import { get } from 'svelte/store';
    import { writable } from 'svelte/store';

    let mainServerSpace = {
        totalSpace: "2",
        usedSpace: "2",
        availableSpace: "0"
    };

    let backupServerSpace = {
        totalSpace: "20",
        usedSpace: "14",
        availableSpace: "6"
    };

    let clientspace = {
        totalSpace: "50",
        usedSpace: "46",
        availableSpace: "4"
    };

    let mainUsedPercentage = writable(0);
    let backupUsedPercentage = writable(0);
    let clientUsedPercentage = writable(0);
    onMount(() => {
        // Berechne den Prozentsatz des genutzten Speicherplatzes für den Hauptserver
        const mainTotalSpaceGB = parseInt(mainServerSpace.totalSpace);
        const mainUsedSpaceGB = parseInt(mainServerSpace.usedSpace);
        mainUsedPercentage.set((mainUsedSpaceGB / mainTotalSpaceGB) * 100);

        // Berechne den Prozentsatz des genutzten Speicherplatzes für den Backup-Server
        const backupTotalSpaceGB = parseInt(backupServerSpace.totalSpace);
        const backupUsedSpaceGB = parseInt(backupServerSpace.usedSpace);
        backupUsedPercentage.set((backupUsedSpaceGB / backupTotalSpaceGB) * 100);

        // Berechne den Prozentsatz des genutzten Speicherplatzes für den Client
        const clientTotalSpaceGB = parseInt(clientspace.totalSpace);
        const clientUsedSpaceGB = parseInt(clientspace.usedSpace);
        clientUsedPercentage.set((clientUsedSpaceGB / clientTotalSpaceGB) * 100);
    });

    function getProgressBarColor(percentage) {
        if (percentage < 50) {
            return 'green';
        } else if (percentage < 75) {
            return 'yellow';
        } else {
            return 'red';
        }
    }
</script>

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<div class="main">
    <div class="main-header">
        <span class="material-icons">storage</span> <!-- Icon hinzugefügt -->
        Server
    </div>
    <div class="server-space">
        <div id="disc">
            <div class="icon-container">
                <span id="icon" class="material-icons">storage</span>
                <div class="container">
                    <div>Server Licence</div>
                </div>
            </div>
        </div>
        <div class="progress-bar">
            <div class="progress" style="width: {$mainUsedPercentage}%; background-color: {getProgressBarColor($mainUsedPercentage)};"></div>
        </div>
        <div class="space-info"> {mainServerSpace.usedSpace} von {mainServerSpace.totalSpace}</div>
    </div>
    <div class="server-space">
        <div id="disc">
            <div class="icon-container">
                <span id="icon" class="material-icons">person</span>
                <div class="container">
                    <div>User Licence</div>
                </div>
            </div>
            <div class="container">
             
            </div>
        </div>
        <div class="progress-bar">
            <div class="progress" style="width: {$backupUsedPercentage}%; background-color: {getProgressBarColor($backupUsedPercentage)};"></div>
        </div>
        <div class="space-info"> {backupServerSpace.usedSpace} von {backupServerSpace.totalSpace}</div>
    </div>
    <div class="server-space">
        <div id="disc">
            <div class="icon-container">
                <span id="icon" class="material-symbols-outlined">database</span>
                <div class="container">
                    <div>Client Licence</div>
                    
                </div>
            </div>
            <div class="container">
                
            </div>
        </div>
        <div class="progress-bar">
            <div class="progress" style="width: {$clientUsedPercentage}%; background-color: {getProgressBarColor($clientUsedPercentage)};"></div>
        </div>
        <div class="space-info"> {clientspace.usedSpace} von {clientspace.totalSpace}</div>
    </div>
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 10px;
    }
    .main-header {
        font-size: 30px;
        font-weight: bold;
        color: #fff;
        padding: 20px;
        margin-bottom: 5px;
    }

    .container {
        margin-left: 20px;
        font-size: 16px;
        color: #ccc;
    }

    .server-space {
        margin-left: 10px;
        margin: 20px;
        border-radius: 10px;
        background-color: #2d2d2d;
        padding: 20px;
    }

    .space-info {
        margin-bottom: 10px;
        margin-left: 20px;
        font-size: 16px;
        margin-top: 10px;
        color: #ccc;
    }

    .progress-bar {
        justify-self: center;
        margin-top: 20px;
        width: 97%;
        background-color: #ccc;
        border-radius: 10px;
        overflow: hidden;
    }

    .progress {
        height: 10px;
        width: 90%;
        background-color: #F00101;
        border-radius: 10px 0 0 10px;
        transition: width 0.3s;
    }

    #disc {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .icon-container {
        display: flex;
        align-items: center;
    }

    .icon-container .material-icons .material-symbols-outlined {
        font-size: 40px;
        margin-right: 10px;
    }

    #icon {
        color: #fff;
    }
</style>