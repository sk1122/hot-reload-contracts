import { useEffect } from "react";

interface IProps {
	functions: any;
	change_inputs: Function;
	execute_function: Function;
}

const Functions = ({ functions, change_inputs, execute_function }: IProps) => {
	// useEffect(() => console.log('functions -> ', functions), [functions])

	const parse_result = (type: any, value: any, output: any) => {
		console.log(type.startsWith('enum'))
		
		if(!type || !value || !output) return
		
		if(type === 'uint256') {
			return value.toString()
		} else if (type === 'uint8') {
			return value
		} else if (type === 'bool') {
			return value
		} else if (type === 'string') {
			return value
		} else if (type === 'bytes') {
			return value.toString()
		} else if (type === 'address') {
			return value.toString()
		} else if (type === 'tuple') {
			return JSON.stringify(value)
		} else if (type.includes('enum')) {
			return value
		} else if (type.includes('struct')) {
			let parsed_result: any = []
			const components = output.components
			
			if(components.length > 0) {
				for(let i = 0; i < value.length; i++) {
					for(let j = 0; j < components.length; j++) {
						console.log(`${components[j].internalType} && ${value[i][components[j].name]} -> ${parse_result(components[j].internalType, value[i][components[j].name], output)}`)
					}
				}
			}

			// console.log(parsed_result, "parsed_result")			
		}
	}

	return (
		<>
			{functions.map((f: any, idx: number) => (
				<div className="w-1/2 border-2 p-2 rounded-xl border-slate-700 flex flex-col justify-start items-start space-y-4">
					<h3 className="text-xl font-semibold">{f.name}</h3>
					{f.inputs.length > 0 && (
						<div className="flex flex-col justify-center items-start ml-5">
							<h4 className="text-md">Inputs</h4>
							{f.inputs.map((input: any) => (
								<div className="ml-3">
									<label htmlFor={input.internalType}>
										{input.name
											? input.name
											: input.internalType}
									</label>{" "}
									&rarr;{" "}
									<input
										onChange={(e: any) =>
											change_inputs(
												f.name,
												input.name
													? input.name
													: input.internalType,
												e.target.value
											)
										}
										name={input.internalType}
										type="text"
										placeholder={
											input.name
												? `${input.name} (${input.internalType})`
												: input.internalType
										}
										className="border-2 p-1"
									/>
								</div>
							))}
						</div>
					)}
					{f.outputs.length > 0 && 
						f.outputs.map((output: any) => {
							if(output.result) {
								return (
									<div>	
										{output.internalType === 'uint256' && <span>{output.result.toString()}</span>}
										{output.internalType === 'uint8' && <span>{output.result}</span>}
										{output.internalType === 'bool' && <span>{output.result}</span>}
										{output.internalType === 'string' && <span>{output.result}</span>}
										{output.internalType === 'bytes' && <span>{output.result.toString()}</span>}
										{output.internalType === 'address' && <span>{output.result.toString()}</span>}
										{output.internalType === 'tuple' && <span>{JSON.stringify(output.result)}</span>}
										{output.internalType.startsWith('struct') && parse_result(output.internalType, output.result, output)}
									</div>
								)
							}
						})
					}
					<button
						onClick={() =>
							execute_function(
								f.name,
								f.inputs.map((i: any) =>
									i.name ? i.name : i.internalType
								),
								idx
							)
						}
						className="text-white p-2 text-sm bg-slate-500 rounded-lg"
					>
						Call Function
					</button>
				</div>
			))}
		</>
	);
};

export default Functions;
