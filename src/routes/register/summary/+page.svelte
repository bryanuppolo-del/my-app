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
        documento?: Documento;
    }

    interface Documento {
        tipo: string;
        numero: string;
        ente: string;
        emissione: string;
        scadenza: string;
        fronte: string;
        retro: string;
    }

    let userData: userData | null = null;

    onMount(() => {
        const data = localStorage.getItem("userData");
        console.log("Stringa grezza letta dal localStorage:", data);
        if (data) {
            userData = JSON.parse(data) as userData;
            console.log("Oggetto userData parsato:", userData);
            if (userData.documento) {
                console.log("valore di fronte", userData.documento.fronte);
                console.log("valore di retro", userData.documento.retro);
            }
        }
    });
</script>

<h1>Riepilogo dei dati registrati</h1>

{#if userData}
    <section>
        <h2>Step 1 - Dati Anagrafici</h2>
        <p><strong>Codice Fiscale:</strong> {userData.codiceFiscale}</p>
        <p><strong>Nome:</strong> {userData.nome}</p>
        <p><strong>Cognome:</strong> {userData.cognome}</p>
        <p><strong>Sesso:</strong> {userData.sesso}</p>
        <p><strong>Data di nascita:</strong> {userData.dataNascita}</p>
        <p><strong>Nazione di nascita:</strong> {userData.nazioneNascita}</p>
        <p><strong>Provincia di nascita:</strong> {userData.provinciaNascita}</p>
        <p><strong>Comune di nascita:</strong> {userData.comuneNascita}</p>
        <p><strong>Provincia di residenza:</strong> {userData.provinciaResidenza}</p>
        <p><strong>Comune di residenza:</strong> {userData.comuneResidenza}</p>
        <p><strong>Via di residenza:</strong> {userData.viaResidenza}</p>
        <p><strong>Numero Civico:</strong> {userData.nc}</p>
        <p><strong>CAP:</strong> {userData.CAP}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Telefono:</strong> {userData.telefono}</p>
    </section>

    <section>
    <h2>Step 2 - Documento</h2>
    
    {#if userData.documento}
        <p><strong>Tipo documento:</strong> {userData.documento.tipo}</p>
        <p><strong>Numero documento:</strong> {userData.documento.numero}</p>
        <p><strong>Ente emittente:</strong> {userData.documento.ente}</p>
        <p><strong>Data di emissione:</strong> {userData.documento.emissione}</p>
        <p><strong>Data di scadenza:</strong> {userData.documento.scadenza}</p>

        <div>
            <strong>Fronte:</strong>
            {#if userData.documento.fronte?.startsWith("data:image")}
                <img src="{userData.documento.fronte}" alt="Fronte documento">
            {:else if userData.documento.fronte?.startsWith("data:application/pdf")}
                <a href="{userData.documento.fronte}" target="_blank">Apri PDF Fronte</a>
            {:else}
                <p><em>Nessuna immagine o PDF per il fronte.</em></p>
            {/if}
        </div>

        <div>
            <strong>Retro:</strong>
            {#if userData.documento.retro?.startsWith("data:image")}
                <img src="{userData.documento.retro}" alt="Retro documento">
            {:else if userData.documento.retro?.startsWith("data:application/pdf")}
                <a href="{userData.documento.retro}" target="_blank">Apri PDF Retro</a>
            {:else}
                <p><em>Nessuna immagine o PDF per il retro.</em></p>
            {/if}
        </div>
    {:else}
        <p>Nessun documento caricato.</p>
    {/if}
</section>
{/if}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }

    h1{
        text-align: center;
    }

    h2{
        text-align: center;
        margin-top: 20px;
    }

    img{
        max-width: 200px;
        display: block;
        margin-top: 0.3rem;
    }

    section{
        border: 1px solid #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
    }

</style>