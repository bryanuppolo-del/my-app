<script>
    import ButtonGo from "./buttonGo.svelte";

    export let events = [
        { time: "9:00", title: "Primo appuntamento", color: "#C20F2F"},
        { time: "10:00", title: "Videocall", color: "#F2A71B"},
        { time: "13:00", title: "Pausa", color: "#198754"},
    ];
</script>

<div class="margin">
    <div class="btn-group">
        <h2>Calendario</h2>
        <ButtonGo></ButtonGo>
    </div>
    <div class="calendar">
        <div class="events">
            {#each events as event}
                <div class="event" style="background:{event.color};">
                    {event.time} - {event.title}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .margin{
    margin-top: 20px;
    }

    .btn-group{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 860px;
    }

    .calendar {
        max-width: 860px;
        background: #fff;
        border-radius: 10px;
        padding: 15px;
        box-shadow:0 10px 30px -5px rgba(0, 0, 0, 0.2) ;
    }

    .events{
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 10px;
    }

    .event {
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        color: white;
    }


</style>