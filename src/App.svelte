<script>
  import HangoutEntry from './lib/HangoutEntry.svelte';
  import PopUpModal from './lib/common/PopUpModal.svelte';
  import HangoutForm from './lib/HangoutForm.svelte';
  import Header from './lib/Header.svelte';

  // states
  let newEntrySlideUp = false;
  let allHangouts = {}
  // event callbacks
  const toggleNewEntryModal = (bool)=>{newEntrySlideUp = bool}
</script>

<div class="popUpParent">
    <div class="contentRoot scroll">
        <div class="squeeze">
            <Header></Header>
            <hr>
            <div class="settingsRow">
                <div class="buttonContainer">
                    <button class="brutalButton" on:pointerup={()=>{toggleNewEntryModal(true)}}>ADD HANGOUT</button>
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
                    <HangoutEntry />
                </div>
                <div class="card">
                    <HangoutEntry />
                </div>
                <div class="card">
                    <HangoutEntry />
                </div>
            </div>
            <!-- <h2 class="hangout-button" on:pointerup={()=>{toggleNewEntryModal(true)}}>+ Add Hangout +</h2> -->
        </div>
    </div>

  <!-- pop up modals -->
  <PopUpModal slideUp={newEntrySlideUp} toggleModal={toggleNewEntryModal}>
    <HangoutForm></HangoutForm>
  </PopUpModal>
</div>

<style>
    .settingsRow{
        display: flex;
        justify-content: space-between;
    }
    .settingsContainer{
        gap:1rem;
        display: flex;
    }

    .hangoutsList{
        padding: 0.5rem 0rem;
    }
</style>

