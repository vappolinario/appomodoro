<script>
    import Progress from "./progress.svelte";

    const totalSeconds = 25*60;
    let secondsLeft =  totalSeconds;
    let isRunning = false;
    let timer;
    let timerIteration = 1;

    $: progress = (1-(secondsLeft/(totalSeconds*getTimerFactor()))) * 100;
    $: minutes = "" + Math.trunc(secondsLeft/60);
    $: seconds = "" + secondsLeft%60;

    function resetTimer() {
        clearInterval(timer)
        secondsLeft = totalSeconds*getTimerFactor();
        isRunning=false;
    }

    function startTimer() {
        isRunning = true;
        timer = setInterval(() => {
            secondsLeft -= 1;
            if (secondsLeft == 0) {
                timerIteration+=1;
                resetTimer();
            }
        }, 1000);
    }

    function getTimerFactor() {
        if ( timerIteration % 8 == 0 )
            return 0.6;
        if ( timerIteration % 2 == 0 )
            return 0.2;
        return 1;
    }
</script>

<div>
    <h2 >Remaining time: {minutes.padStart(2, '0')}:{seconds.padStart(2, '0')}</h2>
</div>
<Progress {progress}/>

<button type="submit" on:click={startTimer} disabled={isRunning}>Start</button>
<button type="submit" on:click={resetTimer} disabled={!isRunning}>Reset</button>
