<script lang="ts">
  import { goto } from "$app/navigation";
  import { error } from "@sveltejs/kit";
  import { onMount } from "svelte";

  function convertFileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }

    // Dati Form //

    let document_type: string = "";
    let document_number: string = "";
    let document_issuer: string = "";
    let issue_date: string = "";
    let expiry_date: string = "";
    let document_image_front: File | null = null;
    let document_image_back: File | null = null;

    // Errori //

    let errorDocumento = "";
    let errorEmissione = "";
    let errorScadenza = "";
    let errorFileFronte = "";
    let errorFileRetro = "";

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
                if (!/^[C][A-Z]\d{5}[A-Z]{2}$/i.test(document_number)) {
                    errorDocumento = "Il numero è errato";
                    return
                }
                break;

            case "passaporto" :
                if (!/^[A-Z0-9]{2}\d{7}$/i.test(document_number)) {
                    errorDocumento = "Il numero del passaporto è errato";
                    return
                }
                break;

            case "patente" :
                if (!/^([A-Z]{2}\d{7}[A-Z])|(U1[A-Z0-9]{8})$/i.test(document_number)) {
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

    function validaDate() {
        const today = new Date().toISOString().split("T")[0];

        if (issue_date && issue_date > today) {
            errorEmissione = "La data di emissione non può essere futura"
        } else{
            errorEmissione = "";
        }

        if (expiry_date && expiry_date < today) {
            errorScadenza = "Il documento risulta essere scaduto"
        } else{
            errorScadenza = "";
        }
    }

function validaFile(file: File | null, isFronte = true) {
    isFronte ? (errorFileFronte = "") : (errorFileRetro = "");

    if (!file) {
        isFronte ? (errorFileFronte = "Carica il file fronte") : (errorFileRetro = "Carica il file retro");
        return;
    }

    const validTypes = [
        "image/jpeg", 
        "image/png", 
        "application/pdf",
        "application/x-pdf"
    ];

    if (!validTypes.includes(file.type)) {
        isFronte 
            ? (errorFileFronte = "Formato non valido (solo jpg, png, pdf)") 
            : (errorFileRetro = "Formato non valido (solo jpg, png, pdf)");
        return;
    }

    if (file.size > 5 * 1024 * 1024) { 
        isFronte 
            ? (errorFileFronte = "Il file deve essere < 5MB") 
            : (errorFileRetro = "Il file deve essere < 5MB");
        return;
    }
}

    // Prossimo step //

    async function prossimoStep(e: Event) {
        e.preventDefault();

        validaDocumento();
        validaDate();
        validaFile(document_image_front, true);
        validaFile(document_image_back, false);

        if (errorDocumento || errorEmissione || errorScadenza || errorFileFronte || errorFileRetro) {
            console.error("Validazione fallita, il form non verrà inviato.");
            return;
        }

        try {
            let fronteBase64: string | null = null;
            if (document_image_front) {
                fronteBase64 = await convertFileToBase64(document_image_front);
            }

            let retroBase64: string | null = null;
            if (document_image_back) {
                retroBase64 = await convertFileToBase64(document_image_back);
            }

            const newUserData = {
                ...userData,
                documento: {
                    tipo: document_type,
                    numero: document_number,
                    ente: document_issuer,
                    emissione: issue_date,
                    scadenza: expiry_date,
                    fronte: fronteBase64,
                    retro: retroBase64   
                }
            };
            
            localStorage.setItem("userData", JSON.stringify(newUserData));
            goto("/register/summary");

        } catch (err) {
            console.error("Errore durante la conversione del file in Base64:", err);
            alert("Si è verificato un errore nel caricamento dei file. Riprova.");
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
                <select bind:value={document_type} class:error={errorDocumento}>
                    <option value="">Seleziona tipo documento</option>
                    <option value="carta_identita">Carta d'identità</option>
                    <option value="passaporto">Passaporto</option>
                    <option value="patente">Patente</option>
                </select>
            </label>

            <label for="document_number">
                Numero Documento:
                <input type="text" bind:value={document_number} on:blur={validaDocumento} class:error={errorDocumento} required>
                {#if errorDocumento}
                    <p class="error-message">{errorDocumento}</p>
                {/if}
            </label>

            <label for="document_issuer">
                Ente emittente:
                <input type="text" bind:value={document_issuer} required>
            </label>

            <label for="issue_date">
                Data di emissione:
                <input type="date" bind:value={issue_date} on:change={validaDate} required>
                {#if errorEmissione}
                    <p class="error-message">{errorEmissione}</p>
                {/if}
            </label>

            <label for="expiry_date">
                Data di scadenza:
                <input type="date" bind:value={expiry_date} on:change={validaDate} required>
                {#if errorScadenza}
                    <p class="error-message">{errorScadenza}</p>
                {/if}
            </label>

            <label for="document_image_front">
    Foto documento frontale:
    <input 
        type="file" 
        accept=".jpg,.jpeg,.png,.pdf" 
        on:change={(e) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];
                console.log("TIPO MIME RILEVATO DAL BROWSER:", file.type);
                document_image_front = file;
            } else {
                document_image_front = null;
            }
        }} 
        on:blur={() => validaFile(document_image_front, true)}
    >
    </label>

            <label for="document_image_back">
                Foto documento retro:
                <input type="file" accept=".jpg,.jpeg,.png,.pdf" on:change={(e) => document_image_back = (e.target as HTMLInputElement).files?.[0] || null} on:blur={() => validaFile(document_image_back, false)}>
                {#if errorFileRetro}
                    <p class="error-message">{errorFileRetro}</p>
                {/if}
            </label>

            <button type="submit">registrati</button>
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

    form{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    label{
        display: flex;
        flex-direction: column;
        font-weight: bold;
        font-size: 0,9rem;
    }

    input, select{
        padding: 8px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    input.error{
        border-color: #DC3545;
    }

    .error-message{
        color: #DC3545;
        font-size: 0.8rem;
        margin-top: 4px;
    }

    button{
        background: #0D3C60;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .input-with-btn {
        display: flex;
        align-items: center;
    }

    .input-with-btn input{
        flex: 1;
        border-radius: 5px 0 0 5px;
        margin: 0;
    }
</style>