import Step from './src/index.vue'

Step.install = (app) => {
	app.component(Step.name, Step)
}

export default Step