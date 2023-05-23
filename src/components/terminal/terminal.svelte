<script lang="ts">
  import { onMount } from "svelte";
  import { initializeTerminal, ThemeTerminal } from "./terminal";

  let node: HTMLElement;
  onMount(async () => {
    const terminal = await import("xterm");
    const term = new terminal.Terminal({
      convertEol: true,
      fontFamily: `'Fira Mono', monospace`,
      fontSize: 19,
      rows: 10,
      theme: ThemeTerminal,
      // rendererType: "dom" // default is canvas
    });
    await initializeTerminal(term, node);
  });
</script>

<div bind:this={node} class="term h-80" />

<style>
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
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

  :global(.xterm-viewport.xterm-viewport) {
    scrollbar-width: thin;
  }

  :global(.xterm-viewport::-webkit-scrollbar) {
    width: 10px;
  }

  :global(.xterm-viewport::-webkit-scrollbar-track) {
    opacity: 0;
  }

  :global(.xterm-viewport::-webkit-scrollbar-thumb) {
    min-height: 20px;
    background-color: #ffffff20;
  }
</style>
