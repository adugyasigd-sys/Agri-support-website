// 1. API Configuration
const API_KEY = '6fbe90311e5f4ef7ba420819262803'; 

// 2. Weather System Logic
async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const display = document.getElementById('weather-result');
    
    const city = cityInput.value.trim();

    if (!city) {
        display.innerHTML = "<p style='color: red;'>Please enter a town name first.</p>";
        return;
    }

    display.innerHTML = "<p>⏳ Fetching local weather for " + city + "...</p>";

    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;
        const response = await fetch(url);
        const data = await response.json();

        // Check if the API returned an error (like city not found)
        if (data.error) {
            display.innerHTML = `<p style="color: #721c24;">❌ Error: ${data.error.message}</p>`;
            return;
        }

        // Extracting data safely
        const name = data.location.name;
        const temp = Math.round(data.current.temp_c);
        const desc = data.current.condition.text;
        const humid = data.current.humidity;
        const rainChance = data.forecast.forecastday[0].day.daily_chance_of_rain;

        // Determine if weather is dangerous
        const isHot = temp > 38;
        const isStormy = desc.toLowerCase().includes("storm") || desc.toLowerCase().includes("heavy rain");

        // Build the result HTML
        display.innerHTML = `
            <div class="weather-card" style="background: ${isHot || isStormy ? '#fff3f3' : '#f0f9ff'}; padding: 20px; border-radius: 12px; border: 1px solid #d1d5db;">
                <h3 style="margin-bottom: 5px;">📍 ${name}</h3>
                <div style="font-size: 3.5rem; font-weight: bold; color: #1b4332;">${temp}°C</div>
                <p style="font-size: 1.2rem; margin-bottom: 10px;"><strong>${desc}</strong></p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; border-top: 1px solid #ccc; pt: 10px; margin-top: 10px;">
                    <p>💧 Humidity: <b>${humid}%</b></p>
                    <p>🌧️ Rain Risk: <b>${rainChance}%</b></p>
                </div>

                ${isHot ? '<p style="color: red; font-weight: bold; margin-top: 10px;">⚠️ Warning: Extreme Heat. Stay hydrated.</p>' : ''}
                ${isStormy ? '<p style="color: red; font-weight: bold; margin-top: 10px;">⚠️ Warning: Heavy Storm. Protect your crops.</p>' : ''}
            </div>
        `;

    } catch (err) {
        console.error("System Error:", err);
        display.innerHTML = "<p style='color: red;'>⚠️ Connection failed. Please check your data/internet and try again.</p>";
    }
}
// 4. Contact Professionals Logic
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents the page from refreshing
        
        const name = document.getElementById('farmer-name').value;
        const message = document.getElementById('farmer-msg').value;

        // Since this is a prototype, we show a success message
        contactSuccess.classList.remove('hidden');
        contactSuccess.innerHTML = `✅ Thank you, ${name}! Your message has been sent to our experts. They will contact you soon.`;
        
        // Clear the form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            contactSuccess.classList.add('hidden');
        }, 5000);
    });
}

// Logic for the small "Message" buttons next to expert names
document.querySelectorAll('.btn-sm').forEach(button => {
    button.addEventListener('click', function() {
        const expertName = this.parentElement.querySelector('strong').innerText;
        alert("Opening private chat with " + expertName + "...");
        document.getElementById('farmer-msg').placeholder = "Write your message to " + expertName + " here...";
        document.getElementById('experts').scrollIntoView({ behavior: 'smooth' });
    });
});