<script>
	import { useProfile } from '$lib/states/profile.svelte.js';
	let profile = useProfile();
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

    let profileName = "";
    let targetWeightOrBodyfat = 70;
    let goalType = "weight";
    let targetCalories = 2000;

    onMount(async () => {
        profileName = await window.electron.invoke('get-temp-profile-name');
        console.log("profilename:", profileName);
        goalType = await window.electron.invoke('get-profile-goal-type', profileName);
        console.log("goalType:", goalType);
        if (goalType === "bodyfat") {
            targetWeightOrBodyfat = await window.electron.invoke('get-profile-goal-bodyfat', profileName);
            console.log("targetBodyfat", targetWeightOrBodyfat);
        } else {
            targetWeightOrBodyfat = await window.electron.invoke('get-profile-goal-weight', profileName);
            console.log("targetWeight:", targetWeightOrBodyfat);
        }
        targetCalories = await window.electron.invoke('get-profile-target-calories', profileName);
        console.log("targetCalories:", targetCalories);
    });
    const editGoals = async (e) => {
		e.preventDefault();
	    targetWeightOrBodyfat = parseFloat(targetWeightOrBodyfat);
	    targetCalories = parseInt(targetCalories);
        console.log("targetCalories:", targetCalories);
        console.log("targetWeight:", targetWeightOrBodyfat);
        console.log("goalType:", goalType);
        if (goalType === "bodyfat") {
            await window.electron.send('set-profile-goal-bodyfat', profileName, targetWeightOrBodyfat);
        } else {
            await window.electron.send('set-profile-goal-weight',profileName, targetWeightOrBodyfat);
        }
        await window.electron.send('set-profile-target-calories',profileName, targetCalories);
        await window.electron.send('set-profile-goal-type',profileName, goalType);
        
		await window.electron.send('close-modal');
    }
</script>


<form on:submit={editGoals}>
    <label for="targetWeight">Target goal: </label>
    <input id="targetWeight" name="" type="number" step="0.1" bind:value={targetWeightOrBodyfat}/>
    <br/>
    <p>Goal type:</p>
    <label for="bodyfat">bodyfat: </label>
    <input id="bodyfat" name="goal_type" type="radio" value="bodyfat" bind:group={goalType}/>
    <br/>
    <label for="weight">weight: </label>
    <input id="weight" name="goal_type" type="radio" value="weight" bind:group={goalType}/>
    <br/>
    <label for="targetCalories">Target calories:</label>
    <input id="targetCalories" type="number" bind:value={targetCalories}>
    <br/>
    <input type="submit" value="Save changes"/>
</form>