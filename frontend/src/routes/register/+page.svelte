<script>
// @ts-nocheck
import{onMount}from "svelte"
 let message="";
 onMount(() => {
    const registerSuccess = localStorage.getItem('registerSuccess');
    if (registerSuccess) {
    message='Registered successfully! Please Login'
      localStorage.removeItem('registerSuccess'); // Clear the flag
    }
  });

  // @ts-ignore
  const handleRegister = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        message= 
          'Registration successful! Redirecting to login...'
        setTimeout(() => {
          localStorage.setItem('registerSuccess', 'true'); // Set the flag
          window.location.href = '/login';
        }, 2000); // Redirect after 1 second
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || 'Registration failed due to an unknown error.';
        message =`Registration failed: ${errorMessage}`
      }
    } catch (error) {
      console.error('Registration error:', error);
      // @ts-ignore
      const errorMessage = error.message || 'An unexpected error occurred.';
      message =`An error occurred: ${errorMessage}`
    }
  };
</script>

<div class="min-h-screen bg-lime-200 flex items-center justify-center">
  <div class="w-full max-w-md p-6 bg-amber-200 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-center mb-6">Create Your Account</h2>
    <form on:submit|preventDefault={handleRegister}>
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700">Enter your Email</label>
      <input type="email" id="email" name="email" placeholder="name@company.com" class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" required />
    </div>
    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700">Create a Password</label>
      <input type="password" id="password" name="password" placeholder=" •••••••" class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" required />
    </div>
  
    <button class="w-full py-2 px-4 bg-lime-300 text-gray-800 font-semibold rounded-md focus:outline-none focus:ring-2">Register</button>
    <div class="mt-4 text-center text-blue-600">
      <p> {message}</p>
    </div>
    <div class="mt-4 text-center text-gray-600">
      <p>Already have an account? <a href="/profiles" class="text-blue-600 hover:underline">Login here</a></p>
    </div>
    </form>
  </div>
</div>

<style>
  /* Additional Tailwind CSS styles for the container */
  .min-h-screen {
    min-height: 100vh;
  }
</style>

