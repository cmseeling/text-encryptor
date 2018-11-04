<template>
  <div id="app" v-bind:style="sizeStyle">
    <router-view></router-view>
  </div>
</template>

<script>
  const electron = require('electron')
  const remote = electron.remote

  export default {
    name: 'text-encryptor',
    data: function() {
      return {
        currentHeight: null
      }
    },
    computed: {
      height: function() {
        if(this.currentHeight == null) {
          return remote.getCurrentWindow().getContentBounds().height;
        }
        else {
          return this.currentHeight;
        }
      },
      sizeStyle: function() {
        return {
          height: `${this.height - 103}px`
        }
      }
    },
    created: function() {
      let component = this;
      window.addEventListener('resize', function(e) {
        let contentBounds = remote.getCurrentWindow().getContentBounds();
        component.currentHeight = contentBounds.height;
      })
    }
  }
</script>

<style>

</style>
