<script>
    export let user = {
        name: "Giuseppe Biamonte",
        role: "ADR"
    };

    export let notifications = [
        { text: "Hai delle nuove richieste", type: "info"},
        { text: "Questa richiesta sta...", type: "warning"}
    ];
    export let documents = [
        { text: "Hai firmato un documento", type: "success" },
        { text: "Documento scaduto", type: "error" }
    ]
</script>

<aside class="rightbar">
    <div class="userCard">
        <img class="avatar" src="src/lib/assets/userAvatar.jpg" alt="avatar {user.name}">
        <div class="info">
            <div class="hello"><h4>Buon pomeriggio <br>{user.name}</h4></div>
            <div class="sub">Venerdi, 8 Agosto</div>
        </div>
    </div>

    <section class="panel">
        <div class="panelTitle">Ultime notifiche</div>
        {#each notifications as n}
            <div class="row {n.type}">
                <span class="dot"></span>
                <span class="txt">{n.text}</span>
            </div> 
        {/each}
    </section>

    <section class="panel">
        <div class="panelTitle">
            Ultimi documenti
            <button class="add" aria-label="Aggiungi">+</button>
        </div>
        {#each documents as d}
        <div class="row {d.type}">
            <span class="dot"></span>
            <span class="txt">{d.text}</span>
        </div>
        {/each}
    </section>
</aside>

<style>

    .rightbar{
        min-width: 350px;
        height: 80vh;
        overflow-y: auto;
        padding: 20px;
        background: #fff;
        display: flex;
        flex-direction: column;
        gap: 16px;
        border-radius: 20px;
        box-shadow: 65px 40px 100px rgba(0, 0, 0, 0.4) ;
    }

    .userCard{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 12px;
        border-radius: 12px;
        padding: 16px;
    }

    .avatar{
        margin-top: 40px;
        width: 100px;
        height: 100px;
        padding: 15px;
        border: 1px solid #3E6685;
        border-radius: 50%;
        box-shadow: 15px 15px 200px 5px #3E6685;
    }

    .info.hello{
        font-size: 12px;
        color: #6b7280;
    }

    .info.name{
        font-weight: 700;
        line-height: 1.1;
    }

    .info.sub{
        font-size: 12px;
        color: #6b7280;
        margin-top: 2px;
    }

    .panel{
        background: #fff;
        border-radius: 12px;
        padding: 14px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .08);
    }

    .panelTitle{
        font-weight: 600;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .add{
        border: none;
        background: #111;
        color: #fff;
        width: 24px;
        height: 24px;
        border-radius: 6px;
        cursor: pointer;
        line-height: 24px;
    }

    .row{
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 8px;
        border-radius: 8px;
    }

    .row + .row{
        margin-top: 8px;
    }

    .dot{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #d1d5db;
        flex: none;
    }

    .row.info .dot{
        background: #60a5fa;
    }

    .row.warning .dot{
        background: #f5920b;
    }

    .row.success .dot{
        background: #22c552;
    }

    .row.error .dot{
        background: #ef4444;
    }

    .txt{
        font-size: 14px;
    }

</style>