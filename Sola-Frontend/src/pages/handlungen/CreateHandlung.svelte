<div class="container">
    <img src="/images/JungscharEmbrach.png" alt="Logo" class="logo">
    <div class="info-card">
        <h1>Add a Handlung</h1>
        <form class="form">
            <div class="input-field">
                <input id="title" type="text" bind:value={title} required>
                <label for="title">Title</label>
            </div>
            <div class="input-field">
                <input id="description" type="text" bind:value={description} required>
                <label for="description">Description</label>
            </div>
            <div class="input-field">
                <input id="value" type="number" bind:value={value} required>
                <label for="value">Value</label>
            </div>
            <div class="dropdown-field">
                <label for="teilnehmer-dropdown">Teilnehmer</label>
                <div id="teilnehmer-dropdown" class="dropdown">
                    <div class="dropdown-header" 
                    on:click={toggleDropdown} 
                    on:keydown={toggleDropdown} 
                    tabindex="-1">
                    {selectedTeilnehmer.length > 0 ? selectedTeilnehmer.map(id => $teilnehmerList.find(t => t._id === id).name).join(', ') : 'Select'}
                    </div>

                    {#if isDropdownOpen}
                        <div class="dropdown-body">
                            {#each $teilnehmerList as teilnehmer (teilnehmer._id)}
                                <div class="dropdown-item">
                                    <input type="checkbox" id={teilnehmer._id} bind:group={selectedTeilnehmer} value={teilnehmer._id} />
                                    <label for={teilnehmer._id}>{teilnehmer.name}</label>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
            
            
            
            <button on:click|preventDefault={createHandlung} class="btn btn-primary">Add Handlung</button>
        </form>
    </div>
</div>

<style>.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 2rem;
    background-color: #f8f9fa;
}

.logo {
    width: 100px;
    margin-bottom: 2rem;
}

.info-card {
    max-width: 400px;
    width: 100%;
    padding: 2rem;
    background-color: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 0.5rem;
}

form {
    display: flex;
    flex-direction: column;
}

.input-field,
.dropdown-field {
    position: relative;
    margin-bottom: 1rem;
}

input[type="text"],
input[type="number"],
select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}

label {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    transition: 0.2s;
    pointer-events: none;
}

input[type="text"]:valid + label,
input[type="number"]:valid + label,
select:valid + label {
    top: 0;
    font-size: 0.75rem;
    color: #495057;
}

button {
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: #ffffff;
    cursor: pointer;
}

.dropdown-field {
    position: relative;
    display: inline-block;
}

.dropdown-header {
    padding: 10px;
    background-color: #f1f1f1;
    cursor: pointer;
}

.dropdown-body {
    position: absolute;
    border: 1px solid #d4d4d4;
    z-index: 1;
    top: 100%;
    left: 0;
    width: 100%;  /* Adjusted */
    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown-item {
    display: flex;
    flex-direction: row;  /* Added */
    align-items: center;
    padding: 8px 16px;
}

.dropdown-item input {
    margin-right: 10px;
}

.dropdown-item label {
    margin-left: 5px;
}

</style>
<script>
    import axios from "axios";
    import { writable, derived } from 'svelte/store';

    let title = '';
    let description = '';
    let value = '';
    let selectedTeilnehmer = [];
    let teilnehmerList = writable([]);
    
    fetchData();
    
    async function fetchData() {
        try {
            const res = await axios.get("http://localhost:3009/api/teilnehmende");
            teilnehmerList.set(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    let isDropdownOpen = false;

function toggleDropdown(event) {
    if (!event || event.type === 'click' || ['Enter', ' '].includes(event.key)) {
        isDropdownOpen = !isDropdownOpen;
    }
}



    async function createHandlung(event) {
        const handlung = { 
            title, 
            description, 
            value: Number(value), 
            teilnehmer: selectedTeilnehmer
        };

        try {
            await axios.post("http://localhost:3009/api/handlungen", handlung)
            alert("Handlung created");
            title = '';
            description = '';
            value = '';
            selectedTeilnehmer = [];
        } catch (error) {
            console.error('Error creating handlung:', error);
            alert('Could not create handlung. Please try again.');
        }
    }
</script>
