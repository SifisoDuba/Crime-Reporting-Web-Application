<template>
  <div class="address">
    <h2>Update Address</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Street Address:
        <input type="text" v-model="form.street" placeholder="Street Address" />
      </label>
      <label>
        City/Town:
        <input type="text" v-model="form.city" placeholder="City/Town" />
      </label>
      <label>
        House Number:
        <input type="text" v-model="form.house" placeholder="House Number" />
      </label>
      <label>
        Postal Code:
        <input type="text" v-model="form.postalCode" placeholder="Postal Code" />
      </label>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "AppAddress",
  data() {
    return {
      form: {
        street: "12 Lower Level Road",
        house: "759",
        city: "Cape Town",
        postalCode: "8000",
      },
    };
  },
  methods: {
    async handleSubmit() {
      console.log("Submitting address:", this.form);
      try {
        const res = await axios.post('http://localhost:3000/address', this.form);
        console.log("Address updated successfully:", res.data);
        alert(res.data.message); 
      } catch (error) {
        console.error("Error updating address:", error);
        alert("Failed to update address. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.address {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.address label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
}

.address input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.address button {
  background-color: #10b981;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

@media (max-width: 768px) {
  .address {
    padding: 15px;
    margin: 10px;
  }

  .address label {
    font-size: 1rem;
  }

  .address input {
    padding: 10px;
  }

  .address button {
    width: 100%;
    padding: 12px 0;
  }
}
</style>
