<script>
    import Timer from "../components/timer.svelte";
    import TaskList from "../components/taskList.svelte";

    $: task = {};

    function currentTaskChanged({ detail }) {
        task = detail;
        console.log(task, "index task");
    }
</script>
<svelte:head>
	<title>Appomodoro</title>
</svelte:head>
<h1>Appomodoro</h1>
<Timer {task} />
<TaskList on:currentTask={currentTaskChanged} />
