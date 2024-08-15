<script>
  let email = '';
  let password = '';
  let confirmPassword = '';

  const handleSubmit = () => {
    if (password === confirmPassword) {
      // Call your registration API here
      console.log('Registering with:', { email, password });
    } else {
      alert('Passwords do not match');
    }
  };
</script>

<div class="min-h-screen bg-lime-200 flex items-center justify-center">
  <div class="w-full max-w-md p-6 bg-amber-200 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-center mb-6">Create Your Account</h2>
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700">Enter your Email</label>
      <input type="email" id="email" bind:value={email} placeholder="name@company.com" class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" required />
    </div>
    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700">Create a Password</label>
      <input type="password" id="password" bind:value={password} placeholder=" •••••••" class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" required />
    </div>
    <div class="mb-6">
      <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm your Password</label>
      <input type="password" id="confirm-password" bind:value={confirmPassword} placeholder=" •••••••" class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" required />
    </div>
    <button class="w-full py-2 px-4 bg-lime-300 text-gray-800 font-semibold rounded-md focus:outline-none focus:ring-2" on:click={handleSubmit}>Register</button>
    <div class="mt-4 text-center text-gray-600">
      <p>Already have an account? <a href="/profiles" class="text-blue-600 hover:underline">Login here</a></p>
    </div>
  </div>
</div>

<style>
  /* Additional Tailwind CSS styles for the container */
  .min-h-screen {
    min-height: 100vh;
  }
</style>

