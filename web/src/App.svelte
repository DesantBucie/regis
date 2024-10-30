<script xmlns="http://www.w3.org/1999/html">

  import Editor from "./views/EditorSVG.svelte";
  import Circles from "./views/Circles.svelte";
  import StartScreen from "./views/StartScreen.svelte";
  import {Router, Route} from "svelte-routing";
  import Viewer from "./views/Viewer.svelte";
  import ExportPdf from "./views/ExportPdf.svelte";

</script>

<main>
    <Router url={''}>
        <Route path="/" component={StartScreen} />
        <Route path="/circles" component="{Circles}"/>
        <Route path="/editor" component="{Editor}"/>
        <Route path="/viewer" component="{Viewer}"/>
        <Route path="/exportpdf" component="{ExportPdf}"/>
    </Router>
</main>

<style>
</style>
