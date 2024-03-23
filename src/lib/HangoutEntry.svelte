<script>
  let count = 0;
  let upvoted = false;
  let downvoted = false;
</script>

<div class="flex gap-5 justify-around align-center">
  <div class="flex flex-row gap-5 justify-center">
    <div>
      <button on:click={() => (upvoted = !upvoted)}
        ><i class="fa-solid fa-up-long fa-lg font-hover" class:active={upvoted === true} style="color: white;  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;"></i>
      </button>
    </div>
    <div style="align-self: center;">0</div>
    <div>
      <button class:active={downvoted === true} on:click={() => (downvoted = !downvoted)}>
        <i class:active={downvoted === true} class="fa-solid fa-down-long fa-lg font-hover" style="color: white;  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;"></i>
      </button>
    </div>
  </div>

  <div><img src="https://placehold.co/400" alt="img" height="50" /></div>
  <div class="flex flex-col" style="min-width: 200px">
    <div class="flex flex-row">
      <div>
        <button><i class="fa-solid fa-pen-to-square"></i></button>
      </div>
      <div style="margin: auto 5px;">Activity Name</div>
    </div>

    <div>
      <hr />
    </div>

    <div class="flex flex-row gap-5">
      <div>Location</div>
      <div>Tags</div>
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
