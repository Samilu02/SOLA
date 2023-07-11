<script>
    import axios from "axios";
    import { writable } from 'svelte/store';



    export let params = {};
    let handlung_id;
    let teilnehmer_id;

    $: {
        handlung_id = params.id;
        getHandlung();
        getTeilnehmende();
    }

    let handlung = {
        _id: "",
        title: "",
        description: "",
        value: 0,
        teilnehmer: [],
    };

    let teilnehmende = [];
    let teilnehmerNames = [];
    function getHandlung() {
        axios.get("http://localhost:3009/api/handlungen/" + handlung_id)
            .then((response) => {
                handlung = response.data;
                teilnehmerNames = response.data.teilnehmerNames;
            });
    };
/*
    function getHandlungc() {
        axios.get("http://localhost:3009/api/handlungenWithTeilnehmer/" + handlung_id)
            .then((response) => {
                handlung = response.data;
                teilnehmerNames = response.data.teilnehmerNames;
            });
    }
*/
    function getTeilnehmende() {
        axios.get("http://localhost:3009/api/teilnehmende")
            .then((response) => {
                teilnehmende = response.data;
            });
    }

    function addTeilnehmerToHandlung() {
        handlung.teilnehmer.push(teilnehmer_id);
        axios.put("http://localhost:3009/api/handlungen/" + handlung_id, handlung)
            .then((response) => {
                getHandlung();
            });
    }
</script>

<div class="mb-5">
    <h1 class="mt-3">Handlung (ID: {handlung_id})</h1>
    <p>Title: {handlung.title}</p>
    <p>Description: {handlung.description}</p>
    <p>Value: {handlung.value}</p>
    <p>Teilnehmer:</p>
    <ul>
        {#each teilnehmerNames as name}
            <li>
                {name}
            </li>
        {/each}
    </ul>

    <h2>Update Teilnehmende</h2>
    <label for="teilnehmer">Add Teilnehmer to Handlung</label>
    <select class="form-select" bind:value={teilnehmer_id} id="teilnehmer">
        {#each teilnehmende as teilnehmer}
            <option value={teilnehmer._id}>{teilnehmer.name}</option>
        {/each}
    </select>
    <button class="btn btn-primary mt-2" on:click={addTeilnehmerToHandlung}>Update</button>
</div>
