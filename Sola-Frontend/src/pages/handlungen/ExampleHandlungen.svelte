<script>
    import axios from "axios";
    import { writable } from 'svelte/store';

    let exampleHandlungen = writable([]);

    async function getExampleHandlungen() {
        try {
            const response = await axios.get("http://localhost:3009/api/example-handlungen");
            await exampleHandlungen.set(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function createExampleHandlung(event) {
        // Define your example Handlung here
        const exampleHandlung = { 
            title: 'Example title', 
            description: 'Example description', 
            value: 123, 
            teilnehmer: ['ExampleTeilnehmer1', 'ExampleTeilnehmer2']
        };

        try {
            await axios.post("http://localhost:3009/api/example-handlungen", exampleHandlung)
            alert("Example Handlung created");
            getExampleHandlungen(); // Refresh the list of example Handlungen
        } catch (error) {
            console.error('Error creating example handlung:', error);
            alert('Could not create example handlung. Please try again.');
        }
    }

    getExampleHandlungen();
</script>

<div class="mb-5">
    <h1 class="mt-3">Liste aller Example Handlungen</h1>
    <button on:click={createExampleHandlung} class="add-btn">+ Add Example Handlung</button>
    {#each $exampleHandlungen as Handlung}
        <div>
            <h2>{Handlung.title}</h2>
            <p>{Handlung.description}</p>
            <p>{Handlung.value}</p>
            <p>{Handlung.teilnehmer.join(', ')}</p>
        </div>
    {/each}
</div>
