const search = document.querySelector('.search');
const city = document.querySelector('.city');
const country = document.querySelector('.country');
const nhietdo = document.querySelector('.nhietdo');
const weatherDesc = document.querySelector('.weather-desc');
const humidityValue = document.querySelector('.humidity .value');
const windValue = document.querySelector('.wind .value');

// Sử dụng Open-Meteo API - miễn phí, không cần API key
// API: https://open-meteo.com/en/docs
// Geocoding API để tìm tọa độ: https://geocoding-api.open-meteo.com/v1/search

// Hàm lấy tọa độ từ tên thành phố
async function getCoordinates(cityName) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            return {
                latitude: data.results[0].latitude,
                longitude: data.results[0].longitude,
                name: data.results[0].name,
                country: data.results[0].country
            };
        } else {
            throw new Error('Không tìm thấy thành phố');
        }
    } catch (error) {
        console.error('Lỗi khi lấy tọa độ:', error);
        throw error;
    }
}

// Hàm lấy thông tin thời tiết từ Open-Meteo
async function getWeatherData(latitude, longitude) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m&timezone=auto`);
        const data = await response.json();
        
        if (data.current) {
            return {
                name: data.name || 'Unknown',
                sys: { country: data.country || 'Unknown' },
                main: { 
                    temp: data.current.temperature_2m,
                    humidity: data.current.relative_humidity_2m
                },
                weather: [{ 
                    description: getWeatherDescription(data.current.weather_code)
                }],
                wind: { 
                    speed: data.current.wind_speed_10m / 3.6 // Chuyển từ km/h sang m/s để tương thích
                }
            };
        } else {
            throw new Error('Không lấy được dữ liệu thời tiết');
        }
    } catch (error) {
        console.error('Lỗi khi lấy thời tiết:', error);
        throw error;
    }
}

// Hàm chuyển đổi weather code thành mô tả
function getWeatherDescription(code) {
    const weatherCodes = {
        0: 'clear sky',
        1: 'mainly clear',
        2: 'partly cloudy',
        3: 'overcast',
        45: 'foggy',
        48: 'depositing rime fog',
        51: 'light drizzle',
        53: 'moderate drizzle',
        55: 'dense drizzle',
        61: 'slight rain',
        63: 'moderate rain',
        65: 'heavy rain',
        71: 'slight snow',
        73: 'moderate snow',
        75: 'heavy snow',
        77: 'snow grains',
        80: 'slight rain showers',
        81: 'moderate rain showers',
        82: 'violent rain showers',
        85: 'slight snow showers',
        86: 'heavy snow showers',
        95: 'thunderstorm',
        96: 'thunderstorm with slight hail',
        99: 'thunderstorm with heavy hail'
    };
    return weatherCodes[code] || 'unknown';
}

// Hàm xác định mùa dựa trên tháng
function getSeason() {
    const month = new Date().getMonth() + 1; // getMonth() trả về 0-11
    
    if (month >= 3 && month <= 5) {
        return 'spring'; // Mùa xuân: tháng 3-5
    } else if (month >= 6 && month <= 8) {
        return 'summer'; // Mùa hè: tháng 6-8
    } else if (month >= 9 && month <= 11) {
        return 'autumn'; // Mùa thu: tháng 9-11
    } else {
        return 'winter'; // Mùa đông: tháng 12, 1, 2
    }
}

// Hàm lấy thông tin thời tiết chính
async function getWeather(cityName) {
    try {
        // Lấy tọa độ từ tên thành phố
        const coords = await getCoordinates(cityName);
        
        // Lấy thông tin thời tiết từ tọa độ
        const weatherData = await getWeatherData(coords.latitude, coords.longitude);
        
        // Cập nhật tên thành phố và quốc gia
        weatherData.name = coords.name;
        weatherData.sys.country = coords.country;

        displayWeather(weatherData);
        
    } catch (error) {
        alert('Không tìm thấy thành phố hoặc có lỗi xảy ra. Vui lòng thử lại!');
    }
}

// Hàm hiển thị thông tin thời tiết
function displayWeather(data) {
    city.textContent = data.name;
    country.textContent = data.sys.country;
    nhietdo.textContent = Math.round(data.main.temp) + '°C';
    weatherDesc.textContent = data.weather[0].description;
    humidityValue.textContent = data.main.humidity + '%';
    windValue.textContent = Math.round(data.wind.speed * 3.6) + ' km/h'; // Chuyển từ m/s sang km/h
    
    // Thay đổi background theo mùa
    const season = getSeason();
    const body = document.body;
    
    switch(season) {
        case 'spring':
            body.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(assets/img/warm.jpg) no-repeat center center / cover`;
            break;
        case 'summer':
            body.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(assets/img/hot.png) no-repeat center center / cover`;
            break;
        case 'autumn':
            body.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(assets/img/cool.jpg) no-repeat center center / cover`;
            break;
        case 'winter':
            body.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(assets/img/cold.png) no-repeat center center / cover`;
            break;
        default:
            body.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(assets/img/cool.jpg) no-repeat center center / cover`;
    }
}

// Hàm test ảnh ngay khi load trang
function setInitialBackground() {
    const season = getSeason();
    const body = document.body;
    
    switch(season) {
        case 'spring':
            body.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(assets/img/warm.jpg) no-repeat center center / cover`;
            break;
        case 'summer':
            body.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(assets/img/hot.png) no-repeat center center / cover`;
            break;
        case 'autumn':
            body.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(assets/img/cool.jpg) no-repeat center center / cover`;
            break;
        case 'winter':
            body.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(assets/img/cold.png) no-repeat center center / cover`;
            break;
        default:
            body.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(assets/img/cool.jpg) no-repeat center center / cover`;
    }
}

// Xử lý sự kiện search
search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cityName = search.value.trim();
        if (cityName) {
            getWeather(cityName);
        }
    }
});

// Xử lý sự kiện focus để xóa placeholder
search.addEventListener('focus', () => {
    search.placeholder = '';
});

// Xử lý sự kiện blur để thêm lại placeholder
search.addEventListener('blur', () => {
    search.placeholder = 'Nhập tên thành phố...';
});

// Thêm placeholder mặc định
search.placeholder = 'Nhập tên thành phố...';

// Set background ngay khi load trang
setInitialBackground();
