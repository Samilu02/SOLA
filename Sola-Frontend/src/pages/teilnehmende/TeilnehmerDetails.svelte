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

    .info-card {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.15);
        padding: 20px 30px;
        max-width: 500px;
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .info-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(45deg, #007bff, #6c757d);
        z-index: 1;
        transition: transform 0.5s;
        transform: translateY(-100%);
    }

    .info-card:hover::before {
        transform: translateY(0);
    }

    h1, p {
        position: relative;
        z-index: 2;
        color: #333;
    }

    .btn {
        display: inline-block;
        padding: 10px 20px;
        border-radius: 5px;
        color: #fff;
        background: #007bff;
        text-decoration: none;
        transition: background .3s ease;
        position: relative;
        z-index: 2;
        margin-top: 20px;
    }

    .btn:hover {
        background: #0056b3;
    }

    p.negative-value {
        color: red;  /* or any other color you prefer */
        font-size: 1.5em;  /* increase font size */
    }
</style>

<div class="container">
    <div class="info-card">
        <h1>Teilnehmer (ID: {id})</h1>
        <p>Name: {teilnehmer.name}</p>
        <p>Origin: {teilnehmer.origin}</p>
        <p>Age: {teilnehmer.age}</p>
        <p>Group: {teilnehmer.group}</p>
        <p class:negative-value={totalValue < 0}>Balance: {totalValue}</p>
        <a href={"#/Teilnehmende/" + id + "/edit"} class="btn">Edit Teilnehmer</a>
    </div>
</div>