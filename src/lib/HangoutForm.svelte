<script>
  import { tagChoices } from "../modules/constants";
  import Toggle from "./common/toggle.svelte";
  import EmojiPicker from "./common/emojiPicker.svelte";
  import DataManager from "../modules/dataManager";

  // get elemetns
  let nameInput;
  let LocationInput;
  let googlePinInput;
  let tagInput;

  // handle isOffline toggle
  let isOfflineState = true;
  const isOfflineToggleClicked = (bool)=>{isOfflineState=bool}

  // handle emoji picker 
  let pickedEmoji = "📌";
  const onEmojiPicked = (emoji)=>{pickedEmoji = emoji}

  // handle tag select
  let tagSelected;
  let elSelectTag;
  const onTagSelected = ()=>{
    console.log(elSelectTag.selectedIndex);
  }
  const onSelectTagFocused = ()=>{
    elSelectTag.selectedIndex = 0;
  }

  // on save button clicked
  const onSaveButtonClicked = ()=>{
    // get values
    const tagLabels = Object.keys(tagChoices)
    const payload = {
      name:nameInput.value,
      location: LocationInput.value,
      googlePin: googlePinInput.value,
      emojiIcon:pickedEmoji,
      votes: 1,
      tag: tagLabels[elSelectTag.selectedIndex],
      isOffline: isOfflineState,
      hasBeenDone: false
    }
    // validate values
    console.log(payload);
    // todo data manage send payload to create
    // DataManager.createHangout(payload)
  }


</script>

<div class="root">
  <div class="card">
    <h1>Add Hangout</h1>
    <!-- main body -->
    <div class="row">
      <EmojiPicker onPicked={onEmojiPicked}></EmojiPicker>
      <div class="emojiPickerLabel">Pick Emoji</div>
    </div>
    <div class="label name">Name</div>
    <input bind:this={nameInput} type="text" name="" id="">
    <div class="offlineAndTagParent">
      <!-- for offline toggle and parent -->
      <Toggle label="Is Offline" initialState={isOfflineState} onToggle={isOfflineToggleClicked}></Toggle>
      <div class="row">
        <div>Tag</div>
        <select on:focus={onSelectTagFocused} on:change={onTagSelected} bind:this={elSelectTag}>
          <option value="" disabled selected>Select</option>
          <option value="">Food</option>
          <option value="">Gaming</option>
          <option value="">Recreation</option>
          <option value="">Chill</option>
          <option value="">Sports</option>
          <option value="">Productive</option>
          <option value="">Events</option>
          <option value="">Entertainment</option>
          <option value="">Others</option>
        </select>
      </div>
    </div>
    <div class="label name">Location</div>
    <input bind:this={LocationInput} type="text" name="" id="">
    <div class="label name">Google Pin Link</div>
    <input bind:this={googlePinInput} type="text" name="" id="">
    <button on:pointerup={onSaveButtonClicked}>Save</button>
  </div>
</div>

<style>
  .root{
    pointer-events: auto;
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .card{
    max-width: 800px;
    width: 100%;
    background-color: white;
    border-radius: 1rem;
  }

  h1{font-size: 2rem;}

  .row{display:  flex; align-items: center; gap: 1rem;}

  .topRow{
    width: 100%;

    display:  flex;
    justify-content: space-between;
  }

  input{
    width: 100%;
  }

  .offlineAndTagParent{
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0rem;
  }

  .label{
    width: 100%;
    text-align: left;
    font-size: 1.5rem;
  }

</style>

