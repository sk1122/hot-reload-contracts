interface IProps {
	functions: any;
	change_inputs: Function;
	execute_function: Function;
}

const Functions = ({ functions, change_inputs, execute_function }: IProps) => {
	return (
		<>
			{functions.map((f: any) => (
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
					<button
						onClick={() =>
							execute_function(
								f.name,
								f.inputs.map((i: any) =>
									i.name ? i.name : i.internalType
								)
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
