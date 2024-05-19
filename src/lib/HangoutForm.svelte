<script>
  import { tagChoices } from "../modules/constants";
  import Toggle from "./common/toggle.svelte";
  import EmojiPicker from "./common/emojiPicker.svelte";
  import DataManager from "../modules/dataManager";
  import FormErrorCard from "./common/formErrorCard.svelte";

  // get elemetns
  let nameInput;
  let LocationInput;
  let googlePinInput;
  let tagInput;
  export let slideDown = ()=>{}

  // handle isOffline toggle
  let isOfflineState = true;
  const isOfflineToggleClicked = (bool)=>{isOfflineState=bool}

  // handle emoji picker 
  let pickedEmoji = "📌";
  const onEmojiPicked = (emoji)=>{pickedEmoji = emoji}

  // handle tag select
  let tagSelected = 0;
  let elSelectTag;
  const onTagSelected = ()=>{
    // console.log(elSelectTag.selectedIndex);
  }
  const onSelectTagFocused = ()=>{
    elSelectTag.selectedIndex = 0;
  }

  // on save button clicked
  let allErrors = []
  let showErrors = false
  const onSaveButtonClicked = ()=>{
    // get values
    const tagLabels = Object.keys(tagChoices)
    const payload = {
      name:nameInput.value,
      location: LocationInput.value,
      googlePin: googlePinInput.value,
      emojiIcon:pickedEmoji,
      votes: 1,
      tag: tagLabels[elSelectTag.selectedIndex - 1],
      isOffline: isOfflineState,
      hasBeenDone: false
    }
    // validate values
    const validationReport = DataManager.validateDataPayload(payload);

    // handle fail and success of validationt
    if(validationReport.overallPassed){ // attempt send to backend
        showErrors = false;
        // successfull payload
        // [] send to back end
        DataManager.createHangout(payload).then((res)=>{console.log(res)})
        resetForm();
        slideDown();
    }else{ // 
      const listOfErrorMessages = []
      Object.keys(validationReport).forEach((key)=>{
        if(key !== 'overallPassed'){
          if(validationReport[key].error !== ''){
            listOfErrorMessages.push(validationReport[key].error)
          }
        }
      })
      showErrors = true;
      allErrors = listOfErrorMessages;
    }

  }

  const resetForm = ()=>{
    nameInput.value = ''
    LocationInput.value = ''
    googlePinInput.value = ''
    elSelectTag.selectedIndex = 0;
  }
</script>

<div class="root">
  <div class="card scroll">
    <h1 class="notable">Add Hangout</h1>
    <hr>
    <FormErrorCard show={showErrors} allErrors={allErrors}></FormErrorCard>
    <!-- main body -->
    <div class="row">
      <EmojiPicker onPicked={onEmojiPicked} picked={pickedEmoji}></EmojiPicker>
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
    <button class="brutalButton saveButton" on:pointerup={onSaveButtonClicked}>Save</button>
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

    padding-top: 1.5rem;
  }

  .card{
    max-width: 800px;
    width: 100%;
    max-height: 80vh !important;
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
    font-weight: 500;
  }

  .saveButton{
    margin-top: 1rem ;
  }
</style>

