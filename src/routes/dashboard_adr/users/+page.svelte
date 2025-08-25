<script>
    import Users from "$lib/components/users.svelte";
</script>

<div class="app">
    <Users apiMode={false}></Users>
</div>

<style>
    .app {
        display: grid;
        grid-template-columns:1fr 450px;
        height: 100vh;
    }
</style>