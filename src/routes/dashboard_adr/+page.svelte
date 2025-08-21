<script>
    import Sidebar from "$lib/components/sidebar.svelte";
    import RightPanel from "$lib/components/rightPanel.svelte";
    import Calendar from "$lib/components/calendar.svelte";
    import Request from "$lib/components/request.svelte";

    const user = { name: "Giuseppe Biamonte", role: "ADR"};

    const events = [
        { time: "9:00", title: "Primo appuntamento", color: "red"},
        { time: "10:00", title: "Videocall", color: "yellow"},
        { time: "13:00", title: "Pausa", color: "green"},
    ];

    const requests = [
        { name: "Bryan" },
        { name: "Alessandro" },
        { name: "Giuseppe" },
        { name: "Francesco" },
        { name: "Antonio" },
        { name: "Kenneth" },
        { name: "Mattia" },
    ];

    const notifications = [
        { text: "Hai delle nuove richieste", type: "info"},
        { text: "Questa richiesta sta...", type: "warning"}
    ];

    const documents = [
        { text: "Hai firmato un documento", type: "success" },
        { text: "Documento scaduto", type: "error" }
    ];
</script>

<div class="app">
    <Sidebar active="Dashboard"></Sidebar>

    <main class="center">
        <div class="cta">
            <img src="/src/lib/assets/CTA.png" alt="Call to Action">
        </div>
        <Calendar {events}></Calendar>
        <Request {requests}></Request>
    </main>

    <aside class="rightCol">
        <RightPanel {user} {notifications} {documents}></RightPanel>
    </aside>
</div>

<style>
    :global(body){
        margin: 0;
        background: #F5F7FB;
    }

    :global(*, *:before, *:after) {
        box-sizing: border-box;
    }

    .app {
        display: grid;
        grid-template-columns: 400px 1fr 450px;
        height: 100vh;
    }

    .center {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        overflow-y: auto; 
    }

    .rightCol {
        overflow-y: auto;
        padding: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .cta {
        padding: 0;
    }
    
    .cta img {
        max-width: 100%;
        height: auto;
        display: block;
    }

</style>