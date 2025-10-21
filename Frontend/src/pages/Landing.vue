<template>
  <div class="landing-page">
    <section class="hero">
      <div class="hero-content">
        <h1>Report Crimes. Stay Safe. Empower Communities.</h1>
        <p>
          Our platform enables citizens to report crimes quickly and securely,
          while helping authorities respond faster to keep neighborhoods safe.
        </p>
        <div class="cta-buttons">
          <button class="primary-btn" @click="submitEmergencyReport">Emergency Alert</button>
          <button class="secondary-btn" @click="$router.push('/login')">Login / Register</button>
        </div>
      </div>
    </section>

    <section class="how-it-works">
      <h2>How It Works</h2>
      <div class="steps">
        <div class="step">
          <img src="@/assets/images/review.jpg" alt="Report" />
          <h3>1. Report</h3>
          <p>Submit your crime report securely from your phone or computer.</p>
        </div>
        <div class="step">
          <img src="@/assets/images/review.jpg" alt="Review" />
          <h3>2. Review</h3>
          <p>Admins and authorities verify and analyze the report for accuracy.</p>
        </div>
        <div class="step">
          <img src="@/assets/images/responce.jpg" alt="Respond" />
          <h3>3. Respond</h3>
          <p>Authorities take immediate action to protect the community.</p>
        </div>
      </div>
    </section>

    <section class="why-us">
      <div class="why-content">
        <div class="text">
          <h2>Why Use Our Platform?</h2>
          <ul>
            <li><strong>Fast:</strong> No waiting at police stations.</li>
            <li><strong>Secure:</strong> Your details are encrypted & private.</li>
            <li><strong>Accessible:</strong> Report anytime, anywhere.</li>
            <li><strong>Community-driven:</strong> Join others keeping your neighborhood safe.</li>
          </ul>
        </div>
        <div class="image">
          <img src="@/assets/images/community.jpg" alt="Community safety" />
        </div>
      </div>
    </section>

    <section class="recent-reports">
      <h2>Recent Reports</h2>
      <div class="reports-grid">
        <div class="report-card">
          <img src="@/assets/images/scam.jpg" alt="Scam Alert" />
          <h4>Scam Alert</h4>
          <p>Residents reported fake municipal workers requesting money.</p>
        </div>
        <div class="report-card">
          <img src="@/assets/images/neighborhood.jpg" alt="Neighborhood Watch" />
          <h4>Neighborhood Watch</h4>
          <p>Volunteers now patrol in shifts to improve safety.</p>
        </div>
        <div class="report-card">
          <img src="@/assets/images/meeting.jpg" alt="Community Meeting" />
          <h4>Community Meeting</h4>
          <p>Join the monthly safety meeting at the town hall.</p>
        </div>
      </div>
    </section>

    <section class="community-safety">
      <div class="safety-content">
        <div class="image">
          <img src="@/assets/images/safety.jpg" alt="Safety collaboration" />
        </div>
        <div class="text">
          <h2>Together for a Safer Future</h2>
          <p>
            This platform strengthens trust between citizens and authorities.
            Every report helps prevent crime and build safer neighborhoods for all.
          </p>
        </div>
      </div>
    </section>

    <footer>
      <p>© 2025 Crime Reporting Web Application | All Rights Reserved</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LandingPage',
  methods: {
    async submitEmergencyReport() {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              const lat = pos.coords.latitude.toFixed(6);
              const lng = pos.coords.longitude.toFixed(6);
              const location = `Lat: ${lat}, Lng: ${lng}`;

              const emergencyData = {
                incidentType: 'Emergency Alert',
                description: 'Panic Button',
                location: location,
                severity: 'high',
                responseTime: 'emergency',
                dateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
                anonymous: true,
                followUp: false,
                userId: '0000000000000' 
              };

              const res = await axios.post('http://localhost:3000/report', emergencyData);
              console.log("Emergency report submitted:", res.data);
              alert('Emergency alert sent! Authorities have been notified.');
            },
            (error) => {
              console.error('Geolocation error:', error);
              alert('Unable to get your location. Please enable location services and try again.');
            }
          );
        } else {
          alert('Geolocation is not supported by your browser.');
        }
      } catch (error) {
        console.error("Error submitting emergency report:", error);
        alert('Failed to send emergency alert. Please try again.');
      }
    }
  }
}
</script>

