<script lang="ts">
  import { goto } from "$app/navigation";
  import { error } from "@sveltejs/kit";
  import { onMount } from "svelte";

    // Dati Form //

    let document_type: string = "";
    let document_number: string = "";
    let errorDocumento: string = ""

    let userData: any = null;

    onMount(() => {
        const data = localStorage.getItem("userData");
        if (data) {
            userData = JSON.parse(data);
        }
    });

    // Validator documenti //

    function validaDocumento() {
        if (!document_type) {
            errorDocumento = "Seleziona un tipo di documento";
            return
        }

        if (!document_number) {
            errorDocumento = "Inserisci il numero del documento";
            return
        }

        switch (document_type) {
            case "carta_identita":
                if (!/^[A-Z0_9]{9}$/i.test(document_number)) {
                    errorDocumento = "Il numero è errato";
                    return
                }
                break;

            case "passaporto" :
                if (!/^[A-Z]{2}[0-9]{7}$/i.test(document_number)) {
                    errorDocumento = "Il numero del passaporto è errato";
                    return
                }
                break;

            case "patente" :
                if (!/^[A-Z0-9]{10}$/i.test(document_number)) {
                    errorDocumento = "il numero della patente è errato";
                    return
                }
                break;

            default:
                errorDocumento = "Tipo di documento non valido";
                return;
        }
        errorDocumento = "";
    }

    // Prossimo step //

    function prossimoStep(e: Event) {
        e.preventDefault();
        validaDocumento();

        if (!errorDocumento) {
            const newUserData = {
                ...userData,
                documento: {
                     tipo: document_type,
                   numero: document_number
                }
            };

            localStorage.setItem("userData", JSON.stringify(newUserData));

            goto("/register/summery")
        }
    }

    // Back Button // 

    function goBack() {
        history.back();
    }
</script>

    <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    </head>

    <div class="container">

        <button class="back-btn" on:click={goBack}>Indietro</button>

        <h1>Ci sei quasi! | <span>Registrati</span></h1>

        <div>
            Secondo Step 
            <div class="stepper">
                <div class="step active"></div>
                <div class="step active"></div>
            </div>
        </div>

        <form on:submit|preventDefault={prossimoStep}>
            <label for="document_type">
                Tipo documento
                <select bind:value={document_type}>
                    <option value="">Seleziona tipo documento</option>
                    <option value="carta_identita">Carta d'identità</option>
                    <option value="passaporto">Passaporto</option>
                    <option value="patente">Patente</option>
                </select>
            </label>

            <label for="document_number">
                Numero Documento
            </label>
        </form>
    </div>

<style>
     @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }

    .container{
        max-width: 1000px;
        margin: 40px auto;
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    h1{
        text-align: center;
        margin-bottom: 40px;
    }

    .stepper{
        display: flex;
    }

    .step{
        width: 100px;
        height: 20px;
        border: 1px solid #0D3C60;
        margin-right: 10px;
        margin-bottom: 40px;
        margin-top: 10px;
        border-radius: 10px;
    }

    .active{
        background: #0D3C60;
    }
</style>