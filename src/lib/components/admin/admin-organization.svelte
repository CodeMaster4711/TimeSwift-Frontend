<script lang="ts">
    import { onMount } from 'svelte';
    import { token, id } from '$lib/config';
    import { get } from 'svelte/store';

    let temptoken: string | undefined;
    let tempid: string | undefined;
   

    onMount(() => {
        token.subscribe(value => {
            temptoken = value;
        });

        id.subscribe(value => {
            tempid = value;
        });
    });
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
                <div class="info-item">
                    <label for="org-logo">Logo:</label>
                   
                </div>
                <div class="info-item">
                    <label for="org-name">Organization Name:</label>
                  
                </div>
                <div class="info-item">
                    <label for="org-description">Description:</label>
                   
                </div>
                <div class="info-item">
                    <label for="org-address">Address:</label>
                </div>
                <div class="info-item">
                    <label for="org-contact">Contact Information:</label>
                   
                </div>
                <div class="info-item">
                    <label for="org-website">Website:</label>
                    
                </div>
                <div class="info-item">
                    <label for="org-founded">Founded Date:</label>
                   
                </div>
            </div>
        </div>
       
        <div class="serverspace">
            <h3 class="header">Server Space</h3>
            <div class="infomations"> 
            
            </div>
        </div>
       
        <div class="securtiy">
            <h3 class="header">Security</h3>
            <div class="infomations"> 
            
            </div>
        </div>
       
        <div class="backup">
            <h3 class="header">Backup</h3>
            <div class="infomations"> 
            
            </div>
        </div>
       
        <div class="Email">
            <h3 class="header">Email</h3>
            <div class="infomations"> 
            
            </div>
        </div>
        
        <div class="delete">
            <div class="infomations"> 
            
            </div>
        </div>
    </div>
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        width: 100%;
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
</style>