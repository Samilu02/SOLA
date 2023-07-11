<script>
	import Router from "svelte-spa-router";
	import routes from "./routes";
</script>

<!-- This part is always displayed -->
<nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
        <a class="navbar-brand" href="#/">Event DB</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#/Teilnehmende">Teilnehmende</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/Handlungen">Handlungen</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/example-handlungen">Example Handlungen</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container mt-3">
	<Router {routes} />
</div>

<style>
	.navbar {
		background-color: #ADD8E6; 
	}

	.navbar-toggler-icon {
		color: #fff;
	}

	.navbar-brand, .nav-link {
		color: #fff !important;
	}

	@media (max-width: 992px) {
		.navbar {
			padding: 0.5rem 1rem; 
		}

		.navbar-brand {
			font-size: 1.2rem; 
		}
	}
</style>
