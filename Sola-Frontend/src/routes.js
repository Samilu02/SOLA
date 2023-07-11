// Pages
import Home from "./pages/Home.svelte";
import ExampleHandlungen from "./pages/handlungen/ExampleHandlungen.svelte";

import Handlungen from "./pages/handlungen/Handlungen.svelte";
import HandlungDetails from "./pages/handlungen/HandlungDetails.svelte";
import CreateHandlung from "./pages/handlungen/CreateHandlung.svelte";

import Teilnehmende from "./pages/teilnehmende/Teilnehmende.svelte";
import TeilnehmerDetails from "./pages/teilnehmende/TeilnehmerDetails.svelte";
import CreateTeilnehmer from "./pages/teilnehmende/CreateTeilnehmer.svelte";
import EditTeilnehmer from "./pages/teilnehmende/EditTeilnehmer.svelte"; 

import Login from "./pages/auth/Login.svelte";
import Register from "./pages/auth/Register.svelte";

export default {
    // Home
    '/': Home,
    '/home': Home,

    // Example Handlungen
    '/ExampleHandlungen': ExampleHandlungen,

    // Handlungen
    '/Handlungen': Handlungen,
    '/Handlungen/:id': HandlungDetails,
    '/create-Handlung': CreateHandlung,
    
    // Teilnehmende
    '/Teilnehmende': Teilnehmende,
    '/Teilnehmende/:id': TeilnehmerDetails,
    '/Teilnehmende/:id/edit': EditTeilnehmer, 
    '/create-Teilnehmer': CreateTeilnehmer,

    // Auth
    '/login': Login,
    '/register': Register,
}
