<script>
    import axios from "axios";
    import { writable } from 'svelte/store';

    let handlungen = writable([]);

    async function getHandlungen() {
        try {
            const response = await axios.get("http://localhost:3009/api/handlungenWithTeilnehmer");
            console.log(response.data);
            await handlungen.set(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            
        }
    }
    
    getHandlungen();
</script>

<style>
    .add-btn {
        margin-bottom: 20px;
        color: white;
        background-color: #007bff;
        border: none;
        padding: 10px;
        border-radius: 5px;
        text-decoration: none;
    }

    .add-btn:hover {
        background-color: #0056b3;
    }

    h1 {
        margin-bottom: 30px;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    th, td {
        padding: 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    tr:hover {background-color: #f5f5f5;}

    .grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr); 
        gap: 10px;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid #ddd;
    }
    
    .grid > div {
        padding: 15px;
        text-align: left;
    }

    .grid:hover {
        background-color: #f5f5f5;
    }
</style>
<div class="mb-5">
    <h1 class="mt-3">Liste aller Handlungen</h1>
    <a href="#/create-Handlung" class="add-btn">+ Add Handlung</a>
    <div class="grid">
        <div>ID</div>
        <div>Titel</div>
        <div>Beschreibung</div>
        <div>Wert</div>
        <div>Teilnehmer</div>
    </div>
    {#each $handlungen as Handlung}
        <div class="grid">
            <div>
                <a href={"#/Handlungen/" + Handlung._id}>
                    {Handlung._id}
                </a>
            </div>
            <div>{Handlung.title}</div>
            <div>{Handlung.description}</div>
            <div>{Handlung.value}</div>
            <div>
                {#each Handlung.teilnehmerNames as name}
                    <div>{name}</div>
                {/each}
            </div>
        </div>
    {/each}
</div>