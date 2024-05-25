<script>
  import HangoutEntry from './lib/HangoutEntry.svelte';
  import PopUpModal from './lib/common/PopUpModal.svelte';
  import HangoutForm from './lib/HangoutForm.svelte';
  import Header from './lib/Header.svelte';

  import { onMount } from 'svelte';
  import DataManager from './modules/dataManager';

  // states
  let newEntrySlideUp = false;
  let allHangouts = [];
  // event callbacks
  const toggleNewEntryModal = (bool) => {
    newEntrySlideUp = bool;
  };

  onMount(async () => {
    allHangouts = await DataManager.getAllHangouts();
    // delete hangouts in case of error
    /* await DataManager.deleteAllDevHangouts(); */
  });
</script>

<div class="popUpParent">
  <div class="contentRoot scroll">
    <div class="squeeze">
      <Header></Header>
      <hr />
      <div class="settingsRow">
        <div class="buttonContainer">
          <button
            class="brutalButton"
            on:pointerup={() => {
              toggleNewEntryModal(true);
            }}>ADD HANGOUT</button
          >
        </div>
        <div class="settingsContainer">
          <h2>Sort By</h2>
          <h2>Filter</h2>
          <h2>Is Offline</h2>
          <input type="radio" />
        </div>
      </div>
      <div class="hangoutsList">
        <div class="card">
          {#each allHangouts as item (item.id)}
            <HangoutEntry hangout_fields={item.fields} />
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- pop up modals -->
  <PopUpModal slideUp={newEntrySlideUp} toggleModal={toggleNewEntryModal}>
    <HangoutForm
      slideDown={() => {
        toggleNewEntryModal(false);
      }}
    ></HangoutForm>
  </PopUpModal>
</div>

<style>
  .settingsRow {
    display: flex;
    justify-content: space-between;
  }
  .settingsContainer {
    gap: 1rem;
    display: flex;
  }

  .hangoutsList {
    padding: 0.5rem 0rem;
  }
</style>
