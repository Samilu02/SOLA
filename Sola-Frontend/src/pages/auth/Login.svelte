<script>
    import axios from "axios";

    let username = '';
    let password = '';

    function login() {
        axios.post("http://localhost:3009/api/login", {
            username,
            password
        }).then((response) => {
            console.log(response.data);
            // Here you would typically save the user's information or token to local storage
            // and redirect them to the home page or dashboard
        });
    }
</script>

<div class="login">
    <h1>Login</h1>
    <input bind:value={username} placeholder="Username" />
    <input bind:value={password} placeholder="Password" type="password" />
    <button on:click={login}>Login</button>
</div>
