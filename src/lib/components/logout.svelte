<script>
    import {pb} from "$lib/auth";
    import { goto } from '$app/navigation';

    export let show = false;
    export let onConfirm;
    export let onCancel;
  
    const handleConfirm = async () => {
        try {
            await pb.authStore.clear(); 
            onConfirm();
            goto('/'); 
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handleCancel = () => {
        onCancel();
    };
  </script>
  
  <style>
    .modal {
        position: fixed;
        left: 50%;
        top: 50%;
        width: 20vw;
        height: 15vh;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: top 0.3s ease-in-out;
        z-index: 400;
        transform: translate(-50%, -50%);
        background-color: #5c5c5c;
    } 
    .modal-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .modal.show {
        top: 50%;
    }
    .modal-buttons {
        margin-top: 20px;
    }
    .modal-buttons button {
        margin: 0 10px;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 10px;
        border: none;
        cursor: pointer;
    }
    .modal-buttons button#Logout {
        background-color: #f44336;
        color: white;
    }
    .modal-buttons button#Cancel {
        background-color: #9e9e9e;
        color: white;
    }
  </style>
  
  <div class="modal {show ? 'show' : ''}">
    <div class="modal-content">
      <p>Logout?</p>
      <div class="modal-buttons">
        <button id="Chancel" on:click={handleCancel}>Chancel</button>
        <button id="Logout" on:click={handleConfirm}>Logout</button>
      </div>
    </div>
  </div>