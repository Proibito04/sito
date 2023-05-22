<script lang="ts">
  import { onMount } from "svelte";
  import { initializeTerminal, ThemeTerminal } from "./terminal";

  let node: HTMLElement;
  onMount(async () => {
    const terminal = await import("xterm");
    const term = new terminal.Terminal({
      convertEol: true,
      fontFamily: `'Fira Mono', monospace`,
      fontSize: "1em",
      rows: 10,
      theme: ThemeTerminal,
      // rendererType: "dom" // default is canvas
    });
    initializeTerminal(term, node);
  });
</script>

<div bind:this={node} class="term" />

<style>
  @keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

  .term {
    border: 1px solid white;
  }

  :global(.xterm-viewport::-webkit-scrollbar) {
    display: none;
    /* display: none; */
  }

  :global(.xterm-cursor) {
    animation: blink 1s infinite;
    animation-delay: 0.5s;
    outline: none;
  }
</style>
