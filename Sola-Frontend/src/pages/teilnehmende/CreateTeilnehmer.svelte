<script>
    import axios from "axios";

    let teilnehmer = {
        name: "",
        origin: "",
        age: "",
        group: "",  
    };


    function addTeilnehmer() {
        axios.post("http://localhost:3009/api/teilnehmende", teilnehmer)
            .then((response) => {
                alert("Teilnehmer added");
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }
</script>

<style>
    .mb-5 {
        padding: 1rem;
        background-color: #f8f9fa;
        border-radius: 1rem;
    }

    .mt-3 {
        color: #007bff;
    }

    form {
        background-color: #fff;
        padding: 1rem;
        border-radius: .5rem;
        box-shadow: 0 0.5rem 1rem rgba(0,0,0,.15);
    }

    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
    }
</style>

<div class="mb-5">
    <h1 class="mt-3">Add a Teilnehmer</h1>

    <form>
        <div class="mb-3">
            <label for="" class="form-label">Name</label>
            <input class="form-control" type="text" bind:value={teilnehmer.name} />
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Origin</label>
            <input class="form-control" type="text" bind:value={teilnehmer.origin} />
        </div>
        <div class="mb-3">
            <label for="" class="form-label">age</label>
            <input class="form-control" type="text" bind:value={teilnehmer.age} />
        </div>
        <div class="mb-3">
            <label for="" class="form-label">group</label>
            <input class="form-control" type="text" bind:value={teilnehmer.group} />
        </div>
        <button on:click={addTeilnehmer} type="button" class="btn btn-primary">
            Add Teilnehmer
        </button>
    </form>
</div>