<script>
  let count = 0;
  let upvoted = false;
  let downvoted = false;
  export let hangout_fields;

  function handleUpvote(pk) {
    // handle upvote pk update here!
    // update PK's upvote count
    upvoted = true;
  }

  function handleDownvote(pk) {
    // handle upvote pk update here!
    // update PK's downvote count!
    downvoted = true;
  }
  import EmojiPicker from './common/emojiPicker.svelte';
</script>

<div class="flex gap-5 justify-around align-center">
  <div class="flex flex-row gap-5 justify-center">
    <div>
      <button on:click={handleUpvote}
        ><i
          class="fa-solid fa-up-long fa-lg font-hover"
          class:active={upvoted === true}
          style="color: white;  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;"
        ></i>
      </button>
    </div>
    <div style="align-self: center;">{hangout_fields.votes}</div>
    <div>
      <button class:active={downvoted === true} on:click={handleDownvote}>
        <i
          class:active={downvoted === true}
          class="fa-solid fa-down-long fa-lg font-hover"
          style="color: white;  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;"
        ></i>
      </button>
    </div>
  </div>

  <div>
    <EmojiPicker picked={hangout_fields.emoji_icon} isDisabled={true}
    ></EmojiPicker>
  </div>
  <div class="flex flex-col" style="min-width: 200px">
    <div class="flex flex-row">
      <div>
        <button><i class="fa-solid fa-pen-to-square"></i></button>
      </div>
      <div style="margin: auto 5px;">{hangout_fields.name}</div>
    </div>

    <div>
      <hr />
    </div>

    <div class="flex flex-row gap-5">
      <div>{hangout_fields.location}</div>
      <div>{hangout_fields.tag}</div>
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
</style>
