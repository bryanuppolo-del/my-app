<script>
    import RightPanel from "$lib/components/rightPanel.svelte";
    import Calendar from "$lib/components/calendar.svelte";
    import Request from "$lib/components/request.svelte";

    const user = { name: "Giuseppe Biamonte", role: "ADR" };

    const events = [
        { time: "9:00", title: "Primo appuntamento", color: "#C20F2F" },
        { time: "10:00", title: "Videocall", color: "#F2A71B" },
        { time: "13:00", title: "Pausa", color: "#198754" },
    ];

    const requests = [
        { name: "Bryan" }, { name: "Alessandro" }, { name: "Giuseppe" },
        { name: "Francesco" }, { name: "Antonio" }, { name: "Kenneth" },
        { name: "Mattia" },
    ];

    const notifications = [
        { text: "Hai delle nuove richieste", type: "info" },
        { text: "Questa richiesta sta...", type: "warning" }
    ];

    const documents = [
        { text: "Hai firmato un documento", type: "success" },
        { text: "Documento scaduto", type: "error" }
    ];
</script>

<div class="page-content">
    <div class="center-container">
        <div class="content-wrapper">
            <div class="cta">
                <img src="" alt="Call to Action">
            </div>
            <div class="main">
                <Calendar {events} />
                <Request {requests} />
            </div>
        </div>
    </div>
    <div class="right-panel-container">
        <RightPanel {user} {notifications} {documents} />
    </div>
</div>

<style>
    .page-content {
        display: flex;
        gap: 30px;
        height: 100%;
    }

    .center-container {
        flex-grow: 1;
        min-width: 0;
        display: flex;
        justify-content: center;
    }

    .content-wrapper {
        width: 100%;
        gap: 20px;
    }
    
    .main {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .right-panel-container {
        flex-basis: 350px;  
        flex-shrink: 0;
    }

    .cta{
        border-radius: 10px;
    }

    .cta img {
        border-radius: 20px;
        max-width: 100%;
        height: auto;
        box-shadow:0 10px 30px -5px rgba(0, 0, 0, 0.2) ;
    }
</style>