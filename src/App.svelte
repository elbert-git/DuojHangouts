<script>
  import hangoutLogo from '/android-chrome-192x192.png';
  import Counter from './lib/Counter.svelte';
</script>

<main>
  <img src={hangoutLogo} class="logo svelte" alt="Hangout Logo" />
  <h1>Duoj Hangouts</h1>

  <h2 class="hangout-button">+ Add Hangout +</h2>
  <hr />
  <div class="flex flex-row justify-around">
    <h2>Sort By</h2>
    <h2>Filter</h2>
    <h2>Is Offline</h2>
    <input type="radio" />
  </div>
  <div class="card">
    <Counter />
  </div>
  <div class="card">
    <Counter />
  </div>
  <div class="card">
    <Counter />
  </div>
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

  .hangout-button {
    border: 1px solid #242424;
    padding: 10px;
    cursor: pointer;
  }
</style>
