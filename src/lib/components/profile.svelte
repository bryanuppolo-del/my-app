<script>
    export let user = {
        name: "Giuseppe Biamonte",
        role: "ADR"
    };
</script>

<section class="search-section">
    <div class="search">
        <input placeholder="Cerca un utente..." type="text">
        <button type="submit">Go</button>
    </div>


    <div class="profile">
        <img class="profile-img" src="/static/assets/userAvatar.jpg" alt="">
        <div class="descrition">
            <h4>{user.name}</h4>
            <div class="sub">{user.role}</div>
        </div>
    </div>
</section>

<style>
    .search-section{
        display: flex;
        align-items: center;
        gap: 25%;
        margin-bottom: 30px;
    }

    .search {
      display: inline-block;
      position: relative;
    }

    .search input[type="text"] {
      width: 860px;
      padding: 10px;
      border: none;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .search button[type="submit"] {
      background-color: #3E6685;
      border: none;
      color: #fff;
      cursor: pointer;
      padding: 10px 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      position: absolute;
      top: 0;
      right: 0;
      transition: .9s ease;
    }

    .profile{
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .profile-img{
        width: 48px;
        height: auto;
        border: 1px solid #111;
        border-radius: 50%;
    }

    h4{
        margin: 0;
    }
</style>