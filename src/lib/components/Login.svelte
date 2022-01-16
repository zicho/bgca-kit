<script lang="ts">
	import { Alert, Button, Input, InputGroup, InputGroupText } from 'sveltestrap';
	import Fa from 'svelte-fa';
	import { faKey, faAt } from '@fortawesome/free-solid-svg-icons';
	import { LoginUserModel } from '$lib/models/user/LoginUserModel';
	import type { Session } from '@supabase/supabase-js';
	import { setSession } from '$lib/stores/UserStore';
	import { goto } from '$app/navigation';
	import { isNullOrEmpty } from '$lib/validation/strings';
	import { ErrorMessages } from '$lib/models/core/Messages';
	import { post } from '$lib/utils/ApiHelper';

	let loginUserModel: LoginUserModel = new LoginUserModel();
	let formHasError: boolean,
		loading: boolean = false;
	let errorMessage: string;

	const handleSubmit = async () => {
		formHasError = false;
		loading = true;

		try {
			var validation = loginUserModel.validate();

			if (!validation.success) {
				errorMessage = validation.message;
				formHasError = true;
				loading = false;
			} else {
				let response = await post<Session>('api/user/login', loginUserModel);
				if (response.success) {
					setSession(response.data);
					goto('/');
				} else {
					errorMessage = response.message;
					formHasError = true;
					loading = false;
				}
			}
		} catch {
			errorMessage = ErrorMessages.GenericError;
			formHasError = true;
			loading = false;
		}
	};
</script>

<div class="row centered-form center-block margin-top-xxl">
	<div class="container col-md-10 col-lg-6 col-md-offset-2">
		<h1 class="margin-bottom-m">Sign in</h1>
		<form
			on:submit|preventDefault={handleSubmit}
			class="needs-validation"
			novalidate={!formHasError}
		>
			<InputGroup class="margin-bottom-m standard-input-height  has-validation">
				<InputGroupText><Fa icon={faAt} /></InputGroupText>
				<Input
					class="form-control"
					required={formHasError && isNullOrEmpty(loginUserModel.email)}
					bind:value={loginUserModel.email}
					placeholder="email"
				/>
			</InputGroup>
			<InputGroup class="margin-bottom-m standard-input-height  has-validation">
				<InputGroupText><Fa icon={faKey} /></InputGroupText>
				<Input
					class="form-control"
					required={formHasError && isNullOrEmpty(loginUserModel.password)}
					bind:value={loginUserModel.password}
					type="password"
					placeholder="password"
				/>
			</InputGroup>
			<Button class="w-100 standard-input-height">
				{#if loading}
					<div class="spinner-border" role="status" />
				{:else}
					<span>Login</span>
				{/if}
			</Button>
		</form>

		{#if formHasError}
			<Alert color="danger" class="margin-top-l">
				{errorMessage}
			</Alert>
		{/if}
	</div>
</div>
