<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import Icon from "@iconify/svelte";
    import ConfirmModal from "./confirmModal.svelte";

    export let apiMode = false;
    let data = [];
    let selected = [];
    
    let requestToActOn = null;

    let showAccept = false;
    let showReject = false;
    let showAcceptGroup = false;
    let showRejectGroup = false;

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
        data = data.map(r => r.id === id ? { ...r, stato: "accettata" } : r);
        saveRequests();
        showAccept = false;
        requestToActOn = null;
    }

    function rejectRequests(id) {
        data = data.map(r => r.id === id ? { ...r, stato: "rifiutata" } : r);
        saveRequests();
        showReject = false;
        requestToActOn = null;
    }

    function acceptSelected() {
        data = data.map(r => selected.includes(r.id) ? { ...r, stato: "accettata"} : r);
        selected = [];
        showAcceptGroup = false;
        saveRequests();
    }

    function rejectSelected() {
        data = data.map(r => selected.includes(r.id) ? { ...r, stato: "rifiutata"} : r);
        selected = [];
        showRejectGroup = false;
        saveRequests();
    }

    onMount(() => {
        loadRequests();
    });

    $: acceptedCount = data.filter(r => r.stato === "accettata").length;
    $: nearDeadlineCount = data.filter(r => r.scadenza >= 2 && r.stato === "in attesa").length;
    $: toAcceptCount = data.filter(r => r.stato === "in attesa").length;
    $: expiredCount = data.filter(r => r.stato === "scaduta").length;
</script>

<div class="dashboard">
    <div class="stats">
        <div class="card">
            <div class="icon-section">
                <div class="icon-check">
                    <Icon icon="gg:check-o" width="35" height="35" />
                </div>
                <div class="icon-go">
                    <Icon icon="cuida:arrow-right-outline" width="24" height="24" />
                </div>
            </div>
            <h2>Richieste Accettate</h2>
            <p class="count">{acceptedCount}</p>
            <p style="font-size: 12px">sono state già accettate</p>
        </div>
        <div class="card">
            <div class="icon-section">
                <div class="icon-alert">
                    <Icon icon="streamline:warning-octagon-remix" width="35" height="35" />
                </div>
                <div class="icon-go">
                    <Icon icon="cuida:arrow-right-outline" width="24" height="24" />
                </div>
            </div>
            <h2>Scadenza Vicina</h2>
            <p class="count">{nearDeadlineCount}</p>
            <p style="font-size: 12px">da controllare al più presto</p>
        </div>
        <div class="card">
            <div class="icon-section">
                <div class="icon-warning">
                    <Icon icon="cuida:warning-outline" width="35" height="35" />
                </div>
                <div class="icon-go">
                    <Icon icon="cuida:arrow-right-outline" width="24" height="24" />
                </div>
            </div>
            <h2>Da accettare</h2>
            <p class="count">{toAcceptCount}</p>
            <p style="font-size: 12px">hanno bisogno di validazione</p>
        </div>
        <div class="card">
            <div class="icon-section">
                <div class="icon-ok">
                    <Icon icon="mingcute:warning-line" width="35" height="35" />
                </div>
                <div class="icon-go">
                    <Icon icon="cuida:arrow-right-outline" width="24" height="24" />
                </div>
            </div>
            <h2>Scadute recentemente</h2>
            <p class="count">{expiredCount}</p>
            <p style="font-size: 12px">sono già scadute</p>
        </div>
    </div>

    <div class="requests">
        <div class="act-group">
            <h2>Ultime richieste</h2>
            <div class="btn-group">
                <button class="btn-accept" on:click={() => (showAcceptGroup = true)}>Accetta</button>
                <button class="btn-reject" on:click={() => (showRejectGroup = true)}>Rifiuta</button>
            </div>
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
                {#each data as r (r.id)}
                    <tr>
                        <td>
                            <input type="checkbox" bind:group={selected} value={r.id} >
                        </td>
                        <td>{r.cliente}</td>
                        <td>{r.id}</td>
                        <td>{r.scadenza}</td>
                        <td>{r.assegnazione}</td>
                        <td>
                            <span class="badge {r.stato.replaceAll(' ', '-')}">{r.stato}</span>
                        </td>
                        <td class="actions">
                            <button class="btn-accept" on:click={() => { requestToActOn = r.id; showAccept = true; }}>Accetta</button>
                            <button class="btn-reject" on:click={() => { requestToActOn = r.id; showReject = true; }}>Rifiuta</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

{#if showAccept}
    <ConfirmModal
        message="Sei sicuro di voler accettare questa richiesta?"
        onConfirm={() => acceptRequests(requestToActOn)}
        onCancel={() => {showAccept = false; requestToActOn = null;}}
    /> 
{/if}

{#if showReject}
    <ConfirmModal
        message="Sei sicuro di voler rifiutare questa richiesta?"
        onConfirm={() => rejectRequests(requestToActOn)}
        onCancel={() => {showReject = false; requestToActOn = null;}}
    />
{/if}

{#if showAcceptGroup}
    <ConfirmModal
        message="Sei sicuro di voler accettare le {selected.length} richieste selezionate?"
        onConfirm={acceptSelected}
        onCancel={() => {showAcceptGroup = false}}
    />
{/if}

{#if showRejectGroup}
    <ConfirmModal
        message="Sei sicuro di voler rifiutare le {selected.length} richieste selezionate?"
        onConfirm={rejectSelected}
        onCancel={() => {showRejectGroup = false}}
    />
{/if}

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
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .card h2{
        font-size: 16px;
        margin: 0 0 8px 0;
        margin-bottom: 36px;
    }

    .count {
        font-size: 40px;
        margin: 0;
    }

    .requests {
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .requests h2{
        margin:0
    }

    table{
        width: 100%;
    }

    th, td{
        padding: 8px;
        text-align: left;
    }

    .act-group{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    button{
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

    .badge.accettata {background: #c5e1d4; color: #198754;}
    .badge.in-attesa {background: #fce9c6; color: #F2A71B;}
    .badge.scaduta {background: #f0c3cb; color: #C20F2F;}
    .badge.rifiutata {background: #f0c3cb; color: #C20F2F;} 

    .icon-section{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .icon-go{
        background: #f5f7fb;
        color: #000;
        padding: 10px;
        border-radius: 10px;
    }

    .icon-check{ background: #c5e1d4; color: #198754; padding: 10px; border-radius: 10px; margin-bottom: 10px; }
    .icon-alert{ background: #f0c3cb; color: #C20F2F; padding: 10px; border-radius: 10px; margin-bottom: 10px; }
    .icon-warning{ background: #fce9c6; color: #F2A71B; padding: 10px; border-radius: 10px; margin-bottom: 10px; }
    .icon-ok{ background: #f5f7fb; color: #0D3C60; padding: 10px; border-radius: 10px; margin-bottom: 10px; }
</style>