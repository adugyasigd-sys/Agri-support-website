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
// --- 4. CONTACT PROFESSIONALS LOGIC (COMPLETE) ---

// A. Handle the Main Contact Form
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('farmer-name').value;
        const phone = document.getElementById('farmer-phone').value;
        const method = document.getElementById('contact-method').value;

        // Change button state
        const submitBtn = this.querySelector('button');
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        setTimeout(() => {
            contactSuccess.classList.remove('hidden');
            contactSuccess.innerHTML = `
                <strong>✅ Message Sent!</strong><br>
                Thank you ${name}. An expert will reach you at <b>${phone}</b> via <b>${method}</b> shortly.
            `;
            
            contactForm.reset();
            submitBtn.innerText = "Send Message";
            submitBtn.disabled = false;
            
            contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    });
}

// B. Handle the Small "Message" Buttons (Next to Expert names)
// We look for any button with the class 'btn-sm'
document.querySelectorAll('.btn-sm').forEach(button => {
    button.addEventListener('click', function() {
        // Find the name of the expert in the bold <strong> tag
        const expertName = this.parentElement.querySelector('strong').innerText;
        
        // 1. Alert the user
        alert("Preparing message for " + expertName + "...");
        
        // 2. Automatically fill the message box for the farmer
        const messageBox = document.getElementById('farmer-msg');
        messageBox.value = "Hello " + expertName + ", I need help with my crops. ";
        
        // 3. Scroll down to the form so they can finish their message
        document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
        
        // 4. Put the cursor in the message box automatically
        messageBox.focus();
    });
});
});
// Updated Contact Logic
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('farmer-name').value;
        const phone = document.getElementById('farmer-phone').value;
        const method = document.getElementById('contact-method').value;

        // Visual feedback: Change button text while "sending"
        const submitBtn = this.querySelector('button');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        // Simulate a network delay (1.5 seconds)
        setTimeout(() => {
            contactSuccess.classList.remove('hidden');
            contactSuccess.innerHTML = `
                <strong>✅ Message Sent!</strong><br>
                Thank you ${name}. An expert will reach you at <b>${phone}</b> via <b>${method}</b> shortly.
            `;
            
            // Reset form and button
            contactForm.reset();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            
            // Scroll to the success message
            contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    });
}
