<script lang="ts">
	import { Alert, Button, Input, InputGroup, InputGroupText } from 'sveltestrap';
	import Fa from 'svelte-fa';
	import { faKey, faAt, faCheck } from '@fortawesome/free-solid-svg-icons';
	import { RegisterUserModel  } from '$lib/models/user/RegisterUserModel';
	import type { Session } from '@supabase/supabase-js';
	import { setSession } from '$lib/stores/UserStore';
	import { goto } from '$app/navigation';
	import { isNullOrEmpty } from '$lib/validation/strings';
	import { ErrorMessages } from '$lib/models/core/Messages';
	import { post } from '$lib/utils/ApiHelper';

	let registerUserModel: RegisterUserModel = new RegisterUserModel();
	let formHasError: boolean,
		loading: boolean = false;
	let errorMessage: string;

	const handleSubmit = async () => {
		formHasError = false;
		loading = true;

		try {
			var validation = registerUserModel.validate();

			if (!validation.success) {
				errorMessage = validation.message;
				formHasError = true;
				loading = false;
			} else {
				let response = await post<Session>('api/user/register', registerUserModel);
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
		<h1 class="margin-bottom-m">Register new user</h1>
		<form
			on:submit|preventDefault={handleSubmit}
			class="needs-validation"
			novalidate={!formHasError}
		>
			<InputGroup class="margin-bottom-m standard-input-height  has-validation">
				<InputGroupText><Fa icon={faAt} /></InputGroupText>
				<Input
					class="form-control"
					required={formHasError && isNullOrEmpty(registerUserModel.email)}
					bind:value={registerUserModel.email}
					placeholder="email"
				/>
			</InputGroup>
			<InputGroup class="margin-bottom-m standard-input-height  has-validation">
				<InputGroupText><Fa icon={faKey} /></InputGroupText>
				<Input
					class="form-control"
					required={formHasError && isNullOrEmpty(registerUserModel.password)}
					bind:value={registerUserModel.password}
					type="password"
					placeholder="password"
				/>
			</InputGroup>
            <InputGroup class="margin-bottom-m standard-input-height">
                <InputGroupText><Fa icon={faCheck} /></InputGroupText>
                <Input
                class="form-control"
                required={formHasError && isNullOrEmpty(registerUserModel.confirmPassword)}
                bind:value={registerUserModel.confirmPassword}
                type="password"
                placeholder="confirm password"
            />
            </InputGroup>
			<Button class="w-100 standard-input-height">
				{#if loading}
					<div class="spinner-border" role="status" />
				{:else}
					<span>Create account</span>
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