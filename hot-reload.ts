import { watch } from 'chokidar'

watch('.', {
	ignored: 'node_modules/',
	ignoreInitial: true
})
.on('change', (path) => {
	console.log("change -> ", path)
})
.on('add', (path, x) => {
	console.log("add -> ", path)
})

const supported_file_ext: string[] = ['sol', 'rs']
const compile_contract_file_ext: any = {
	'sol': compile_sol,
	'rs': compile_rs
}

const detect_files = (file_name: string) => {
	const file_ext = file_name.split('.').pop()

	if(supported_file_ext.includes(file_ext)) {
		const func = compile_contract_file_ext[file_ext]

		func().then(res => console.log("compiled all contracts")
	}
}
