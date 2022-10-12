import Form from './src/index.vue'
import FormField from './src/field.vue'


Form.name = 'cvt-form'
Form.install = (app) => {
    app.component(Form.name, Form)
}

FormField.name = 'cvt-form-field'
FormField.install = (app) => {
    app.component(FormField.name, CFormField)
}

export const CvtFormField = FormField

export default Form