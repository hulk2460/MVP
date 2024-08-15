<script lang="ts">
  let username = 'John Doe';
  let email = 'johndoe@example.com';
  let password = '';
  let newPassword = '';
  let confirmPassword = '';

  function updateProfile() {
    // Implement profile update logic here
    alert('Profile updated!');
  }

  function updatePassword() {
    // Implement password update logic here
    if (newPassword === confirmPassword) {
      alert('Password updated!');
    } else {
      alert('Passwords do not match!');
    }
  }
</script>

<div class="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
  <h2 class="text-2xl font-bold mb-6">Account Settings</h2>
  
  <!-- Profile Section -->
  <div class="mb-6">
    <h3 class="text-xl font-semibold mb-4">Profile Information</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" bind:value={username} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" bind:value={email} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
    </div>
    <button on:click={updateProfile} class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update Profile</button>
  </div>
  
  <!-- Password Section -->
  <div>
    <h3 class="text-xl font-semibold mb-4">Change Password</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="block text-sm font-medium text-gray-700">Current Password</label>
        <input type="password" bind:value={password} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="block text-sm font-medium text-gray-700">New Password</label>
        <input type="password" bind:value={newPassword} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
        <input type="password" bind:value={confirmPassword} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
    </div>
    <button on:click={updatePassword} class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update Password</button>
  </div>
</div>

<style>
  .cursor-pointer:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>
