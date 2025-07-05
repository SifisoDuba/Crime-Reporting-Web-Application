<template>
  <div class="landing">
    <Navbar />
    <h2>Landing Page</h2>
    <NewsPost />

    <p>
      Your community’s first line of defense.<br>
      This is a trusted neighbourhood crime response platform designed to keep you and your loved ones safe. Report crimes instantly, alert emergency services with a tap, and stay informed with real-time updates on local crime hotspots.<br>
      Whether it’s a break-in, fire, or medical emergency — we’re here to make sure help is never far away.<br>
      Because safety should never be optional.<br>
      Sign up today to protect what matters most.
    </p>

    <!-- Report Button -->
    <div class="text-center">
      <button class="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full font-semibold">
        Instant Report
      </button>
    </div>

    <!-- Panic Button Section -->
    <div class="space-y-2">
      <h2 class="font-bold text-md">Panic Button - Instant emergency alert</h2>
      <div class="flex space-x-4">
        <img src="@/assets/panic-icon.png" alt="Panic Icon" class="w-20 h-20 object-contain" />
        <p>
          In a critical moment, every second counts. The Panic Button allows you to instantly alert emergency services using your live GPS location—even if you’re not logged in. <br>
          With just one tap, your location is sent to the nearest available responders, enabling rapid assistance in situations like break-ins, fires, or medical emergencies.<br>
          No forms. No delays. Just fast, focused help —<b>when you need it most</b>.<br>
          🔒 Your location data is only shared during an active alert and is handled with strict privacy and security measures.
        </p>
      </div>
    </div>

    <!-- More on Us Section -->
    <div>
      <h2 class="font-bold text-md text-center mb-2">More on Us</h2>
      <div class="flex space-x-4">
        <div class="w-1/2">
          <p>
            built with your safety in mind. Our system uses encrypted data handling, secure login protocols, and real-time location services to ensure fast, reliable emergency responses — without compromising your privacy.<br>
            We’re committed to protecting both your neighbourhood and your information.
          </p>
        </div>
        <div class="w-1/2 text-center">
          <h3 class="font-semibold">Secure</h3>
          <img src="@/assets/secure-icon.png" alt="Secure Icon" class="w-16 h-16 mx-auto mt-2" />
        </div>
      </div>
    </div>

    <!-- Real-Time Response -->
    <div>
      <h2 class="font-bold text-md mb-1">Real-Time Response</h2>
      <div class="flex space-x-4">
        <img src="@/assets/response-icon.png" alt="Response Icon" class="w-16 h-16 object-contain" />
        <p>
          When emergencies strike, we act fast. Your reports and panic alerts are instantly routed to the appropriate authorities, who track and respond in real time.<br>
          Stay informed with live status updates — from "Under Review" to "Help On The Way."<br>
          Because in a crisis, every moment matters.
        </p>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import NewsPost from "../components/NewsPost.vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "LandingPage",
  components: {
    NewsPost,
    Navbar,
    Footer
  }
  
};
</script>

<style scoped>
.landing {
  background-color: #c1c1c1;
}
</style>