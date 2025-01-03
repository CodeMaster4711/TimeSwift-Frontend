<script lang="ts">
    import { onMount } from 'svelte';
    import { token, id } from '$lib/config';
    import { get } from 'svelte/store';
    import { writable } from 'svelte/store';


    let temptoken: string | undefined;
    let tempid: string | undefined;

    const retentionOptions = [
        '10 Years',
        '5 Years',
        '3 Years',
        '1 Year',
        '6 Months',
        '3 Months',
        '1 Month',
        '7 Days',
        '3 Days',
        '1 Day'
    ];

    const organizationName = writable('TimeSwift');
    const organizationDescription = writable('We provide innovative time management solutions for businesses of all sizes.');
    const organizationAddress = writable(' 1234 TimeSwift Lane, Time City, Time Country');
    const organizationContact = writable(' +1 123 456 7890');
    const organizationWebsite = writable(' www.timeswift');
    const organizationFounded = writable(' 2021');
   
    let isPwpEnabled = writable(false);
    let isBackupEnabled = writable(false);
    let backupInterval = writable(7);
    let backupRetention = writable('30 Tage');
    let backupLocation = writable('');
    let connectionStatus = writable('Not tested');

    let force2FA = writable(false);
    let forceHTTPS = writable(false);
    let requireUppercase = writable(false);
    let requireLowercase = writable(false);
    let requireNumber = writable(false);
    let requireSpecialChar = writable(false);

    onMount(() => {
        token.subscribe(value => {
            temptoken = value;
        });

        id.subscribe(value => {
            tempid = value;
        });
    });

    function handlePwpToggle() {
        isPwpEnabled.update(value => !value);
    }

    function handleBackupToggle() {
        isBackupEnabled.update(value => !value);
    }

    async function testServerConnection() {
        connectionStatus.set('Testing...');
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            connectionStatus.set('Connected');
        } catch (error) {
            connectionStatus.set('Failed to connect');
        }
    }

    async function testSmtpConnection() {
        connectionStatus.set('Testing...');
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            connectionStatus.set('Connected');
        } catch (error) {
            connectionStatus.set('Failed to connect');
        }
    }

    function applysecuritySettings() {
        const securitySettings = {
            force2FA: $force2FA,
            forceHTTPS: $forceHTTPS,
            passwordPolicy: $isPwpEnabled,
            requireUppercase: $requireUppercase,
            requireLowercase: $requireLowercase,
            requireNumber: $requireNumber,
            requireSpecialChar: $requireSpecialChar
        };
        console.log('Security Settings:', JSON.stringify(securitySettings, null, 2));
    }

    function applyBackupSettings() {
        const backupSettings = {
            backupEnabled: $isBackupEnabled,
            backupInterval: $backupInterval,
            backupRetention: $backupRetention,
            backupLocation: $backupLocation,
            connectionStatus: $connectionStatus
        };

        console.log('Backup Settings:', JSON.stringify(backupSettings, null, 2));
    }
    


