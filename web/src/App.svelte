<script xmlns="http://www.w3.org/1999/html">

  import Editor from "./views/EditorSVG.svelte";
  import Circles from "./views/Circles.svelte";
  import StartScreen from "./views/StartScreen.svelte";
  import {Router, Link, Route} from "svelte-routing";

</script>

<main>
    <Router url={''}>
        <Route path="/" component={StartScreen} />
        <Route path="/circles" component="{Circles}"/>
        <Route path="/editor" component="{Editor}"/>
    </Router>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
