<script>
    import axios from "axios";

    let Teilnehmende = [];

    function getTeilnehmende() {
        axios.get("http://localhost:3009/api/teilnehmende").then((response) => {
            console.log(response.data);
            Teilnehmende = response.data;
        });
    }
    getTeilnehmende();
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
</style>

<div class="mb-5">
    <h1 class="mt-3">List of all Teilnehmer</h1>
    <a href="#/create-Teilnehmer" class="add-btn">+ Add Teilnehmer</a>
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Origin</th>
                <th>Age</th>
                <th>Group</th>
            </tr>
        </thead>
        <tbody>
            {#each Teilnehmende as Teilnehmer}
                <tr>
                    <td>
                        <a href={"#/Teilnehmende/" + Teilnehmer._id}>
                            {Teilnehmer._id}
                        </a>
                    </td>
                    <td>
                        {Teilnehmer.name}
                    </td>
                    <td>
                        {Teilnehmer.origin}
                    </td>
                    <td>
                        {Teilnehmer.age}
                    </td>
                    <td>
                        {Teilnehmer.group}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