</script>

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<div class="main">
    <div class="main-header">
        <span class="material-icons">apartment</span> <!-- Icon hinzugefügt -->
        Organization Settings
    </div>
    <div class="body">
      
        <div class="general-informations">
            <h3 class="header">General Informations</h3>
            <div class="infomations"> 
                <div class="supercontainer">
                    <div class="container2">
                        <div class="info-item">
                            <label for="org-name">Organization Name:</label>
                            <input type="text" id="org-name" bind:value={$organizationName}>
                        </div>
                        <div class="info-item">
                            <label for="org-description">Description:</label>
                            <input type="text" id="org-description" bind:value={$organizationDescription}>
                        </div>
                        <div class="info-item">
                            <label for="org-address">Address:</label>
                            <input type="text" id="org-address" bind:value={$organizationAddress}>
                        </div>
                        <div class="info-item">
                            <label for="org-contact">Contact Information:</label>
                            <input type="text" id="org-contact" bind:value={$organizationContact}>
                        </div>
                        <div class="info-item">
                            <label for="org-website">Website:</label>
                            <input type="text" id="org-website" bind:value={$organizationWebsite}>
                        </div>
                        <div class="info-item">
                            <label for="org-founded">Founded Date:</label>
                            <input type="text" id="org-founded" bind:value={$organizationFounded}>
                        </div>
                    </div>
                    <div class="container1">
                        <div class="info-item">
                            <label for="org-logo"></label>
                            <img src="/logo.png" alt="Organization Logo" style="max-width: 250px; height: auto;">
                        </div>
                        <input type="file" id="org-logo" accept="image/*">
                    </div>
                </div>
            </div>
        </div>
       
        <div class="securtiy">
            <h3 class="header">Security</h3>
            <div class="infomations"> 
                <!--Force 2FA-->
                <div class="bundle">
                    <div class="toggle-switch">
                        <input class="toggle-input" id="toggle-2fa" type="checkbox" bind:checked={$force2FA}>
                        <label class="toggle-label" for="toggle-2fa"></label>
                    </div> 
                    <div class="label-text">Force 2FA</div>
                </div>
                <!--Force HTTPS-->
                <div class="bundle">
                    <div class="toggle-switch">
                        <input class="toggle-input" id="toggle-https" type="checkbox" bind:checked={$forceHTTPS}>
                        <label class="toggle-label" for="toggle-https"></label>
                    </div> 
                    <div class="label-text">Force HTTPS</div>
                </div>
                <!--Force HTTPS-->
                <div class="bundle">
                    <div class="toggle-switch">
                        <input class="toggle-input" id="toggle-pwp" type="checkbox" on:change={handlePwpToggle}>
                        <label class="toggle-label" for="toggle-pwp"></label>
                    </div> 
                    <div class="label-text">Password Policy</div>
                </div>
                {#if !$isPwpEnabled}
                    <button class="Applybutton">Apply</button>
                {/if}
            </div>
            {#if $isPwpEnabled}
                <div class="pwp-settings">
                    <h4>Password Policy Advanced Settings</h4>
                    <div class="pwp-advanced">
                        <div class="toggle-advanced">
                            <div class="bundle">
                                <div class="toggle-switch">
                                    <input class="toggle-input" id="toggle-up" type="checkbox" bind:checked={$requireUppercase}>
                                    <label class="toggle-label" for="toggle-up"></label>
                                </div> 
                                <div class="label-text">Uppercase</div>
                            </div>
                            <div class="bundle">
                                <div class="toggle-switch">
                                    <input class="toggle-input" id="toggle-low" type="checkbox"  bind:checked={$requireLowercase}>
                                    <label class="toggle-label" for="toggle-low"></label>
                                </div> 
                                <div class="label-text">Lowercase</div>
                            </div>
                            <div class="bundle">
                                <div class="toggle-switch">
                                    <input class="toggle-input" id="toggle-num" type="checkbox"  bind:checked={$requireNumber}>
                                    <label class="toggle-label" for="toggle-num"></label>
                                </div> 
                                <div class="label-text">Number</div>
                            </div>
                            <div class="bundle">
                                <div class="toggle-switch">
                                    <input class="toggle-input" id="toggle-s-char" type="checkbox" bind:checked={$requireSpecialChar}>
                                    <label class="toggle-label" for="toggle-s-char"></label>
                                </div> 
                                <div class="label-text">SpecialChar</div>
                            </div>
                        </div>

                        <div class="settings-input">
                            <div class="info-item">
                                <label for="min-length">Minimum Length:</label>
                                <input type="number" id="min-length" min="1" value="8">
                            </div>
                            <div class="info-item">
                                <label for="max-length">Maximum Length:</label>
                                <input type="number" id="max-length" min="1" value="20">
                            </div>
                        </div>

                    </div>
                    <button class="Applybutton" on:click={applysecuritySettings}>Apply</button>
                </div>
            {/if}
        </div>
       
        <div class="backup">
            <h3 class="header">Backup</h3>
            <div class="infomations"> 
                <div class="bundle">
                    <div class="toggle-switch">
                        <input class="toggle-input" id="toggle-Backup" type="checkbox" on:change={handleBackupToggle}>
                        <label class="toggle-label" for="toggle-Backup"></label>
                    </div> 
                    <div class="label-text">Backup</div>
                </div>
            </div>
            {#if $isBackupEnabled}
                <div class="backup-settings">
                    <h4>Backup Settings</h4>
                    <div class="backup_values">
                        <div class="info-item">
                            <label for="backup-interval">Backup Interval (days):</label>
                            <input type="number" id="backup-interval" min="1" bind:value={$backupInterval}>
                        </div>
                        <div class="info-item">
                            <label for="backup-retention">Backup Retention:</label>
                            <select id="backup-retention" bind:value={$backupRetention}>
                                {#each retentionOptions as option}
                                    <option value={option}>{option}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <div class="backup-server">  
                        <div class="connection-indicator" class:connected={$connectionStatus === 'Connected'}></div>
                        <div class="backup-server-input">  
                            <div class="info-item">
                                <label for="backup-location">Backup Location:</label>
                                <input type="text" id="backup-location" bind:value={$backupLocation} placeholder="Path/to/your/backup/location" style="width: 100%;">
                            </div>
                            <div class="info-item">
                                <button  class="conntectbutton"on:click={testServerConnection}>Connect to Server</button>
                                <div class="connection-status">Status: {$connectionStatus}</div>
                            </div>
                        </div>
                    </div>
                    <button class="Applybutton" on:click={applyBackupSettings}>Apply</button>
                </div>
             {/if}
        </div>
       
        <div class="Email">
            <h3 class="header">Email</h3>
            <div class="infomations"> 
                <div class="email-settings">
                    <div class="info-item">
                        <label for="smtp-server">SMTP Server:</label>
                        <input type="text" id="smtp-server" placeholder="smtp.example.com">
                    </div>
                    <div class="info-item">
                        <label for="smtp-port">SMTP Port:</label>
                        <input type="number" id="smtp-port" min="1" value="587">
                    </div>
                    <div class="info-item">
                        <label for="smtp-username">SMTP Username:</label>
                        <input type="text" id="smtp-username" placeholder="username@example.com">
                    </div>
                    <div class="info-item">
                        <label for="smtp-password">SMTP Password:</label>
                        <input type="password" id="smtp-password" placeholder="password">
                    </div>
                    <div class="info-item">
                        <label for="smtp-encryption">Encryption:</label>
                        <select id="smtp-encryption">
                            <option value="none">None</option>
                            <option value="ssl">SSL</option>
                            <option value="tls">TLS</option>
                        </select>
                    </div>
                    <div class="info-item">
                        <button class="conntectbutton" on:click={testSmtpConnection}>Test SMTP Connection</button>
                        <div class="connection-status">Status: {$connectionStatus}</div>
                    </div>
                </div>
                <button class="Applybutton">Apply</button>
            </div>
        </div>
        
        <div class="delete">
            <h3 class="header">Delete Organization</h3>
            <div class="infomations"> 
                <div class="info-item">
                    <label for="delete-organization">Delete Organization:</label>
                    <button class="deletebutton">Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 10px;
    }

    .body {
        margin-left: 10px;
        margin-right: 10px;
    }

    .main-header {
        font-size: 30px;
        font-weight: bold;
        color: #fff;
        padding: 20px;
        margin-bottom: 5px;
    }

    .header {
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 10px;
    }

    .general-informations {
        color: #fff;
        background-color: #2d2d2d;
        border-radius: 8px;
        padding: 20px;
    }

    .infomations {
        color: #fff;
        padding: 20px;
        background-color: #2d2d2d;
        border-radius: 8px;
    }

    .toggle-switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
    margin: 10px;
    }
    .toggle-switch .toggle-input {
    display: none;
    }

    .toggle-switch .toggle-label {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 24px;
    background-color: #666666;
    border-radius: 34px;
    cursor: pointer;
    transition: background-color 0.3s;
    }

    .toggle-switch .toggle-label::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    background-color: #fff;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s;
    }
    .toggle-switch .toggle-input:checked + .toggle-label {
    background-color: #F00101;
    }

    .toggle-switch .toggle-input:checked + .toggle-label::before {
    transform: translateX(16px);
    }
    .toggle-switch.light .toggle-label {
    background-color: #BEBEBE;
    }

    .toggle-switch.light .toggle-input:checked + .toggle-label {
    background-color: #9B9B9B;
    }

    .toggle-switch.light .toggle-input:checked + .toggle-label::before {
    transform: translateX(6px);
    }

    .toggle-switch.dark .toggle-label {
    background-color: #4B4B4B;
    }

    .toggle-switch.dark .toggle-input:checked + .toggle-label {
    background-color: #717171;
    }

    .toggle-switch.dark .toggle-input:checked + .toggle-label::before {
    transform: translateX(16px);
    }

    .label-text {
        margin-left: 10px; /* Abstand zwischen dem Button und dem Text */
    }
    .bundle {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        flex-direction: row;
    }

    
    .pwp-settings , .backup-settings {
        margin-top: -10px;
        color: #fff;
        padding: 10px;
        background-color: #2d2d2d;
        border-radius: 0px 0px 8px 8px;
    }

    .info-item {
        margin-bottom: 10px;
    }

    .info-item label {
        display: block;
        margin-bottom: 5px;
    }

    .info-item input {
        color: #fff;
        text-align: center;
        background-color: #2d2d2d;
        border-radius: 8px;
        border: 1px solid #4B4B4B;
        width: 150px;
        padding: 10px;
        box-sizing: border-box;
    }


    .pwp-advanced {
        display: flex;
        flex-direction: row;
    }

    .settings-input {
        margin-left: 200px;
    }

    .backup-rettention {
        display: flex;
        
    }

    .backup_values {
        display: flex;
        flex-direction: row;
        gap: 50px;
    }

    .backup_values select {
        color: #fff;
        text-align: center;
        background-color: #2d2d2d;
        border-radius: 8px;
        border: 1px solid #4B4B4B;
        width: 150px;
        padding: 10px;
        box-sizing: border-box;
    }

    .connection-indicator {
        width: 10px;
        height: 130px;
        border-radius: 4px;
        background-color: #FF0000;
        margin-right: 15px;
        transition: background-color 0.3s;
    }

    .connection-indicator.connected {
        background-color: #00FF00;
    }

    .backup-server {
        margin-top: 30px;
        display: flex;
        flex-direction: row;
    }

    #backup-location {
        width: 500px !important;
        font-size: medium;
    }

    .conntectbutton {
        padding: 10px;
        background-color: #1e1e1e;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        margin-bottom: 2px;
        cursor: pointer;
    }

    .Applybutton {
        margin-top: 20px;
        padding: 10px;
        width: 100px;
        background-color: #2d2d2d;
        border: 2px solid #f7f7f7;
        color: #ffffff;
        font-size: bold;
        border-radius: 4px;
        margin-bottom: 2px;
        cursor: pointer;
    }

    .Applybutton:hover {
        border: 2px solid #FF0000;
        color: #FF0000;
        transition: all 0.3s;
    }

    .container2 {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .container1 {
        display: flex;
        justify-content: flex-end;
        align-self: center;
        flex-direction: column;
    }

    .supercontainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

   
</style>