<script>
  import { EmojiButton } from '@joeattardi/emoji-button';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let picked = null;
  export let isDisabled = false;
  export let onPicked = (emoji) => {
    console.log(`picker picked ${emoji}`);
  };

  const picker = new EmojiButton();
  let trigger;

  picker.on('emoji', (selection) => {
    dispatch('change', selection);
    picked = selection.emoji;
    onPicked(picked);
  });

  function togglePicker() {
    if (isDisabled) return;
    picker.togglePicker(trigger);
  }
</script>

<button bind:this={trigger} on:click={togglePicker}>
  {picked ? picked : '📌'}
</button>

<style>
  button {
    height: 5rem;
    font-size: 2rem;
    width: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
  }
</style>
