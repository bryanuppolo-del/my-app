<script>
  import Icon from "@iconify/svelte";
  import { page } from "$app/stores";
</script>

<nav class="sidebar">
    <div class="logo-home">
        <img class="logo-img" src="../static/assets/Logo.png" alt="">
        <h1 class="logo">JARVIT</h1>
    </div>
<ul>
    <li class="section-title">OVERVIEW</li>
    
    <li class:active={$page.url.pathname.startsWith('/dashboard_adr/dashboard')}>
        <Icon icon="material-symbols:dashboard-rounded" width="24" height="24" />
        <a href="/dashboard_adr/dashboard">Dashboard</a>
    </li>

    <li class:active={$page.url.pathname.startsWith('/dashboard_adr/calendar')}>
        <Icon icon="fluent:calendar-date-20-regular" width="24" height="24" />
        <a href="/dashboard_adr/calendar">Calendario</a>
    </li>

    <li class:active={$page.url.pathname.startsWith('/dashboard_adr/notification')}>
        <Icon icon="mingcute:notification-line" width="24" height="24" />
        <a href="/dashboard_adr/notification">Notifiche</a>
    </li>

    <li class:active={$page.url.pathname.startsWith('/dashboard_adr/request')}>
        <Icon icon="icon-park-outline:pull-requests" width="24" height="24" />
        <a href="/dashboard_adr/request">Richieste</a>
    </li>

    <li class:active={$page.url.pathname.startsWith('/dashboard_adr/users')}>
        <Icon icon="majesticons:users-line" width="24" height="24" />
        <a href="/dashboard_adr/users">Utenti</a>
    </li>
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
        width: 300px;
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
    
    li a{
        text-decoration: none;
        color: black;
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