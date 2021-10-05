<template>
  <div class="w-full">
    <div>
      <div class="w-full h-4 bg-gray-400 rounded-full mt-3">
        <div
          class="h-full text-center text-xs text-white bg-green-500 rounded-full"
          :style="`width: ${value > 0 ? (max * value.toFixed(2)) / 100 : 0}%;`"
        >
          {{value.toFixed(2)}}%
        </div>
      </div>
    </div>
    <div class="flex flex-row">
      <label for="page">Current Page:</label>
      <input
        type="text"
        id="page"
        class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Current Page"
        @input="onInputChange"
        :value="value"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 10,
      max: 360,
      min: 0
    };
  },
  methods: {
    onInputChange($event) {
      const {value} = $event
      console.log(value, $event);
      if(value < 0) value = 0
      if(value > this.max) value = this.max 
      this.value = value
    }
  }
};
</script>

<style>
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="range"]::-webkit-slider-thumb {
    width: 15px;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    cursor: ew-resize;
    background: #fff;
    box-shadow: -405px 0 0 400px #605e5c;
    border-radius: 50%;
  }
}
</style>
