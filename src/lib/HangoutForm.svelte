<script>
  import Toggle from "./common/toggle.svelte";
  import EmojiPicker from "./common/emojiPicker.svelte";
</script>

<div class="root">
  <div class="card">
    <h1>Add Hangout</h1>
    <!-- main body -->
    <div class="row">
      <EmojiPicker></EmojiPicker>
      <div class="emojiPickerLabel">Pick Emoji</div>
    </div>
    <div class="label name">Name</div>
    <input type="text" name="" id="">
    <div class="offlineAndTagParent">
      <!-- for offline toggle and parent -->
      <Toggle label="Is Offline" initialState={true}></Toggle>
      <div class="row">
        <div>Tag</div>
        <select name="" id="">
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
    <input type="text" name="" id="">
    <div class="label name">Google Pin Link</div>
    <input type="text" name="" id="">
    <button>Save</button>
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