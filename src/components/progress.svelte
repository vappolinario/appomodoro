<script>
	export let progress = 20;
</script>

<div>
	<div class="progress-container">
		<div class="progress-bar" style="width: {progress}%;" />
	</div>
</div>

<style>
	.progress-container {
		margin: 20px 0;
		border: solid #f6f6f6;
	}
	.progress-bar {
		height: 30px;
		background-color: #ccffcc;
	}
</style>
