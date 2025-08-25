## Architettura Progetto

src/
    lib/
        components/              -> Componenti riutilizzabili
        static/                  -> Assets riutilizzabili
        index.ts             
    routes/                      -> Pagine principali
        dashboard_adr/
            calendar/
            dashboard/
            notification/
            request/
            users/
            +layout.svelte
        register/
            step1/
            step2/
            summary/
        +layout.svelte
        +layout.ts
        +page.svelte 
    app.d.ts
    app.html