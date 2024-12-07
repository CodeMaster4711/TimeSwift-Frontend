<script>
  let selectedGroup = '';
  let selectedUser = '';
  let groups = ['Group 1', 'Group 2', 'Group 3'];
  let users = ['User 1', 'User 2', 'User 3'];
</script>

<main>
  <h1>Admin Page</h1>

  <section>
    <h2>Group Management</h2>
    <label for="group-select">Select Group:</label>
    <select id="group-select" bind:value={selectedGroup}>
      <option value="" disabled selected>Select a group</option>
      {#each groups as group}
        <option value={group}>{group}</option>
      {/each}
    </select>
  </section>

  <section>
    <h2>User Management</h2>
    <label for="user-select">Select User:</label>
    <select id="user-select" bind:value={selectedUser}>
      <option value="" disabled selected>Select a user</option>
      {#each users as user}
        <option value={user}>{user}</option>
      {/each}
    </select>
  </section>

  <section>
    <h2>Other Settings</h2>
    <!-- Add other settings here -->
  </section>
</main>

<style>
  main {
    padding: 1rem;
  }
  section {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
</style>