<script>
    import axios from "axios";

    let username = '';
    let password = '';

    function register() {
        axios.post("http://localhost:3009/api/register", {
            username,
            password
        }).then((response) => {
            console.log(response.data);
        });
    }
</script>

<div class="register">
    <h1>Register a new user</h1>
    <input bind:value={username} placeholder="Username" />
    <input bind:value={password} placeholder="Password" type="password" />
    <button on:click={register}>Register</button>
</div>
