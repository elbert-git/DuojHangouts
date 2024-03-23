<script>
  import hangoutLogo from '/android-chrome-192x192.png';
  import HangoutEntry from './lib/HangoutEntry.svelte';
  import PopUpModal from './lib/common/PopUpModal.svelte';
  import HangoutForm from './lib/HangoutForm.svelte';

  // states
  let newEntrySlideUp = false;
  let allHangouts = {}
  // event callbacks
  const toggleNewEntryModal = (bool)=>{newEntrySlideUp = bool}
</script>

<main class="main">
  <!-- root div to suppor pop up -->
  <div class="root">
    <img src={hangoutLogo} class="logo svelte" alt="Hangout Logo" />
    <h1>Duoj Hangouts</h1>
    <h2 class="hangout-button" on:pointerup={()=>{toggleNewEntryModal(true)}}>+ Add Hangout +</h2>
    <hr />
    <div class="flex flex-row justify-around">
      <h2>Sort By</h2>
      <h2>Filter</h2>
      <h2>Is Offline</h2>
      <input type="radio" />
    </div>
    <div class="card">
      <HangoutEntry />
    </div>
    <div class="card">
      <HangoutEntry />
    </div>
    <div class="card">
      <HangoutEntry />
    </div>
  </div>

  <!-- pop up modals -->
  <PopUpModal slideUp={newEntrySlideUp} toggleModal={toggleNewEntryModal}>
    <HangoutForm></HangoutForm>
  </PopUpModal>
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

