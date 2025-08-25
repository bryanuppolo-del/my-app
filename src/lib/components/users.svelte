<script>
    import { onMount } from "svelte";

    export let apiMode = false;

    /**
   * @type {{ id: string; nome: string; avatar: string; }[]}
   */
    let allUsers = [];
    /**
   * @type {any[]}
   */
    let visibleUsers = [];
    let perPage= 10;
    let currentPage= 0;

    async function loadUsers() {
    if (apiMode) {
        const res = await fetch("/api/accepted-users");
        allUsers = await res.json();
    } else {
        const coloriSfondo = ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"];
        const seedFisso = "ForzaNapoli";
        
        allUsers = Array.from({ length: 50 }, (_, i) => ({
            id: "13452312" + i,
            nome: "Bryan Uppolo",
            avatar: `https://api.dicebear.com/8.x/bottts/svg?seed=${seedFisso}&backgroundColor=${coloriSfondo[i % coloriSfondo.length]}`,
        }));
    }
    loadMore();
    }

    function loadMore() {
        const start = currentPage * perPage;
        const end = start + perPage;
        visibleUsers = [...visibleUsers, ...allUsers.slice(start, end)];
        currentPage++;
    }

    /**
   * @param {{ nome: string; }} user
   */
    function assegnaUsers(user) {
        alert("Assegnato a: " + user.nome)
    }

    /**
   * @param {{ id: any; }} user
   */
    function elimina(user) {
        visibleUsers = visibleUsers.filter(u => u.id !== user.id);
        allUsers = allUsers.filter(u => u.id !== user.id);
    }

    /**
   * @param {{ target: any; }} e
   */
    function handleScroll(e) {
        const el = e.target;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
            if (visibleUsers.length < allUsers.length){
                loadMore();
            }
        }
    }

    onMount(() => {
        loadUsers();
    });
</script>

<div class="container" on:scroll={handleScroll} >
    <h2>Tutti gli utenti</h2>
    {#each visibleUsers as user}
       <div class="user">
        <div class="user-info">
            <img src="{user.avatar}" alt="avatar">            
            <div>{user.nome}</div>
            <div class="user-id">#{user.id}</div>
        </div>
        <div class="actions">
            <button class="btn-assign" on:click={() => assegnaUsers(user)} >Assegna</button>
            <button class="btn-delete" on:click={() => elimina(user)} >Elimina</button>
        </div>
       </div> 
    {/each}
</div>
<style>
    .container {
        background: #fff;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        height: 500px;
        overflow-y: auto;
    }

    h2{
        margin-bottom: 16px;
    }

    .user{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #eee;
    }

    .user-info{
        display: flex;
        align-items: center;
        gap: 150px;
    }

    .user-info img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .actions button{
        margin-left: 6px;
        padding: 6px 10px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
    }

    .btn-assign { background: #198754; color: white;}
    .btn-delete { background: #C20F2F; color: white;}

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