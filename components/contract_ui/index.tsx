import abi from "../../abi/abi.json";

export interface ContractType {
	address: string;
	name: string;
	abi: object[];
}

interface IProps {
	setContract: Function;
}

const ContractUI = ({ setContract }: IProps) => {
	const contracts: ContractType[] = [
		{
			address: "0x925e9A45C2B576D6AE81d0C4fD57241c7B7364Ed",
			name: "Index.sol",
			abi: abi,
		},
		{
			address: "0xf83bc109f36e766ce369f81c807c33bec4120270",
			name: "Main.sol",
			abi: abi,
		},
	];

	return (
		<main className="flex w-full flex-1 flex-col space-y-5 items-center justify-center px-20 text-center">
			<h1 className="text-3xl font-bold">Contracts</h1>
			<div className="flex flex-col justify-center items-center space-y-6 w-full">
				{contracts.map((contract) => (
					<div
						onClick={() => setContract(contract)}
						className="w-1/2 border-2 p-5 rounded-xl border-slate-700 flex justify-between items-center space-y-4 cursor-pointer"
					>
						<div className="flex flex-col justify-start items-start space-y-4">
							<h1 className="text-3xl font-bold">
								{contract.name}
							</h1>
							<p className="text-gray-500 text-lg">
								{contract.address}
							</p>
						</div>
						<div>
							<h1 className="text-3xl font-extrabold -mt-5">
								{">>"}
							</h1>
						</div>
					</div>
				))}
			</div>
		</main>
	);
};

export default ContractUI;
