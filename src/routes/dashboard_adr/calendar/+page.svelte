<script>
    import CalendarPage from "$lib/components/calendarPage.svelte";
</script>

<div class="app">
    <div class="main">
        <CalendarPage></CalendarPage>
    </div>
</div>

<style>
    .app {
        display: grid;
        grid-template-columns:1fr 450px;
        height: 100vh;
    }
</style>