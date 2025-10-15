<template>
  <div class="address">
    <h2>Update Address</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Street Address:
        <input type="text" v-model="form.street" placeholder="Street Address" required />
      </label>
      <label>
        House Number:
        <input type="text" v-model="form.house" placeholder="House Number" readonly />
      </label>
      <label>
        City:
        <input type="text" v-model="form.city" placeholder="City" required />
      </label>
      <label>
        Province:
        <input type="text" v-model="form.province" placeholder="Province" required />
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
        street: "",
        house: "",
        city: "",
        province: "",
      },
    };
  },
  mounted() {
    const idNumber = localStorage.getItem('idNumber');
    if (idNumber) {
      this.fetchAddress(idNumber);
    }
  },
  methods: {
    async fetchAddress(idNumber) {
      try {
        const response = await axios.get(`http://localhost:3000/address/${idNumber}`);
        const address = response.data;
        this.form.street = address.Street || '';
        this.form.house = address.HouseNumber || '';
        this.form.city = address.City || '';
        this.form.province = address.Province || '';
      } catch (error) {
        console.error('Failed to fetch address:', error);
        alert("Failed to load address details.");
      }
    },
    async handleSubmit() {
      console.log("Submitting address:", this.form);
      try {
        const res = await axios.post('http://localhost:3000/update-address', this.form);
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
