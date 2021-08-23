<script>
	import Timer from './timer.svelte';
	import Task from './task.svelte';
	import { nanoid } from 'nanoid';

	import Button from '@smui/button';
	import DataTable, { Head, Body, Cell } from '@smui/data-table';
	import Textfield from '@smui/textfield';

	let tasks = [];
	let newTaskName = '';
	let currentTask;

	function addTask() {
		if (newTaskName === '') return;
		tasks = [
			...tasks,
			{
				id: nanoid(5),
				name: newTaskName,
				current: false,
				iterations: 0,
				duration: 0
			}
		];
		newTaskName = '';
	}

	function currentTaskChanged({ detail }) {
		currentTask = detail;
		tasks.map((t) => {
			if (t.id != detail.id) t.current = false;
		});
		tasks = tasks;
	}

	function taskRemoved({ detail }) {
		tasks = tasks.filter((t) => t.id != detail.id);
		if (!currentTask || currentTask.id == detail.id) currentTask = undefined;
	}

	function timerElapsed({ detail }) {
		if (currentTask === undefined || detail.onBreak) return;

		currentTask.duration += timerElapsed;
		currentTask.iterations += 1;
		tasks = tasks;
	}
</script>

<Timer on:timerElapsed={timerElapsed} task={currentTask} />

<div style="text-align: center;">
	<h4 style="margin-bottom: 0;">Tasks</h4>
	<div style="columns margins">
		<Textfield style="width: 60% ;" label="New task" bind:value={newTaskName} />
		<Button type="submit" on:click={addTask} disabled={newTaskName === ''}>Add</Button>
	</div>
</div>
<br />
<DataTable table$aria-label="Tasks" style="width: 100%;">
	<Head>
		<Cell>Name</Cell>
		<Cell>Iterations</Cell>
		<Cell />
		<Cell />
	</Head>
	<Body>
		{#each tasks as task}
			<Task {task} on:taskChange={currentTaskChanged} on:taskRemove={taskRemoved} />
		{/each}
	</Body>
</DataTable>
