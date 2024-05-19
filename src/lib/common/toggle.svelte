<script>
  import { onMount } from "svelte";

  export let label = "Toggle"
  export let initialState = false;
  let state = false;

  onMount(()=>{state = initialState})
  export let onToggle = (bool)=>{console.log(`${label} toggled: ${bool}`)}
  let onClick = ()=>{
    state = !state
    onToggle(state)
  }
</script>

<div class="root" on:pointerdown={onClick}>
  <div class="label">{label}</div>
  <div class="parent">
    <div class={state ? "nob nob-move" : "nob"}></div>
  </div>
</div>

<style>
  .root{
    display: flex;
    gap:0.5rem;
    align-items: center;
    height: 1.5rem;
    cursor: pointer;
    overflow: hidden;
  }
  .parent{
    height: 1rem;
    width: 2.25rem;
    border-radius: 1.5rem;
    border: solid black 1px;

    display: flex;
    align-items: center;
    padding-left: 0.25rem;
  }
  .nob{
    height: 100%;
    background-color: black;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;

    transition: 0.1s;
    position: relative;
    left:0rem;
    opacity:0.5;
  }
  .nob-move{
    left:1rem;
    opacity: 1;
  }
  .label{
    font-weight: 500;
  }
</style>