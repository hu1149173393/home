<template>
  <div class="home">
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/homePage/homePage'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
