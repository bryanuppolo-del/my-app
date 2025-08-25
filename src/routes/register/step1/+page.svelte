<script>
  import { goto } from "$app/navigation";
  import { error } from "@sveltejs/kit";

    // Dati Form //

    let codice_fiscale = "";
    let first_name = "";
    let last_name = "";
    let sex = "";
    let date_of_birth = "";
    let nation_of_birth = "";
    let province_of_birth = "";
    let comune_of_birth = "";
    let nation_of_residence = "";
    let province_of_residence = "";
    let comune_of_residence = "";
    let place_of_residence = "";
    let address = "";
    let number_of_address = "";
    let cap_of_birth = "";
    let cap_of_residence = "";
    let email = "";
    let phone = "";

    let successCF = "";
    let errorCF = "";
    let errorEmail = "";
    let errorTel = "";
    let errorCAP= "";

    // Validators //

    function validaCodiceFiscale() {
        const regex = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i;
        if (!regex.test(codice_fiscale)) {
            errorCF = "Codice fiscale non valido";
            successCF = ""
        }   else if (codice_fiscale === "RSSMRA85M01H501Z") {
            errorCF = "Il codice fiscale inserito è gia registrato"; 
            successCF = ""
        }   else {
            errorCF = "";
            successCF = "Il codice fiscale è stato verificato con successo"
        }
    }

    function validaEmail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errorEmail = regex.test(email) ? "" : "email non valida"
    }

    function validaTel() {
        const regex = /^(\+39\s?)?3\d{2}\s?\d{7}$/;
        errorTel = regex.test(phone) ? "" : "numero di telefono non valido"
    }

    function validaCAP() {
        const regex = /^\d{5}$/;
        errorCAP = regex.test(cap_of_birth) ? "" : "CAP inesistente"
    }

    function validaCAP2() {
        const regex = /^\d{5}$/;
        errorCAP = regex.test(cap_of_residence) ? "" : "CAP inesistente"
    }

    // Next Step //

    /**
   * @param {{ preventDefault: () => void; }} e
   */
    function prossimoStep(e) {
        e.preventDefault();
        validaCodiceFiscale();
        validaEmail();
        validaTel();
        validaCAP();
        validaCAP2();

        if (!errorCF && !errorEmail && !errorTel && !errorCAP) {
            const userData = {
            codice_fiscale,
            first_name,
            last_name,
            sex,
            date_of_birth,
            nation_of_birth,
            province_of_birth,
            comune_of_birth,
            province_of_residence,
            comune_of_residence,
            address,
            number_of_address,
            cap_of_birth,
            cap_of_residence,
            email,
            phone,
            nation_of_residence,
            place_of_residence
            }

            localStorage.setItem("userData", JSON.stringify(userData));
            goto("/register/step2")
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
                    bind:value={codice_fiscale}
                    class:error={errorCF}
                    class:success={successCF}>
                    <button class="check-button" class:success={successCF} class:error={errorCF} type="button" aria-label="checkbutton" on:click={validaCodiceFiscale}><i class='bx  bx-clipboard-check'  ></i> </button>
                </div>
                {#if errorCF}
                    <span class="error-message">{errorCF}</span>
                    {:else if successCF}
                    <span class="success-message">{successCF}</span>
                {/if}
            </label>

            <label for="first_name">
                Nome
                <input type="text" bind:value={first_name}>
            </label>

            <label for="last_name">
                Cognome
                <input type="text" bind:value={last_name}>
            </label>

            <label for="sex">
                Sesso
                <select bind:value={sex}>
                    <option value="">Seleziona...</option>
                    <option value="M">Maschio</option>
                    <option value="F">Femmina</option>
                </select>
            </label>

            <label for="date_of_birth">
                Data di nascita
                <input type="date" bind:value={date_of_birth}>
            </label>

            <label for="nation_of_birth">
                Nazione di Nascita
                <select bind:value={nation_of_birth}>
                    <option value="">Seleziona...</option>
                    <option value="IT">Italia</option>
                    <option value="FR">Francia</option>
                    <option value="DE">Germania</option>
                </select>
            </label>

            <label for="province_of_birth">
                Provincia di nascita
                <input type="text" bind:value={province_of_birth}>
            </label>

            <label for="comune_of_birth">
                Comune di nascita
                <input type="text" bind:value={comune_of_birth}>
            </label>

            <label for="nation_of_residence">
                Nazione di Residenza
                <select bind:value={nation_of_residence}>
                    <option value="">Seleziona...</option>
                    <option value="IT">Italia</option>
                    <option value="FR">Francia</option>
                    <option value="DE">Germania</option>
                </select>
            </label>

            <label for="province_of_residence">
                Provincia di residenza
                <input type="text" bind:value={province_of_residence}>
            </label>

            <label for="comune_of_residence">
                Comune di residenza
                <input type="text" bind:value={comune_of_residence}>
            </label>

            <label for="place_of_residence">
                Località
                <input type="text" bind:value={place_of_residence}>
            </label>

            <label for="address">
                Via di residenza
                <input type="text" bind:value={address}>
            </label>

            <label for="number_of_address">
                Numero Civico
                <input type="text" bind:value={number_of_address}>
            </label>

            <label for="cap_of_birth">
                CAP Nascita
                <input type="text" 
                bind:value={cap_of_birth}
                class:error={errorCAP}
                on:blur={validaCAP}>
                {#if errorCAP}
                    <span class="error-message">{errorCAP}</span>
                {/if}
            </label>

            <label for="cap_of_residence">
                CAP Residenza
                <input type="text" 
                bind:value={cap_of_residence}
                class:error={errorCAP}
                on:blur={validaCAP2}>
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

            <label for="phone">
                Telefono
                <input type="tel" 
                bind:value={phone}
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

    input.success{
        border-color: #198754;
    }

    button.error{
        background: #DC3545;
        border: 1px solid #DC3545;
    }

    button.success{
        background: #198754;
        border: 1px solid #198754;
    }

    .error-message{
        color: #DC3545;
        font-size: 0.8rem;
        margin-top: 4px;
    }

    .success-message{
        color: #198754;
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
        margin-top: 5px;
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