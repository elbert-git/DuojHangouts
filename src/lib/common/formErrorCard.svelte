<script>
  // expor key props
  export let allErrors = [];
  export let show = false

</script>

<div class={show ? "errorCardRoot" : "errorCardRoot hide"}>
  <h3>Errors</h3>
  {#each allErrors as error}
    <li>{error}</li>
  {/each}
</div>

<style>
  .errorCardRoot{
    background-color: #ffbbb5;
    color: #ff2f00;
    transition: 0.3s;
    padding: 1rem;
    margin: 1rem 0rem;
    border-radius: 1rem;
    outline: #ff2f00 2px solid;
    opacity: 1;
    max-height: 100rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    overflow: hidden;
  }

  .hide{
    max-height: 0rem;
    padding: 0rem;
    outline: #ff2f00 0px solid;
  }

  h3{
    margin: 0.5rem 0rem;
    padding: 0rem
  }
</style>