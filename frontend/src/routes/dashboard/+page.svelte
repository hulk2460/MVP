<script>
// @ts-nocheck

  import { authStore } from '$lib/stores/authStores';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';

  let activePage = 'dashboard';
  let showPolicyOptions = false;
  let showClaimOptions = false;
  let policies = [];
  let claims = [];
  let selectedClaim = null;
  let message = '';
  
  let policyNumber = '';
  let provider = '';
  let coverageDetails = '';

  const { userId, token } = get(authStore);
  let policyId = '';
  let claimDetails = '';
  let digitalBills = '';
  let updateHistoryInput = ''; // This will hold the comma-separated string input

  async function submitClaim() {
    try {
      const updateHistory = updateHistoryInput.split(',').map(item => item.trim()); // Convert string to array
      
      const response = await fetch('http://localhost:3000/claims/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          policyId,
          claimDetails,
          digitalBills,
          updateHistory
        })
      });

      if (response.ok) {
        const result = await response.json();
        message = result.message || 'Claim submitted successfully';
        
        // After displaying the message, redirect to viewClaimStatus page
        setTimeout(() => {
          activePage = 'viewClaimStatus';
        }, 2000); // Wait 2 seconds before redirecting
      } else {
        throw new Error('Failed to submit claim');
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
      message = `Error submitting claim ${error}`;
    }
  }

  async function fetchClaims() {
    try {
      const url = new URL(`http://localhost:3000/claims/all?userId=${userId}`);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Ensure the response has a claims array and assign it
        if (data && Array.isArray(data.claims)) {
          claims = data.claims;
        } else {
          throw new Error('Invalid data structure');
        }
      } else {
        throw new Error('Failed to fetch claims');
      }
    } catch (error) {
      console.error('Error fetching claims:', error);
      claims = []; // Fallback to empty array on error
    }
  }

  // Fetch claims when the activePage is 'viewClaimStatus'
  $: if (activePage === 'viewClaimStatus') {
    fetchClaims();
  }


  async function fetchPolicies() {
    try {
      const response = await fetch(`http://localhost:3000/policy/get?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        policies=data.policies
        console.log(policies)
      } else {
        throw new Error('Failed to fetch policies');
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  }

  async function addPolicy(event) {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/policy/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          policyNumber: policyNumber,
          provider,
          coverageDetails,
        })
      });

      if (response.ok) {
        message = 'Policy added successfully!';
        await fetchPolicies(); // Refresh the policy list
        activePage = 'viewPolicies';
      } else {
        const errorResponse = await response.json();
        message = `Error: ${errorResponse.message}`;
      }
    } catch (error) {
      console.error('Error adding policy:', error);
      message = 'An error occurred while adding the policy.';
    }
  }

  // Fetch policies when the component is mounted
  onMount(() => {
    fetchPolicies();
  });

  function viewClaimDetails(claim) {
    selectedClaim = claim;
    activePage = 'claimDetails';
  }

</script>

<div class="min-h-screen flex flex-col">
  <header class="bg-yellow-300 text-slate-950 p-4">
    <nav class="container mx-auto flex justify-between">
      <div class="text-xl font-bold">Insurance Dashboard</div>
      <ul class="flex space-x-4">
        <li>
          <a href="#" class="hover:underline" on:click={() => { activePage = 'dashboard'; showPolicyOptions = false; showClaimOptions = false; }}>Dashboard</a>
        </li>
        <li>
          <div>
            <a href="#" class="hover:underline" on:click={() => { showPolicyOptions = !showPolicyOptions; showClaimOptions = false; }}>Policy Management</a>
            {#if showPolicyOptions}
              <ul class="mt-2 bg-white text-black border rounded shadow-lg absolute">
                <li><a href="#" class="block px-4 py-2" on:click={() => activePage = 'viewPolicies'}>View Policies</a></li>
                <li><a href="#" class="block px-4 py-2" on:click={() => activePage = 'addPolicy'}>Add Policy</a></li>
              </ul>
            {/if}
          </div>
        </li>
        <li>
          <div>
            <a href="#" class="hover:underline" on:click={() => { showClaimOptions = !showClaimOptions; showPolicyOptions = false; }}>Claims</a>
            {#if showClaimOptions}
              <ul class="mt-2 bg-white text-black border rounded shadow-lg absolute">
                <li><a href="#" class="block px-4 py-2" on:click={() => activePage = 'submitClaim'}>Submit Claim</a></li>
                <li><a href="#" class="block px-4 py-2" on:click={() => activePage = 'viewClaimStatus'}>View All Claim</a></li>
                <li><a href="#" class="block px-4 py-2" on:click={() => activePage = 'claimDetails'}>Claim Details</a></li>
              </ul>
            {/if}
          </div>
        </li>
        <li><a href="#" class="hover:underline" on:click={() => activePage = 'accountSettings'}>Account Settings</a></li>
      </ul>
    </nav>
  </header>

  <main class="flex-1 p-4">
    {#if activePage === 'dashboard'}
      <section>
        <h1 class="text-2xl font-bold mb-4">Advertisement</h1>
        <!-- Add your advertisement text here -->
      </section>
    {/if}

    {#if activePage === 'viewPolicies'}
      <section>
        <h1 class="text-2xl font-bold mb-4">Your Policies</h1>
        <ul>
          {#each policies as policy}
            <li class="border p-4 mb-4">
              <div class="font-bold">Policy Number: {policy.policyNumber}</div>
              <div>Provider: {policy.provider}</div>
              <div>Coverage: {policy.coverageDetails}</div>
              <button class="bg-blue-500 text-white px-4 py-2 mt-2">View Details</button>
            </li>
          {/each}
        </ul>
        {#if message}
          <div class="text-green-500 mt-4">{message}</div>
        {/if}
      </section>
    {/if}

    {#if activePage === 'addPolicy'}
      <section>
        <h1 class="text-2xl font-bold mb-4">Add a New Policy</h1>
        <form class="space-y-4" on:submit={addPolicy}>
          <div>
            <label class="block">Policy Number</label>
            <input type="text" class="border p-2 w-full" bind:value={policyNumber} placeholder="Policy Number" />
          </div>
          <div>
            <label class="block">Provider</label>
            <input type="text" class="border p-2 w-full" bind:value={provider} placeholder="Provider" />
          </div>
          <div>
            <label class="block">Coverage Details</label>
            <input type="text" class="border p-2 w-full" bind:value={coverageDetails} placeholder="Coverage Details" />
          </div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2">Add Policy</button>
        </form>
        {#if message}
          <div class="text-green-500 mt-4">{message}</div>
        {/if}
      </section>
    {/if}

    {#if activePage === 'submitClaim'}
  <section>
    <h1 class="text-2xl font-bold mb-4">Submit a New Claim</h1>
    <form class="space-y-4" on:submit|preventDefault={submitClaim}>
      <div>
        <label class="block">Policy ID</label>
        <input type="text" class="border p-2 w-full" bind:value={policyId} placeholder="Policy ID" />
      </div>
      <div>
        <label class="block">Claim Details</label>
        <input type="text" class="border p-2 w-full" bind:value={claimDetails} placeholder="Claim Details" />
      </div>
      <div>
        <label class="block">Attach Digital Bills (URL)</label>
        <input type="text" class="border p-2 w-full" bind:value={digitalBills} placeholder="Digital Bills URL" />
      </div>
      <div>
        <label class="block">Update History (Comma Separated)</label>
        <input type="text" class="border p-2 w-full" bind:value={updateHistoryInput} placeholder="Update History" />
      </div>
      {#if message}
        <div class="text-green-500">{message}</div>
      {/if}
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Submit Claim</button>
    </form>
  </section>
{/if}


    {#if activePage === 'viewClaimStatus'}
  <section>
    <h1 class="text-2xl font-bold mb-4">Your Claims</h1>
    <ul>
      {#each claims as claim}
        <li class="border p-4 mb-4">
          <div class="font-bold">Claim ID: {claim.id}</div>
          <div>Claim Details: {claim.claimDetails}</div>
          <div>Status: {claim.status}</div>
	 <div>Creation at: {claim.createdAt}</div>
          <button class="bg-blue-500 text-white px-4 py-2 mt-2" on:click={() => viewClaimDetails(claim)}>View Details</button>
        </li>
      {/each}
    </ul>
  </section>
{/if}


    {#if activePage === 'claimDetails'}
    <section>
      <h1 class="text-2xl font-bold mb-4">Claim Details</h1>
      <ul>
        {#each claims as claim (claim.id)}
          <li class="border p-4 mb-4">
            <div class="font-bold">Claim ID: {claim.id}</div>
            <div>Status: {claim.status}</div>
            <div>Details: {claim.provider}</div>
            <div>Update History: {claim.coverage}</div>
          </li>
        {/each}
      </ul>
    </section>
    {/if}

    {#if activePage === 'accountSettings'}
      <section>
        <h1 class="text-2xl font-bold mb-4">Account Settings</h1>
        <!-- Add your Account Settings content here -->
      </section>
    {/if}
  </main>
</div>
