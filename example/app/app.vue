<template>Please open the console view</template>
<script>
	export default {
		computed: {
			core() {
				return this.$core;
			},
			registry() {
				return this.$registry;
			},
			variable() {
				return this.$variable;
			},
			process() {
				return this.$process;
			},
			module() {
				return this.$module;
			},
			session() {
				return this.$session;
			},
		},
		data() {
			return {};
		},
		created() {
			console.log(this.core);
		},
	};
</script>