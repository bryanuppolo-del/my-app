<script>
  import { goto } from "$app/navigation";
  import { error } from "@sveltejs/kit";

    let codiceFiscale = "";
    let nome = "";
    let cognome = "";
    let sesso = "";
    let dataNascita = "";
    let nazioneNascita = "";
    let provinciaNascita = "";
    let comuneNascita = "";
    let provinciaResidenza = "";
    let comuneResidenza = "";
    let viaResidenza = "";
    let nc = "";
    let CAP = "";
    let email = "";
    let telefono = "";

    let errorCF = "";
    let errorEmail = "";
    let errorTel = "";
    let errorCAP= "";

    function validaCodiceFiscale() {
        const regex = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i;
        if (!regex.test(codiceFiscale)) {
            errorCF = "Codice fiscale non valido";
        }   else if (codiceFiscale === "RSSMRA85M01H501Z") {
            errorCF = "Il codice fiscale inserito è gia registrato"; 
        }   else {
            errorCF = "";
        }
    }

    function validaEmail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errorEmail = regex.test(email) ? "" : "email non valida"
    }

    function validaTel() {
        const regex = /^(\+39\s?)?3\d{2}\s?\d{7}$/;
        errorTel = regex.test(telefono) ? "" : "numero di telefono non valido"
    }

    function validaCAP() {
        const regex = /^\d{5}$/;
        errorCAP = regex.test(CAP) ? "" : "CAP inesistente"
    }

    /**
   * @param {{ preventDefault: () => void; }} e
   */
    function prossimoStep(e) {
        e.preventDefault();
        validaCodiceFiscale();
        validaEmail();
        validaTel();
        validaCAP();

        if (!errorCF && !errorEmail && !errorTel && !errorCAP) {
            const userData = {
            codiceFiscale,
            nome,
            cognome,
            sesso,
            dataNascita,
            nazioneNascita,
            provinciaNascita,
            comuneNascita,
            provinciaResidenza,
            comuneResidenza,
            viaResidenza,
            nc,
            CAP,
            email,
            telefono
            }

            localStorage.setItem("userData", JSON.stringify(userData));
            goto("/register/summary")
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

        <h1>Unisciti a noi oggi | <span>Registrati</span></h1>

        <div>
            Primo Step 
            <div class="stepper">
                <div class="step active"></div>
                <div class="step"></div>
            </div>
        </div>

        <form on:submit|preventDefault = {prossimoStep}>
            <label>
                Codice Fiscale*
                <div class="input-with-btn">
                    <input type="text"
                    bind:value={codiceFiscale}
                    class:error={errorCF}>
                    <button class="check-button" type="button" aria-label="checkbutton" on:click={validaCodiceFiscale}><i class='bx  bx-clipboard-check'  ></i> </button>
                </div>
                {#if errorCF}
                    <span class="error-message">{errorCF}</span>
                    {/if}
            </label>

            <label for="nome">
                Nome
                <input type="text" bind:value={nome}>
            </label>

            <label for="cognome">
                Cognome
                <input type="text" bind:value={cognome}>
            </label>

            <label for="sesso">
                Sesso
                <select bind:value={sesso}>
                    <option value="">Seleziona...</option>
                    <option value="M">Maschio</option>
                    <option value="F">Femmina</option>
                </select>
            </label>

            <label for="dataNascita">
                Data di nascita
                <input type="date" bind:value={dataNascita}>
            </label>

            <label for="nazioneNascita">
                Nazione di Nascita
                <select bind:value={nazioneNascita}>
                    <option value="">Seleziona...</option>
                    <option value="IT">Italia</option>
                    <option value="FR">Francia</option>
                    <option value="DE">Germania</option>
                </select>
            </label>

            <label for="provinciaNascita">
                Provincia di nascita
                <input type="text" bind:value={provinciaNascita}>
            </label>

            <label for="comuneNascita">
                Comune di nascita
                <input type="text" bind:value={comuneNascita}>
            </label>

            <label for="provinciaResidenza">
                Provincia di residenza
                <input type="text" bind:value={provinciaResidenza}>
            </label>

            <label for="comuneResidenza">
                Comune di residenza
                <input type="text" bind:value={comuneResidenza}>
            </label>

            <label for="viaResidenza">
                Via di residenza
                <input type="text" bind:value={viaResidenza}>
            </label>

            <label for="nc">
                Numero Civico
                <input type="text" bind:value={nc}>
            </label>

            <label for="CAP">
                CAP
                <input type="text" 
                bind:value={CAP}
                class:error={errorCAP}
                on:blur={validaCAP}>
                {#if errorCAP}
                    <span class="error-message">{errorCAP}</span>
                {/if}
            </label>

            <label for="email">
                Email
                <input type="email" 
                bind:value={email}
                class:error={errorEmail}
                on:blur={validaEmail}>
                {#if errorEmail}
                    <span class="error-message">{errorEmail}</span>
                {/if}
            </label>

            <label for="telefono">
                telefono
                <input type="tel" 
                bind:value={telefono}
                class:error={errorTel}
                on:blur={validaTel}>
                {#if errorTel}
                    <span class="error-message">{errorTel}</span>
                {/if}
            </label>

            <div class="btn-next">
                <button type="submit">Prossimo Step</button>
            </div>
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

    .check-button{
        border-radius: 0 5px 5px 0;
        padding: 8px 12px;
        font-size: 0.8rem;
        white-space: nowrap;
        border: 1px solid #0D3C60;
    }
    
</style>