<script lang="ts">
    import { onMount } from "svelte";

    type Appointment = {
        user: string;
        text: string;
        time: string;
    };

    type AppointmentMap = Record<string, Appointment[]>;

    let appointments: AppointmentMap = {};
    let selectedDate: string = "";

    // --- Variabili per il form ---
    let newUser = "";
    let newText = "";
    let newTime = "";

    // --- Variabili reattive per il calendario ---
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth(); // 0-11
    let daysInMonth: number[] = [];

    const STORAGE_KEY = "appointments";

    // --- Blocco Reattivo per aggiornare i giorni del mese ---
    $: {
        const date = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = date.getDate();
        daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
    }

    onMount(() => {
        loadAppointments();
    });

    function loadAppointments() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            appointments = JSON.parse(stored);
        }
    }

    function saveAppointments() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    }

    function selectDay(day: number) {
        // CORREZIONE: Usa currentYear e currentMonth
        selectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }

    function getAppointments(date: string): Appointment[] {
        return appointments[date] ?? [];
    }
    
    function addAppointment() {
        if (!selectedDate) {
            alert("Seleziona una data prima");
            return;
        }
        if (!newUser || !newText || !newTime) {
            alert("Compila tutti i campi");
            return;
        }

        const appt: Appointment = {
            user: newUser,
            text: newText,
            time: newTime
        };

        if (!appointments[selectedDate]) {
            appointments[selectedDate] = [];
        }
        appointments[selectedDate].push(appt);
        appointments = appointments; // Forza l'aggiornamento della UI
        saveAppointments();

        newUser = "";
        newText = "";
        newTime = "";
    }

    function prevMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        selectedDate = ''; // Deseleziona la data quando cambi mese
    }

    function nextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        selectedDate = ''; // Deseleziona la data quando cambi mese
    }
</script>

<div class="container">
    <div class="calendar">
        <div class="calendar-header">
            <button on:click={prevMonth}>Indietro</button>
            <h2>{new Date(currentYear, currentMonth).toLocaleString("it-IT", {month: "long"})} {currentYear}</h2>
            <button on:click={nextMonth}>Avanti</button>
        </div>

        <div class="days">
            {#each daysInMonth as day}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div 
                    class="day" 
                    class:active={selectedDate === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`}
                    on:click={() => selectDay(day)}
                >
                    {day}
                </div>
            {/each}
        </div>
    </div>

    <div class="events">
        {#if selectedDate}
            <h3>Appuntamenti del {selectedDate}</h3>
            
            <div class="appointment-list">
                {#if getAppointments(selectedDate).length > 0}
                    {#each getAppointments(selectedDate) as ev}
                        <div class="event">
                            <strong>{ev.time} - {ev.user}</strong><br>
                            <span>{ev.text}</span>
                        </div>
                    {/each}
                {:else}
                    <p>Nessun appuntamento per questa data.</p>
                {/if}
            </div>

            <div class="form">
                <h4>Aggiungi nuovo appuntamento</h4>
                <input type="time" bind:value={newTime} required>
                <input type="text" placeholder="Utente" bind:value={newUser} required>
                <textarea bind:value={newText} placeholder="Descrizione" required></textarea>
                <button on:click={addAppointment}>Salva</button>
            </div>
        {:else}
            <p>Seleziona una data per vedere o aggiungere appuntamenti.</p>
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        gap: 20px;
        font-family: sans-serif;
    }
    .calendar {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 15px;
        width: 350px;
    }
    .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
        margin-top: 15px;
    }
    .day {
        padding: 10px;
        text-align: center;
        cursor: pointer;
        border-radius: 50%;
    }
    .day:hover {
        background-color: #f0f0f0;
    }
    .day.active {
        background-color: #007bff;
        color: white;
    }
    .events {
        flex-grow: 1;
    }
    .event {
        border: 1px solid #eee;
        padding: 10px;
        margin-bottom: 5px;
        border-radius: 4px;
    }
    .appointment-list{
        margin-bottom: 20px;
    }
    .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #ccc;
    }
    input, textarea, button {
        padding: 8px;
        font-size: 1em;
    }
</style>