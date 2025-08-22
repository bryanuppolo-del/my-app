<script>
    import Icon from "@iconify/svelte";
    import ButtonGo from "./buttonGo.svelte";

    export let requests = [
        { name: "Bryan" },
        { name: "Alessandro" },
        { name: "Giuseppe" },
        { name: "Francesco" },
        { name: "Antonio" },
        { name: "Kenneth" },
        { name: "Mattia" },
    ];
</script>

<div class="requests">
    <div class="btn-group">
        <h2>Nuove Richieste</h2>
        <ButtonGo></ButtonGo>
    </div>
    <div class="cards">
        {#if requests.length > 0}  
            {#each requests as r}
                <div class="card">
                    <div class="icon">
                        <Icon icon="iconamoon:profile" color="#198754" width="36" height="36" />
                    </div>
                    <div class="description">
                        <span style="font-size: 24px;">{r.name}</span>
                        <span style="font-size: 14px;">Nuova richiesta</span>
                    </div>
                </div>
            {/each}
        {:else}
        <p>Nessuna richiesta</p>
        {/if}
    </div>
</div>

<style>
    .requests{
        max-width: 860px;
        margin-top: 20px;
    }

    .btn-group{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 860px;
    }

    .cards{
        display: flex;
        gap: 10px;
        margin-top: 10px;
        overflow-x: auto;
        padding-bottom: 10px;
        height: 150px;
    }

    .card{
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        min-width: 180px;
        background: #fff;
        padding: 15px;
        border-radius: 8px;
        scroll-snap-align: start;
        gap: 10px;
    }
    
    .icon{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-radius: 10px;
        background-color: #c5e1d4;
    }

    .description{
        display: flex;
        flex-direction: column;
    }

    ::-webkit-scrollbar{
        height: 20px;
    }
    
    ::-webkit-scrollbar-track{
        background: white;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background: #0D3C60;
    }
</style>