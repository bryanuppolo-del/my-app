<!-- src/routes/+layout.svelte -->
<script>
    import Sidebar from "$lib/components/sidebar.svelte";
</script>

<div class="app-layout">
    <Sidebar />
    <main class="main-content-area">
        <slot></slot>
    </main>
</div>

<style>
    :global(body) {
        margin: 0;
        background: #F5F7FB;
    }
    :global(*, *:before, *:after) {
        box-sizing: border-box;
    }

    .app-layout {
        display: flex;
        height: 100vh;
    }

    .main-content-area {
        flex-grow: 1;
        overflow-y: auto;
        padding: 30px;
    }
</style>