<script lang="ts">
    import Icon from "@iconify/svelte";
    import ConfirmModal from "./confirmModal.svelte";
    import { onMount } from "svelte";

    type Appointment = {
        user: string;
        text: string;
        time: string;
    };

    type AppointmentMap = Record<string, Appointment[]>;

    let appointments: AppointmentMap = {};
    let selectedDate: string = "";

    let newUser = "";
    let newText = "";
    let newTime = "";

    let showModal: boolean = false;
    let showConfirmModal: boolean = false;

    let appointmentToDelete: {date: string; index: number} | null = null;

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth(); 
    let daysInMonth: number[] = [];

    const STORAGE_KEY = "appointments";

    $: {
        const date = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = date.getDate();
        daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
    }

    onMount(() => {
        loadAppointments();
    });

    function confirmDelete(date: string, index:number) {
        appointmentToDelete = { date, index };
        showConfirmModal = true;
    }

    function deleteAppointment() {
    if (appointmentToDelete) {
        const { date, index } = appointmentToDelete;
        const updatedAppointmentsForDate = appointments[date].filter((_, i) => i !== index);

        if (updatedAppointmentsForDate.length > 0) {
            appointments = {
                ...appointments,
                [date]: updatedAppointmentsForDate
            };
        } else {
            const { [date]: _, ...rest } = appointments;
            appointments = rest;
        }

        saveAppointments();
    }
    
    appointmentToDelete = null;
    showConfirmModal = false;
}

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
        selectedDate = `${currentYear}/${String(currentMonth + 1).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
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

    const existingAppointments = appointments[selectedDate] ?? [];

    appointments = {
        ...appointments,
        [selectedDate]: [...existingAppointments, appt]
    };

    saveAppointments();

    newUser = "";
    newText = "";
    newTime = "";
    showModal = false;
}

    function prevMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        selectedDate = '';
    }

    function nextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        selectedDate = '';
    }
</script>

<div class="container">
    <div class="calendar">
        <div class="calendar-header">
            <button class="next-prev"  aria-label="prevMonth"><Icon icon="mingcute:left-fill" on:click={prevMonth} width="24" height="24" /></button>
            <h2>{new Date(currentYear, currentMonth).toLocaleString("it-IT", {month: "long"})} {currentYear}</h2>
            <button class="next-prev" on:click={nextMonth} aria-label="nextMonth"><Icon icon="mingcute:right-fill" width="24" height="24" /></button>
        </div>

        <div class="days">
            {#each daysInMonth as day}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div 
                    class="day" 
                    class:active={selectedDate === `${currentYear}/${String(currentMonth + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}`}
                    on:click={() => selectDay(day)}
                >
                    {day}
                </div>
            {/each}
        </div>
    </div>

    <div class="events">
        {#if selectedDate}
            <div class="date">
                <h3>Appuntamenti del {selectedDate}</h3>
            </div>
            
            <div class="appointment-list">
                {#if getAppointments(selectedDate).length > 0}
                    {#each getAppointments(selectedDate) as ev, i (ev.time + ev.user)}
                        <div class="event">
                            <div>
                                <strong>{ev.time} - {ev.user}</strong><br>
                                <span>{ev.text}</span>
                            </div>
                            <button class="delete-btn" on:click={() => confirmDelete(selectedDate, i)} >
                                <Icon icon="material-symbols:delete-outline" width="24" height="24" />
                            </button>
                        </div>
                    {/each}
                {:else}
                    <p>Nessun appuntamento per questa data.</p>
                {/if}
                <div class="button-add">
                    <button class="add-btn" on:click={() => showModal = true} >+</button>
                </div>
            </div>

            {#if showModal}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="modal-backdrop" on:click={() => showModal = false} >
                <div class="modal" on:click|stopPropagation>
                    <h4>Nuovo Appuntamento</h4>
                    <input type="time" bind:value={newTime}>
                    <input type="text" placeholder="user.." bind:value={newUser}>
                    <textarea bind:value={newText}></textarea>
                    <div class="modal-actions">
                        <button class="cancel-btn" on:click={() => showModal = false} >Chiudi</button>
                        <button class="save-btn" on:click={addAppointment} >Salva</button>
                    </div>
                </div>
            </div>
                
            {/if}

            {#if showConfirmModal}
                <ConfirmModal message="Vuoi davvero eliminare questo appuntamento?"
                onConfirm={deleteAppointment}
                onCancel={() => { showConfirmModal = false; appointmentToDelete = null}} />    
            {/if}

        {:else}
            <p>Seleziona una data per vedere o aggiungere appuntamenti.</p>
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        gap: 20px;
    }

    .date{
        text-align: center;
        border-bottom: 1px solid #ccc;
    }

    .calendar {
        border-radius: 8px;
        padding: 15px;
        min-width: 500px;
        min-height: 350px;
        background: white;
        box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1); 
    }

    .calendar-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .next-prev{
        border-radius: 10px;
        color: #007bff;
        border: none;
        background-color: white;
    }

    .days{
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
    }

    .day{
        text-align: center;
        padding: 6px;
        border-radius: 5px;
        cursor: pointer;
    }

    .day:hover{
        background-color: #eee;
    }

    .day.active{
        background-color: #007bff;
        color: white;
    }

    .events{
        border-radius: 8px;
        padding: 15px;
        min-width: 700px;
        background: white;
        box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1); 
    }

    .event{
        margin-bottom: 10px;
        padding: 10px;
        padding: 15px;
        border-left: 4px solid #007bff;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .button-add{
        text-align: center;
    }

    .add-btn {
        margin-top: 10px;
        padding: 8px 23px;
        background-color: #007bff;
        border: none;
        color: white;
        cursor: pointer;
        border-radius: 5px;
    }

    .modal-backdrop{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal{
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 400px;
        max-width: 90%;
    }

    .modal h4{
        margin-top: 0;
    }

    .modal input, .modal textarea{
        display: block;
        margin-bottom: 20px;
        width: 100%;
        padding: 6px;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .modal-actions{
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    .modal-actions button{
        padding: 8px 12px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }

    .save-btn{
        background-color: #198754;
        color: white;
    }

    .cancel-btn{
        background-color: #C20F2F;
        color: white;
    }

    .delete-btn{
        padding: 8px;
        border-radius: 10px;
        color: #fff;
        border: none;
        background: #C20F2F;
        cursor: pointer;
    }
</style>