<script>
  let count = 0;
  let upvoted = false;
  let downvoted = false;
  export let hangout_fields;
  import { tagChoices } from '../modules/constants';

  let computerIconUrl = "https://www.svgrepo.com/show/431549/computer.svg"
  let earthIconUrl = "https://www.svgrepo.com/show/525855/earth.svg"
  let checkedBoxUrl = "https://www.svgrepo.com/show/367793/box-tick.svg";
  let uncheckedBoxUrl = "https://www.svgrepo.com/show/367792/box-full.svg";
  

  function handleUpvote(pk) {
    // handle upvote pk update here!
    // update PK's upvote count
    upvoted = true;
  }

    console.log(hangout_fields.google_pin)
  function locationClick(){
    if(hangout_fields.google_pin !== ""){
        window.open(hangout_fields.google_pin, "_blank");
    }
  }

  function handleDownvote(pk) {
    // handle upvote pk update here!
    // update PK's downvote count!
    downvoted = true;
  }
  import EmojiPicker from './common/emojiPicker.svelte';
</script>

<div class="root">
  <div class="root-voting-buttons">
    <img class="voting-button interactive" src="https://www.svgrepo.com/show/533623/arrow-sm-up.svg" alt="" srcset="">
    <div class="votes">{hangout_fields.votes}</div>
    <img class="voting-button interactive" src="https://www.svgrepo.com/show/533619/arrow-sm-down.svg" alt="" srcset="">
  </div>

  <div>
    <EmojiPicker picked={hangout_fields.emoji_icon} isDisabled={true}
    ></EmojiPicker>
  </div>

  <div class="root-info" style="min-width: 200px">
    <div class="title-row">
        <img class="edit-button interactive" src="https://www.svgrepo.com/show/511904/edit-1479.svg" alt="" srcset="">
        <div class="title">{hangout_fields.name}</div>
    </div>
    <div class="divider"></div>
    <div class="secondary-info-row">
        <div class="root-has-been-done interactive">
            <img class="secondary-info-icons" src={hangout_fields.has_been_done ? checkedBoxUrl : uncheckedBoxUrl} alt="" srcset="">
            {hangout_fields.has_been_done ? "Has been done" : "Never done"}
        </div>
        <div class="root-is-offline">
            <img class="secondary-info-icons" src={hangout_fields.is_offline ? earthIconUrl : computerIconUrl} alt="" srcset="">
            {hangout_fields.is_offline ? "IRL Activity" : "Online Activity"}
        </div>
        <div class="root-location interactive" on:pointerup={locationClick}>
            <img class="secondary-info-icons" src="https://www.svgrepo.com/show/512650/pin-fill-sharp-circle-634.svg" alt="" srcset="">
            {hangout_fields.location}
        </div>
        <div class="root-tag">
            <img class="secondary-info-icons" src="https://www.svgrepo.com/show/526346/tag-horizontal.svg" alt="" srcset="">
            {tagChoices[hangout_fields.tag]}
        </div>
    </div>
  </div>
</div>

<style>
  i:hover {
    color: black !important;
    cursor: pointer;
  }

  .active {
    color: #242424 !important;
    font-weight: bolder;
  }

  .root-voting-buttons{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .root{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem;

    outline: 2px solid #242424;
    border-radius: 0.5rem;

    margin-top: 1rem;
    
    gap:0.5rem;
  }

  .root-info{
    flex-grow: 1;
  }

  .title-row{
    display: flex;
    font-size: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
  }

  .voting-button{
    height: 2rem;
  }

  .divider{
    width: 100%;
    height: 3px;
    background-color: #242424;
  }

  .edit-button{
    height: 1.8rem;
  }

  .secondary-info-row{
    display: flex;
    align-items: center;
    gap:1rem;
    margin: 0.5rem;
  }

  .secondary-info-icons{
    height: 0.8rem;
  }
</style>
