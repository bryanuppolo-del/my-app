<script>
    export let events = [
        { time: "9:00", title: "Primo appuntamento", color: "red"},
        { time: "10:00", title: "Videocall", color: "yellow"},
        { time: "13:00", title: "Pausa", color: "green"},
    ];
</script>

<div class="calendar">
    <h2>Calendario</h2>
    <div class="events">
        {#each events as event}
            <div class="event" style="background:{event.color};">
                {event.time} - {event.title}
            </div>
        {/each}
    </div>
</div>

<style>
    .calendar {
        max-width: 850px;
        margin-top: 20px;
        background: #fff;
        border-radius: 10px;
        padding: 15px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
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