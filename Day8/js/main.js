// Switch between forms
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const toLogin = document.getElementById('toLogin');
const toRegister = document.getElementById('toRegister');

toLogin.onclick = (e) => {
  e.preventDefault();
  registerForm.classList.remove('active');
  loginForm.classList.add('active');
};
toRegister.onclick = (e) => {
  e.preventDefault();
  loginForm.classList.remove('active');
  registerForm.classList.add('active');
};

// Register validation
registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;
  clearErrors(registerForm);

  const email = document.getElementById('regEmail');
  const password = document.getElementById('regPassword');
  const confirmPassword = document.getElementById('regConfirmPassword');

  if (!email.value.trim()) {
    setError(email, 'Email is required');
    valid = false;
  } else if (!validateEmail(email.value.trim())) {
    setError(email, 'Email is invalid');
    valid = false;
  }
  if (!password.value.trim()) {
    setError(password, 'Password is required');
    valid = false;
  } else if (password.value.length < 6) {
    setError(password, 'Password must be at least 6 characters');
    valid = false;
  }
  if (!confirmPassword.value.trim()) {
    setError(confirmPassword, 'Please confirm your password');
    valid = false;
  } else if (password.value !== confirmPassword.value) {
    setError(confirmPassword, 'Passwords do not match');
    valid = false;
  }

  if (valid) {
    alert('Đăng ký thành công!');
    registerForm.reset();
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
  }
});

// Login validation
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;
  clearErrors(loginForm);

  const email = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');

  if (!email.value.trim()) {
    setError(email, 'Email is required');
    valid = false;
  } else if (!validateEmail(email.value.trim())) {
    setError(email, 'Email is invalid');
    valid = false;
  }
  if (!password.value.trim()) {
    setError(password, 'Password is required');
    valid = false;
  }

  if (valid) {
    alert('Đăng nhập thành công!');
    loginForm.reset();
  }
});

// Helper functions
function setError(input, message) {
  const group = input.parentElement;
  const error = group.querySelector('.error');
  error.textContent = message;
  error.style.display = 'block';
}
function clearErrors(form) {
  form.querySelectorAll('.error').forEach(el => {
    el.textContent = '';
    el.style.display = 'none';
  });
}
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}