<style scoped>
.landing-page {
  font-family: 'Roboto', sans-serif;
  color: #333;
  background: #fff;
  box-sizing: border-box;
}

.hero {
  background: linear-gradient(rgba(13,71,161,0.7), rgba(46,125,50,0.7)),
              url('@/assets/images/Background.jpg') center/cover no-repeat;
  color: white;
  text-align: center;
  padding: 120px 20px;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.primary-btn, .secondary-btn {
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  min-width: 200px;
}

.primary-btn {
  background-color: #2E7D32;
  color: white;
}

.primary-btn:hover, .primary-btn:focus {
  background-color: #1B5E20;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.secondary-btn {
  background-color: #fff;
  color: #0D47A1;
  border: 2px solid #0D47A1;
}

.secondary-btn:hover, .secondary-btn:focus {
  background-color: #E3F2FD;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.how-it-works {
  padding: 80px 20px;
  text-align: center;
  background: #fafafa;
}

.how-it-works h2 {
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #0D47A1;
}

.steps {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 20px;
}

.step {
  flex: 1 1 250px;
  margin: 0;
  background: #fff;
  padding: 30px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  text-align: center;
}

.step img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
}

.step h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #2E7D32;
}

.step p {
  line-height: 1.6;
}

.step:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.why-us {
  padding: 80px 20px;
}

.why-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;
}

.why-content .text {
  flex: 1 1 400px;
  padding: 20px;
}

.why-content .text h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #0D47A1;
}

.why-content .text ul {
  list-style: none;
  padding: 0;
}

.why-content .text li {
  margin-bottom: 15px;
  font-size: 1.1rem;
  line-height: 1.6;
}

.why-content .image img {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.recent-reports {
  padding: 80px 20px;
  text-align: center;
  background: #f5f5f5;
}

.recent-reports h2 {
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #0D47A1;
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.report-card {
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: left;
  transition: all 0.3s ease;
}

.report-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.report-card img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.report-card h4 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #2E7D32;
}

.community-safety {
  padding: 80px 20px;
  background: #fff;
}

.safety-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;
}

.safety-content .image img {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.safety-content .text {
  flex: 1 1 400px;
  padding: 20px;
}

.safety-content .text h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #0D47A1;
}

.safety-content .text p {
  font-size: 1.1rem;
  line-height: 1.6;
}

footer {
  background: #0D47A1;
  color: white;
  text-align: center;
  padding: 30px 20px;
  font-size: 1rem;
}

footer a {
  color: #AED581;
  margin: 0 8px;
  text-decoration: none;
  transition: color 0.3s;
}

footer a:hover {
  color: #fff;
}

@media (max-width: 1024px) {
  .hero h1 {
    font-size: 2.8rem;
  }

  .why-content, .safety-content {
    flex-direction: column;
    text-align: center;
  }

  .reports-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 100px 20px;
  }

  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1.1rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .primary-btn, .secondary-btn {
    width: 100%;
    max-width: 300px;
  }

  .how-it-works h2, .why-content .text h2, .recent-reports h2, .safety-content .text h2 {
    font-size: 2rem;
  }

  .steps {
    flex-direction: column;
  }

  .step {
    margin: 10px 0;
  }

  .reports-grid {
    grid-template-columns: 1fr;
  }

  .report-card {
    margin: 10px 0;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 80px 15px;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .primary-btn, .secondary-btn {
    padding: 12px 20px;
    font-size: 0.9rem;
  }

  .how-it-works, .why-us, .recent-reports, .community-safety {
    padding: 60px 15px;
  }

  .how-it-works h2, .why-content .text h2, .recent-reports h2, .safety-content .text h2 {
    font-size: 1.8rem;
  }

  .step {
    padding: 20px 15px;
  }

  .step img {
    width: 60px;
    height: 60px;
  }

  .report-card img {
    width: 60px;
    height: 60px;
  }

  .why-content .image img, .safety-content .image img {
    max-width: 100%;
  }

  footer {
    padding: 20px 15px;
    font-size: 0.9rem;
  }
}
</style>

