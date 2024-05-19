<script>
  // props
  export let slideUp = false;
  export let toggleModal = (bool)=>{}
</script>

<div class="overlay">
  <div class={slideUp ? "bg overlay" : "bg overlay bg-slideDown"} on:pointerup={()=>{toggleModal(false)}}></div>
  <div class={slideUp ? "slider" : "slider slider-slideDown"}>
    <slot>child</slot>
    <button on:pointerup={()=>{toggleModal(false)}}>return</button>
  </div>
</div>

<style>
  .overlay{
    height: 100vh;
    width: 100vw;
    pointer-events: none;


    position: absolute;
    top: 0vh; left:0;

    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .bg{
    pointer-events: auto;
    height: 100vh;
    width: 100vw;
    transition: 0.3s;
    background-color: rgba(0, 0, 0, 0.541);
  }
  .bg-slideDown{
    opacity: 0;
    pointer-events: none;
  }


  .slider{
    position: relative;
    top:0vh;
    transition: 0.3s;
    max-width: 800px;
    width: 100%;
    /* pointer-events: none; */
    padding: 0rem 0.5rem;
  }
  .slider-slideDown{
    top:130vh !important;
  }

  button{
    pointer-events: auto;
  }
</style>