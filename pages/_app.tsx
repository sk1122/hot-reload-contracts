import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import {
	darkTheme,
	getDefaultWallets,
	RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

// import hre from "hardhat";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	const { chains, provider } = configureChains(
		[chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
		[publicProvider()]
	);

	const { connectors } = getDefaultWallets({
		appName: "My RainbowKit App",
		chains,
	});

	const wagmiClient = createClient({
		autoConnect: true,
		connectors,
		provider,
	});

	useEffect(() => {
		// hre.run("node", { port: 8545 })
		// 	.then((a) => console.log(a))
		// 	.catch((e) => console.log(e, "Error"));
	}, []);

	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider theme={darkTheme()} chains={chains}>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
