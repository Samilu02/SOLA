<script>
    import axios from "axios";

    export let params = {};

    let id;

    $: {
        id = params.id;
        getTeilnehmer();
        getHandlungen();
    }

    let teilnehmer = {};
    let handlungen = [];
    let totalValue = 0;

    function getTeilnehmer() {
        axios.get("http://localhost:3009/api/Teilnehmende/" + id)
            .then((response) => {
                teilnehmer = response.data;
            });
    }

    function getHandlungen() {
        axios.get("http://localhost:3009/api/handlungen")
            .then((response) => {
                handlungen = response.data;
                calculateTotalValue();
            });
    }

    function calculateTotalValue() {
        totalValue = handlungen
            .filter(handlung => handlung.teilnehmer.includes(id))
            .reduce((total, handlung) => total + handlung.value, 0);
    }

    function updateTeilnehmer() {
        axios.put("http://localhost:3009/api/Teilnehmende/" + id, teilnehmer)
            .then((response) => {
                getTeilnehmer();
            });
    }

    function goBack() {
        window.location.href = '/Teilnehmende';
    }
</script>
<style>
    /* Define the form layout and styles */
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f5f5f5;
    }

    .form-container {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.15);
        padding: 20px 30px;
        max-width: 500px;
        width: 100%;
    }

    h1, h2 {
        color: #333;
    }

    label {
        font-weight: bold;
        margin-bottom: 5px;
    }

    input[type="text"], input[type="number"] {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ddd;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 20px;
    }

    .btn {
        display: inline-block;
        padding: 10px 20px;
        border-radius: 5px;
        color: #fff;
        text-decoration: none;
        transition: background .3s ease;
    }

    .btn-primary {
        background: #007bff;
        margin-right: 10px;
    }

    .btn-primary:hover {
        background: #0056b3;
    }

    .btn-secondary {
        background: #6c757d;
    }

    .btn-secondary:hover {
        background: #545b62;
    }

    h2 {
        margin-top: 30px;
    }
</style>

<div class="container">
    <div class="form-container">
        <h1>Teilnehmer (ID: {id})</h1>
        <form>
            <label for="name">Name:</label>
            <input id="name" type="text" bind:value={teilnehmer.name} />

            <label for="origin">Origin:</label>
            <input id="origin" type="text" bind:value={teilnehmer.origin} />

            <label for="age">Age:</label>
            <input id="age" type="number" bind:value={teilnehmer.age} />

            <label for="group">Group:</label>
            <input id="group" type="text" bind:value={teilnehmer.group} />

            <a href="#/Teilnehmende/" class="btn btn-secondary">Go Back</a>
            <button class="btn btn-primary" type="button" on:click={updateTeilnehmer}>Submit Changes</button>
        </form>

        <h2>Balance:</h2>
        <p>{totalValue}</p>
    </div>
</div>