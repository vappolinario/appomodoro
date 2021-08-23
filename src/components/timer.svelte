<script>
	import Progress from './progress.svelte';
	import Button from '@smui/button';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const totalSeconds = 25 * 60;
	let secondsLeft = totalSeconds;
	let isRunning = false;
	let timer;
	let timerIteration = 1;

	$: progress = 1 - secondsLeft / (totalSeconds * getTimerFactor());
	$: minutes = '' + Math.trunc(secondsLeft / 60);
	$: seconds = '' + (secondsLeft % 60);

	function resetTimer() {
		clearInterval(timer);
		secondsLeft = totalSeconds * getTimerFactor();
		isRunning = false;
	}

	function startTimer() {
		isRunning = true;
		timer = setInterval(() => {
			secondsLeft -= 1;
			if (secondsLeft == 0) {
				fireTimerEvent();
				timerIteration += 1;
				resetTimer();
			}
		}, 1000);
	}

	function getTimerFactor() {
		if (timerIteration % 8 == 0) return 0.6;
		if (timerIteration % 2 == 0) return 0.2;
		return 1;
	}

	function fireTimerEvent() {
		const onBreak = getTimerFactor() != 1;
		dispatch('timerElapsed', {
			iteration: timerIteration,
			duration: totalSeconds * getTimerFactor(),
			onBreak: onBreak
		});
	}
</script>

<div style="text-align: center;">
	<h4>{minutes.padStart(2, '0')}:{seconds.padStart(2, '0')}</h4>
	<Progress {progress} />
	<br />
	<Button type="submit" on:click={startTimer} disabled={isRunning}>Start</Button>
	<Button type="submit" on:click={resetTimer} disabled={!isRunning}>Reset</Button>
</div>
