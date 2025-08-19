<script>
      import Icon from '@iconify/svelte';

      import { goto } from '$app/navigation';

      function goToRegister() {
        goto('/register')
      }
</script>

<!-- Navbar -->
    <nav>
        <div class="logo">
            <img src="src\lib\assets\LogoNome.png" alt="">
        </div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#why">Why us?</a></li>
            <li><a href="#steps">Steps</a></li>
        </ul>
        <div class="buttons">
            <button class="btn-login">Login</button>
            <button class="btn-register" on:click={goToRegister}> Registrati</button>
        </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
        <h1>Benvenuto su Jarvit Sign</h1>
        <p>lorem ipsum</p>
        <button>Iniziamo</button>
        <div class="hero-graphics">
            <div class="red-shape"></div>
            <div class="blue-circle"></div>
            <div class="yellow-bar"></div>
        </div>
    </section>

    <!-- Features -->
     <section class="features" id="features">
        <p class="mini-title">FEATURES</p>
        <h2>Nel nostro sito ti sarà possibile fare</h2>
        <div class="grid">
            <div class="item">
                <div class="asset">
                    <Icon icon="mdi-light:pencil" />
                </div>
                <h3>Lorem Ipsum</h3>
                <p>descrizione breve</p>
            </div>
            <div class="item">
                <h3>Lorem Ipsum</h3>
                <p>descrizione breve</p>
            </div>
            <div class="item">
                <h3>Lorem Ipsum</h3>
                <p>descrizione breve</p>
            </div>
        </div>
     </section>

 <!-- Why Us -->
  <section class="why" id="why">
    <p class="mini-title">WHY US?</p>
    <h2>Perchè preferire noi</h2>
    <div class="grid">
        <div class="card">Lorem</div>
        <div class="card">Lorem Ipsum</div>
        <div class="card">Risultati veloci <br><span class="highlight">30S</span></div>
    </div>
  </section>

  <!-- Steps -->
   <section class="steps" id="steps">
    <p class="mini-title">STEPS</p>
    <h2>Ottieni ciò che ti serve con dei semplici e veloci passaggi</h2>
    <div class="grid">
        <div class="step">
            <span><p>1</p></span><br>
            Accedi al tuo account
        </div>
        <div class="step">
            <span><p>2</p></span><br>
            Accedi al tuo account
        </div>
        <div class="step">
            <span><p>3</p></span><br>
            Accedi al tuo account
        </div>
    </div>
   </section>

   <!-- CTA -->
   <section class="cta">
    <div class="cta-box">
        <h3>Sei pronto a scoprire la comodità di Jarvit Sign?</h3>
        <button class="btn-register">Registrati</button>
        <button class="btn-login">Login</button>
    </div>
   </section>

   <!-- Footer -->
    <footer>
        <p>© 2025 Jarvit Sign</p>
    </footer>
<style>

    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }
    
    /* navbar */
    nav{
        background: #0D3C60;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 40px;
    }
    
    nav .logo img{
        max-width: 140px;
    }

    nav ul{
        list-style: none;
        display: flex;
        gap: 75px;
    }

    nav ul li a{
        text-decoration: none;
        color: white;
        font-weight: bold;
    }

    nav .buttons button{
        margin-left: 10px;
        padding: 6px 14px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
    }
    .btn-login{
        background: white;
        color: #0D3C60;
    }
    .btn-register{
        background: #C20F2F;
        color: white;
    }

    /* Hero */
    .hero{
        text-align: center;
        padding: 60px 20px;
        background: white;
        color: #0D3C60;
    }

    .hero h1{
        font-size: 2.5rem;
    }
    .hero p{
        margin-top: 10px;
    }
    .hero button{
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #C20F2F;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
    }

    .hero-graphics{
        margin-top: 40px;
        display: flex;
        justify-content: center;
        gap: 20px;
        align-items: flex-end;
    }
    .red-shape{width: 120px; height: 120px; background: #C20F2F; border-top-left-radius: 120px; border-top-right-radius: 120px;}
    .blue-circle{width: 60px; height: 60px; background: #0D3C60; border-radius: 50%;}
    .yellow-bar{width: 40px; height: 120px; background: #F2A71B; border-radius: 10px;}

    /* Features */
    .features{
        max-width: 1000px;
        margin: 40px auto;
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        color: #0D3C60;
    }

    .features .mini-title{
        color: #C20F2F;
    }

    .features h2{
        margin-bottom: 20px;
    }

    .features .grid{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 20px;
    }

    .features .item{
        flex: 1;
        min-width: 200px;
    }

    .features .item .asset{
        width: 200px;
    }

    /* Why US */
    .why{
        text-align: center;
        padding: 50px 20px;
    }

    .why h2{
        margin-bottom: 30px;
    }

    .why .grid{
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
    }

    .why .card{
        background-color: #0D3C60;
        color: white;
        padding: 20px;
        border-radius: 10px;
        flex: 1;
        min-width: 200px;
    }

    .why .highlight {
        font-size: 2rem;
        font-weight: bold;
    }

    /* Steps */
    .steps {
        background: #D2E3F3;
        padding: 50px 20px;
    }

    .steps .mini-title{
        color: #C20F2F;
    }

    .steps h2{
        margin-bottom: 30px;
    }

    .steps .grid{
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
    }

    .steps .grid .step span{
        font-size: 3rem;
    }

    .steps .step{
        background: #0D3C60;
        color: white;
        padding: 20px;
        border-radius: 10px;
        flex: 1;
        min-width: 200px;
    }

    /* CTA */
    .cta{
        padding: 50px 20px;
    }

    .cta-box{
        background: #0D3C60;
        color: white;
        padding: 40px;
        border-radius: 10px;
        max-width: 600px;
        margin: 0 auto;
    }

    .cta button{
        padding: 6px 14px;
        margin-top: 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
    }
    .cta .btn-login{
        background: #0D3C60;
        color: white;
        border: 1px solid;
    }
    .cta .btn-register{
        background: #C20F2F;
        color: white;
    }
    
</style>