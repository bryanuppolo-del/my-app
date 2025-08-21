<script>
  import Icon from "@iconify/svelte";

    export let active = "Dashboard";
</script>

<nav class="sidebar">
    <div class="logo-home">
        <img class="logo-img" src="src\lib\assets\Logo.png" alt="">
        <h1 class="logo">JARVIT</h1>
    </div>
    <ul>
        <li class="section-title">OVERVIEW</li>
        <li class={active === "Dashboard" ? "active" : ""}><Icon icon="material-symbols:dashboard-rounded" width="24" height="24" />Dashboard</li>
        <li class={active === "Calendario" ? "active" : ""}><Icon icon="fluent:calendar-date-20-regular" width="24" height="24" />Calendario</li>
        <li class={active === "Notifiche" ? "active" : ""}><Icon icon="mingcute:notification-line" width="24" height="24" />Notifiche</li>
        <li class={active === "Richieste" ? "active" : ""}><Icon icon="icon-park-outline:pull-requests" width="24" height="24" />Richieste</li>
        <li class={active === "Utenti" ? "active" : ""}><Icon icon="majesticons:users-line" width="24" height="24" />Utenti</li>
    </ul>
    <div class="settings">
        <ul>
            <li class="section-title">SETTINGS</li>
            <li><Icon icon="solar:settings-linear" width="24" height="24" />Impostazioni</li>
            <li class="logout"><Icon icon="material-symbols:logout" width="24" height="24" />Logout</li>
        </ul>
    </div>

</nav>

<style>
    .sidebar{
        width: 335px;
        padding: 20px;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-right: 1px solid #ddd;
        box-shadow: 35px 35px 100px 10px rgba(0, 0, 0, 0.06);
    }

    .logo-home{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
        min-height: 100px;
    }

    .logo-img{
        width: 36px;
    }

    .logo{
        font-size: 36px;
        font-weight: bold;
    }

    .section-title{
        color: #9b9b9b;
    }

    ul{
        list-style: none;
        padding: 0;
        margin: 20px 0;
    }

    li{
        padding: 12px 8px;
        cursor: pointer;
        border-radius: 6px;
        display: flex;
        align-items: center;
        margin: 10px;
        gap: 20px;
    }
    
    li.active{
        color: #C20F2F;
    }

    .settings{
        margin-bottom: 100px;
    }

    .logout{
        background: none;
        border: none;
        cursor: pointer;
        color: #C20F2F;
    }
</style>