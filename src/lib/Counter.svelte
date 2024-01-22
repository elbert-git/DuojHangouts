<script>
  let count = 0;
  const increment = () => {
    count += 1;
  };
</script>

<div class="flex-row">
  <div>Up 0 Down</div>
  <div>Image</div>
  <div>Activity Name</div>
</div>

<hr />

<div>Location</div>
<div>Tags</div>
<button on:click={increment}>
  count is {count}
</button>

<style></style>
