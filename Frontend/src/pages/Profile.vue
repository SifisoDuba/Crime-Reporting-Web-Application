<template>
  <div class="min-h-screen bg-gray-300 flex flex-col justify-between">
    <div class="bg-white max-w-5xl mx-auto my-6 p-6 grid grid-cols-2 gap-6 shadow-md">
      
      <div class="space-y-6 text-sm leading-6 text-black">
        <div>
          <p class="italic font-semibold">General:</p>
          <p><strong>Name:</strong> John</p>
          <p><strong>Surname:</strong> Wick</p>
          <p><strong>Age:</strong> 30</p>
          <p><strong>Status:</strong> Resident</p>
        </div>

        <div>
          <p class="italic font-semibold">Address:</p>
          <p>12 Lower Level Road</p>
          <p>District Six</p>
          <p>Cape Town</p>
          <p>8000</p>
        </div>

        <div>
          <p class="italic font-semibold">Contact details:</p>
          <p><strong>082 889 3231</strong></p>
          <p><strong>babayaga@gmail.com</strong></p>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center">
        <div class="w-64 h-64 bg-gray-200 flex items-center justify-center text-xl text-black font-semibold mb-4">
          Picture
        </div>
        <button class="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-800 text-sm">
          Update Details
        </button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "ProfilePage",
  
};
</script>

<style scoped>
.profile {
  background-color: #c1c1c1;
}
</style>