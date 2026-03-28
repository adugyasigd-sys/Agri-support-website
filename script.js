// --- 1. CONFIGURATION ---
const API_KEY = '6fbe90311e5f4ef7ba420819262803'; 

// --- 2. WEATHER SYSTEM ---
async function getWeather() {
    const city = document.getElementById('city-input').value.trim();
    const display = document.getElementById('weather-result');

    if (!city) {
        alert("Please enter a town name.");
        return;
    }

    display.innerHTML = "<p>Loading weather data...</p>";

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no`);
        const data = await response.json();

        if (data.error) {
            display.innerHTML = `<p style="color:red;">Location not found. Try a bigger town nearby.</p>`;
            return;
        }

        const current = data.current;
        const forecast = data.forecast.forecastday[0].day;

        display.innerHTML = `
            <div style="background:#f0fdf4; padding:20px; border-radius:10px; border:1px solid #bbf7d0;">
                <h3 style="color:#166534;">${data.location.name}</h3>
                <h1 style="font-size:3.5rem; margin:10px 0;">${Math.round(current.temp_c)}°C</h1>
                <p><strong>Condition:</strong> ${current.condition.text}</p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:10px; font-size:0.9rem;">
                    <div>💧 Humidity: ${current.humidity}%</div>
                    <div>🌧️ Rain Chance: ${forecast.daily_chance_of_rain}%</div>
                </div>
            </div>
        `;
    } catch (error) {
        display.innerHTML = "<p style='color:red;'>Connection error. Check your internet.</p>";
    }
}

// --- 3. CROP DIAGNOSIS SYSTEM ---
const diagForm = document.getElementById('diagnosis-form');
if (diagForm) {
    diagForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const crop = document.getElementById('crop-name').value;
        const color = document.getElementById('leaf-color').value;
        const damage = document.getElementById('damage-type').value;
        const resultBox = document.getElementById('diagnosis-result');

        let diagnosis = "General stress";
        let advice = "Check soil moisture and look for small insects under the leaves.";

        if (color === "yellow" && crop === "maize") {
            diagnosis = "Nitrogen Deficiency";
            advice = "The soil is hungry. Add manure or NPK fertilizer.";
        } else if (color === "white-powder") {
            diagnosis = "Fungal Mildew";
            advice = "Remove sick leaves. Improve air flow between plants.";
        } else if (damage === "holes") {
            diagnosis = "Pest/Insect Attack";
            advice = "Insects are eating the leaves. Use neem oil or organic spray.";
        } else if (damage === "rot") {
            diagnosis = "Root Rot";
            advice = "Too much water. Stop watering and ensure water flows away.";
        }

        resultBox.classList.remove('hidden');
        resultBox.innerHTML = `
            <div style="background:#fffbeb; padding:20px; border-left:5px solid #d97706; margin-top:15px; border-radius:8px;">
                <h3 style="color:#92400e;">Issue: ${diagnosis}</h3>
                <p><strong>Advice:</strong> ${advice}</p>
            </div>
        `;
        resultBox.scrollIntoView({ behavior: 'smooth' });
    });
}

// --- 4. CONTACT PROFESSIONALS SYSTEM ---
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('farmer-name').value;
        const phone = document.getElementById('farmer-phone').value;
        const submitBtn = this.querySelector('button');

        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        setTimeout(() => {
            contactSuccess.classList.remove('hidden');
            contactSuccess.innerHTML = `✅ <strong>Success!</strong><br>Thank you ${name}. An expert will contact you at ${phone} very soon.`;
            contactForm.reset();
            submitBtn.innerText = "Send Message";
            submitBtn.disabled = false;
            contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    });
}

// Expert "Message" Buttons Logic
document.querySelectorAll('.btn-sm').forEach(btn => {
    btn.addEventListener('click', function() {
        const expertName = this.parentElement.querySelector('strong').innerText;
        const msgField = document.getElementById('farmer-msg');
        msgField.value = `Hello ${expertName}, I need help with my crops. `;
        document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
        msgField.focus();
    });
});
