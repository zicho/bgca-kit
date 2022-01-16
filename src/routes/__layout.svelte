<script lang="ts" context="module">
	export async function load({ session, url }) {
		let path: string = url.pathname;
		let publicRoutes: string[] = ['/about'];
		let nonAuthedRoutes: string[] = ['/login', '/register'];

		let authed = false;

		// console.dir(session)

		// Object.keys(session).length != 0

		if (!session) {
			if (publicRoutes.includes(path) || nonAuthedRoutes.includes(path)) {
				return {
					status: 200
				};
			} else
				return {
					status: 302,
					redirect: '/login'
				};
		} else {
			if (nonAuthedRoutes.includes(path)) {
				return {
					status: 302,
					redirect: '/'
				};
			}

			return {
				status: 200
			};
		}
	}
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import { logout } from '$lib/stores/UserStore';

	import {
		Collapse,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem
	} from 'sveltestrap';
	import '../app.css';

	let isOpen = false;

	function handleUpdate() {
		isOpen = !isOpen;
	}

	async function onLogoutClicked() {
		const res = await fetch('/api/user/logout', {
			method: 'POST'
		}).finally(() => logout());
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
	/>
</svelte:head>

<Navbar class="margin-bottom-l" color="dark" dark expand="md">
	<NavbarBrand href="/">sveltestrap</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav class="ms-auto" navbar>
			{#if $session}
				<NavItem>
					<NavLink on:click={onLogoutClicked}>Sign out</NavLink>
				</NavItem>
			{:else}
				<NavItem>
					<NavLink href="login">Sign in</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="register">Register</NavLink>
				</NavItem>
			{/if}
			<!-- <Dropdown nav inNavbar>
          <DropdownToggle nav caret>Options</DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Reset</DropdownItem>
          </DropdownMenu>
        </Dropdown> -->
		</Nav>
	</Collapse>
</Navbar>

<div id="app" class="container">
	<slot />
</div>
