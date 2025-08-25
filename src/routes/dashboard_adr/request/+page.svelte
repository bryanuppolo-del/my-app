<script>
    import RequestPage from "$lib/components/requestPage.svelte";
</script>

<div class="app">
    <RequestPage apiMode={false}></RequestPage>
</div>

<style>
    .app {
        display: grid;
        grid-template-columns:1fr 450px;
        height: 100vh;
    }
</style>