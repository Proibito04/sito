<script lang="ts">
  import { onMount } from "svelte";

  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let width = 10;
  let height = 10;
  let borderRadius = "50%";
  let myElement: Element;
  const ease = 0.15;

  function animate() {
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;

    window.requestAnimationFrame(animate);
  }

  onMount(() => {
    window.addEventListener("mousemove", (event) => {
      targetX = event.clientX - width / 2;
      targetY = event.clientY - width / 2;

      let elementUnderCursor = document.elementFromPoint(
        event.clientX,
        event.clientY
      );
      let pannocchiaElement = findAncestorWithClass(
        elementUnderCursor,
        "pannocchia"
      );

      if (pannocchiaElement) {
        adaptToElement(pannocchiaElement);
      } else {
        normal();
      }
    });

    animate();

    return () => {};
  });

  function findAncestorWithClass(element, className) {
    while (element && !element.classList.contains(className)) {
      element = element.parentElement;
    }
    return element; // Potrebbe essere null se non trova nessun elemento con quella classe
  }

  function normal() {
    width = 20;
    height = 20;
    borderRadius = "50%";
  }

  function adaptToElement(element: Element) {
    const rect = element.getBoundingClientRect();

    width = rect.width + 20;
    height = rect.height + 20;

    borderRadius = getComputedStyle(element).borderRadius;

    targetX = rect.left + rect.width / 2 - width / 2;
    targetY = rect.top + rect.height / 2 - height / 2;
  }
</script>

<div
  bind:this={myElement}
  class="circle z-50"
  style="width: {width}px; height: {height}px; left: {x}px; top: {y}px; 
  border-radius: {borderRadius}; 
  "
></div>

<style>
  .circle {
    background: rgba(42, 83, 60, 0.4);
    position: fixed;
    pointer-events: none;
    border-radius: 50%;
    transition:
      width 200ms,
      height 200ms;
  }
</style>
