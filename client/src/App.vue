<script setup>
  import { ref, computed } from 'vue';


</script>

<template>
  <div class="container">
    <center><h1>Login</h1></center>
    <form >
      <input
        type="text"
        class="form-control my-2"
        placeholder="nombre"

      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="pin"

      />
      <center><b-button type="submit">Acceder</b-button></center>
    </form>
    <div >
    </div>
  </div>
</template>

<style>

</style>
