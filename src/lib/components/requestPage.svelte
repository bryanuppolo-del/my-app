<script>
// @ts-nocheck

    import { onMount } from "svelte";

    export let apiMode = false;
    /**
   * @type {any[]}
   */
    let data = [];
    let selected = [];

    function loadRequests() {
        if (apiMode) {
            fetch("api/requests")
            .then(r => r.json())
        } else {
            const stored = localStorage.getItem("requests");
            if (stored) {
                data = JSON.parse(stored);
            } else {
                data = [
                    {id: "#11223344", cliente: "Bryan Uppolo", scadenza: 8, assegnazione: "Giuseppe Biamonte", stato: "accettata"},
                    {id: "#12312345", cliente: "Antonio Costantini", scadenza: 2, assegnazione: "Giuseppe Biamonte", stato: "in attesa"},
                    {id: "#32132112", cliente: "Mattia David", scadenza: 0, assegnazione: "Giuseppe Biamonte", stato: "scaduta"}
                ];
                localStorage.setItem("requests", JSON.stringify(data));
            }
        }
    }

    function saveRequests() {
        if(!apiMode) {
            localStorage.setItem("requests", JSON.stringify(data));
        }
    }

    function acceptRequests(id) {
        data = data.map(r => r.id ===id ? { ...r, stato:"accettata" } : r)
    }

    function rejectRequests(id) {
        data = data.map(r => r.id ===id ? { ...r, stato:"rifiutata" } : r)
    }

    function acceptSelected() {
        data = data.map(r => selected.includes(r.id) ? { ...r, stato: "accettata"} : r);
        selected = [];
        saveRequests();
    }

    function rejectSelected() {
        data = data.map(r => selected.includes(r.id) ? { ...r, stato: "rifiutata"} : r);
        selected = [];
        saveRequests();
    }

    onMount(() => {
        loadRequests();
    });

    // Statistiche
    $: acceptedCount = data.filter(r => r.stato === "accettata").length;
    $: nearDeadlineCount = data.filter(r => r.scadenza >= 2 && r.stato === "in attesa").length;
    $: toAcceptCount = data.filter(r => r.stato === "in attesa").length;
    $: expiredCount = data.filter(r => r.stato === "scaduta").length;
</script>

<div class="dashboard">
    <div class="stats">
        <div class="card">
            <h2>Richieste Accettate</h2>
            <p>{acceptedCount}</p>
        </div>
        <div class="card">
            <h2>Scadenza Vicina</h2>
            <p>{nearDeadlineCount}</p>
        </div>
        <div class="card">
            <h2>Da accettare</h2>
            <p>{toAcceptCount}</p>
        </div>
        <div class="card">
            <h2>Scadute recentemente</h2>
            <p>{expiredCount}</p>
        </div>
    </div>

    <div class="requests">
        <div class="btn-group">
            <button class="btn-accept" on:click={acceptSelected}>Accetta</button>
            <button class="btn-reject" on:click={rejectSelected}>Rifiuta</button>
        </div>

        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Cliente</th>
                    <th>ID richiesta</th>
                    <th>Scadenza</th>
                    <th>Assegnazione</th>
                    <th>Stato</th>
                    <th>Azioni</th>
                </tr>
            </thead>
            <tbody>
                {#each data as r}
                    <tr>
                        <td>
                            <input type="checkbox" bind:group={selected} value={r.id} >
                        </td>
                        <td>{r.cliente}</td>
                        <td>{r.id}</td>
                        <td>{r.scadenza}</td>
                        <td>{r.assegnazione}</td>
                        <td>
                            <span class="badge {r.stato.replaceAll('', '-')}">{r.stato}</span>
                        </td>
                        <td class="actions">
                            <button class="btn-accept" on:click={() => acceptRequests(r.id)}>Accetta</button>
                            <button class="btn-reject" on:click={() => rejectRequests(r.id)}>Rifiuta</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .dashboard{
        padding: 20px;
    }

    .stats{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin-bottom: 20px;
    }

    .card{
        background: #f5f5f5;
        padding: 16px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0,1);
    }

    .card h2{
        font-size: 16px;
        margin: 0 0 8px 0;
    }

    .card p {
        font-size: 20px;
        font-weight: bold;
        margin: 0;
    }

    .requests {
        background: #fff;
        padding: 16px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    table{
        width: 100%;
        border-collapse: collapse;
    }

    th, td{
        padding: 8px;
        border-bottom: 1px solid #ddd;
        text-align: left;
    }

    .actions button{
        margin-right: 6px;
        padding: 4px 8px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
    }

    .btn-accept{ background: #198754; color: white;}
    .btn-reject{ background: #C20F2F; color: white;}
    .btn-group button{
        margin-left: 6px;
    }

    .badge{
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 12px;
    }

    .badge.accettata {background: #c836c9;}
    .badge.in-attesa {background: #fff9c4;}
    .badge.scaduta {background: #ffcdd2;}
    .badge.rifiutata {background: #e0e0e0;} 
</style>