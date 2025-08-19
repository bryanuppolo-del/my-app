<script lang="ts">
    import { onMount } from "svelte";

    interface userData {
        codiceFiscale: string;
        nome: string;
        cognome: string;
        sesso: string;
        dataNascita: string;
        nazioneNascita: string;
        provinciaNascita: string;
        comuneNascita: string;
        provinciaResidenza: string;
        comuneResidenza: string;
        viaResidenza: string;
        nc: string;
        CAP: string;
        email: string;
        telefono: string;
    }

    let userData: userData | null = null;

    onMount(() => {
        const data = localStorage.getItem("userData");
        if (data) {
            userData = JSON.parse(data) as userData;
        }
    });
</script>

<h1>UTENTE REGISTRATO</h1>

{#if userData} 
    <form class="summary-form">

        <label for="CF">
            Codice Fiscale:
            <input type="text" value={userData.codiceFiscale} readonly>
        </label>

        <label for="nome">
            Nome:
            <input type="text" value={userData.nome} readonly>
        </label>

        <label for="cognome">
            Cognome:
            <input type="text" value={userData.cognome} readonly>
        </label>

        <label for="Sesso">
            Sesso:
            <input type="text" value={userData.sesso} readonly>
        </label>

        <label for="dataNascita">
            Data di nascita:
            <input type="text" value={userData.dataNascita} readonly>
        </label>

        <label for="nazioneNascita">
            Nazione di Nascita:
            <input type="text" value={userData.nazioneNascita} readonly>
        </label>

        <label for="provinciaNascita">
            Provincia di nascita:
            <input type="text" value={userData.provinciaNascita} readonly>
        </label>

        <label for="comuneNascita">
            Comune di nascita:
            <input type="text" value={userData.comuneNascita} readonly>
        </label>

        <label for="provinciaResidenza">
            Provincia di residenza:
            <input type="text" value={userData.provinciaResidenza} readonly>
        </label>

        <label for="comuneResidenza">
            Comune di residenza:
            <input type="text" value={userData.comuneResidenza} readonly>
        </label>

        <label for="viaResidenza">
            Via di residenza:
            <input type="text" value={userData.viaResidenza} readonly>
        </label>

        <label for="NC">
            Numero Civico:
            <input type="text" value={userData.nc} readonly>
        </label>

        <label for="CAP">
            CAP:
            <input type="text" value={userData.CAP} readonly>
        </label>

        <label for="email">
            Email:
            <input type="email" value={userData.email} readonly>
        </label>

        <label for="telefono">
            Telefono:
            <input type="text" value={userData.telefono} readonly>
        </label>
    </form>
    {:else}
    <p>nessun dato trovato, Torna alla schermata <a href="/register">pagina di registrazione</a></p>
{/if}

<style>
    .summary-form{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem 2rem;
        max-width: 800px;
        margin: 2rem auto;
    }

    label{
        display: flex;
        flex-direction: column;
        font-weight: bold;
    }

    input{
        padding: 0.5rem;
        border: 1px solid #ccc;
        background: #f8f8f8;
        border-radius: 5px;
    }
</style>