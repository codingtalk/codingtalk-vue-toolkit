import { reactive } from "vue"

export const refUtil = () => {
	const _refMap = reactive(new Map());
	return {
		_refMap,
		storeRef: (el) => {
			if (el && el.$attrs['ref-key']) {
				_refMap.set(el.$attrs['ref-key'], el);
			}
		},
		getRef: (k) => {
			return _refMap.get(k);
		}
	}
}