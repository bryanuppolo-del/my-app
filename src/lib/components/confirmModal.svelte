<script lang="ts">
    export let message: string = "Sei sicuro?";
    export let onConfirm: () => void;
    export let onCancel: () => void;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="modal-backdrop" on:click={onCancel} >
    <div class="modal" on:click|stopPropagation >
        <h4>{message}</h4>
        <div class="modal-actions">
            <button class="cancel-btn" on:click={onCancel} >Annulla</button>
            <button class="confirm-btn" on:click={onConfirm} >Conferma</button>
        </div>
    </div>
</div>

<style>
    .modal-backdrop{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .modal{
        background: white;
        padding: 20px;
        border-radius: 10px;
        width: 400px;
        max-width: 90%;
    }

    .modal h4{
        margin-top: 0;
        margin-bottom: 15px;
    }

    .modal-actions{
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    .modal-actions button{
        padding: 8px 12px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .confirm-btn { background: #C20F2F; color: white; }
    .cancel-btn { border: 1px solid #ccc; }
</style>