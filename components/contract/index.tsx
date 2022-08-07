import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { promises } from "fs";
import { resolve, join } from "path";
import { useEffect, useState } from "react";
import WalletConnect from "../ConnectWallet";
import Functions from "./Functions";
import { useAccount, useContract, useSigner } from "wagmi";

interface IProps {
	contract_name: string;
	address: string;
	abi: object[];
}

const Contract = ({ contract_name, address, abi }: IProps) => {
	const [inputs, setInputs] = useState<{ [key: string]: any }>({});
	const [contract, setContract] = useState("");
	const [functions, setFunctions] = useState<any>([]);
	const [constructor, setConstructor] = useState<any>({});

	const { data: signer, isError, isLoading } = useSigner();

	const evmContract = useContract({
		addressOrName: address,
		contractInterface: abi,
		signerOrProvider: signer,
	});

	const change_inputs = (
		function_name: string,
		input_name: string,
		value: string
	) => {
		setInputs((input: any) => {
			try {
				let function_val = input[function_name];

				let val = {
					...input,
					[function_name]: {
						...function_val,
						[input_name]: value,
					},
				};

				return val;
			} catch (e) {
				let val = {
					...input,
					[function_name]: {
						[input_name]: value,
					},
				};

				return val;
			}
		});
	};

	const parse_functions_from_abi = (abi: any) => {
		const functions = [];
		for (let i = 0; i < abi.length; i++) {
			if (abi[i].type === "function") {
				functions.push(abi[i]);
			}
		}

		return functions;
	};

	const parse_constructor_from_abi = (abi: any) => {
		for (let i = 0; i < abi.length; i++) {
			if (abi[i].type === "constructor") {
				return abi[i];
			}
		}
	};

	const execute_function = (function_name: string, input_list: string[]) => {
		const values = inputs[function_name];

		const value_list = [];

		for (let i = 0; i < input_list.length; i++) {
			value_list.push(values[input_list[i]]);
		}
	};

	useEffect(() => {
		const functions = parse_functions_from_abi(abi);
		setFunctions(functions);
	}, [abi]);

	useEffect(() => {
		const constructor = parse_constructor_from_abi(abi);
		console.log(constructor);
		setConstructor(constructor);
	}, [abi]);

	return (
		<main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
			<h1 className="text-3xl font-bold">{contract_name}</h1>
			<div className="flex flex-col justify-center items-center space-y-6 w-full">
				{constructor && (
					<div className="w-1/2 border-2 p-2 rounded-xl border-slate-700 flex flex-col justify-start items-start space-y-4">
						<h3 className="text-xl font-semibold">Constructor</h3>
						{constructor.inputs && constructor.inputs.length > 0 && (
							<div className="flex flex-col justify-center items-start ml-5">
								<h4 className="text-md">Inputs</h4>
								{constructor.inputs.map((input: any) => (
									<div className="ml-3">
										<label htmlFor={input.internalType}>
											{input.name
												? input.name
												: input.internalType}
										</label>{" "}
										&rarr;{" "}
										<input
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
						<button className="text-white p-2 text-sm bg-slate-500 rounded-lg">
							Call Constructor
						</button>
					</div>
				)}
				<Functions
					functions={functions}
					change_inputs={change_inputs}
					execute_function={execute_function}
				/>
			</div>
		</main>
	);
};

export default Contract;
