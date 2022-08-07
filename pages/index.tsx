import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { promises } from "fs";
import { resolve, join } from "path";
import { useEffect, useState } from "react";
import WalletConnect from "../components/ConnectWallet";
import ContractUI, { ContractType } from "../components/contract_ui";
import Contract from "../components/contract";

const Home: NextPage = () => {
	const [selectedContract, setSelectedContract] = useState<ContractType>();
	const [loadContract, setLoadContract] = useState(false);

	useEffect(() => {
		if (selectedContract) {
			setLoadContract(true);
		} else {
			setLoadContract(false);
		}
	}, [selectedContract]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
				<WalletConnect />
				{loadContract && selectedContract ? (
					<Contract
						contract_name={selectedContract.name}
						abi={selectedContract.abi}
						address={selectedContract.address}
					/>
				) : (
					<ContractUI setContract={setSelectedContract} />
				)}
			</main>

			{loadContract && (
				<button
					onClick={() => setSelectedContract(undefined)}
					className="text-black text-xl absolute right-10 top-5"
				>
					&larr; go back
				</button>
			)}

			<footer className="flex h-24 w-full items-center justify-center border-t">
				<a
					className="flex items-center justify-center gap-2"
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<Image
						src="/vercel.svg"
						alt="Vercel Logo"
						width={72}
						height={16}
					/>
				</a>
			</footer>
		</div>
	);
};

export default Home;
