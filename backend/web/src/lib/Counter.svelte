<script>
  let count = 0
  const increment = () => {
    count += 1
  }
  const decrement = () => {
    count -= 1
  }
</script>
<p>{count}</p>
<button on:click={increment}>
  increment
</button>
<button on:click={decrement}>decrement</button>
