import { useContract, useSigner } from "wagmi";

export function useMediCoreContract() {
	const { data: signer, isError, isLoading } = useSigner();

	const contract = useContract({
		// GOERli
		// address: "0x26E13eBfAef30076171dd77F91aFCa75592E0050",
		// MUMBAI
		address: "0x8f6eB3281505dBfa9Fe947c903B2E30c416CAC5a",
		abi: [
			{
				inputs: [],
				stateMutability: "nonpayable",
				type: "constructor",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "address",
						name: "hospital",
						type: "address",
					},
					{
						indexed: true,
						internalType: "address",
						name: "patient",
						type: "address",
					},
					{
						indexed: true,
						internalType: "string",
						name: "cid",
						type: "string",
					},
					{
						indexed: false,
						internalType: "string",
						name: "fileName",
						type: "string",
					},
					{
						indexed: false,
						internalType: "uint256",
						name: "hash",
						type: "uint256",
					},
				],
				name: "CommitedMedicalDocument",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "bytes32",
						name: "role",
						type: "bytes32",
					},
					{
						indexed: true,
						internalType: "bytes32",
						name: "previousAdminRole",
						type: "bytes32",
					},
					{
						indexed: true,
						internalType: "bytes32",
						name: "newAdminRole",
						type: "bytes32",
					},
				],
				name: "RoleAdminChanged",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "bytes32",
						name: "role",
						type: "bytes32",
					},
					{
						indexed: true,
						internalType: "address",
						name: "account",
						type: "address",
					},
					{
						indexed: true,
						internalType: "address",
						name: "sender",
						type: "address",
					},
				],
				name: "RoleGranted",
				type: "event",
			},
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: "bytes32",
						name: "role",
						type: "bytes32",
					},
					{
						indexed: true,
						internalType: "address",
						name: "account",
						type: "address",
					},
					{
						indexed: true,
						internalType: "address",
						name: "sender",
						type: "address",
					},
				],
				name: "RoleRevoked",
				type: "event",
			},
			{
				inputs: [],
				name: "DEFAULT_ADMIN_ROLE",
				outputs: [
					{
						internalType: "bytes32",
						name: "",
						type: "bytes32",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [],
				name: "HOSPITAL_ROLE",
				outputs: [
					{
						internalType: "bytes32",
						name: "",
						type: "bytes32",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [],
				name: "PATIENT_ROLE",
				outputs: [
					{
						internalType: "bytes32",
						name: "",
						type: "bytes32",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "address",
						name: "patient",
						type: "address",
					},
					{
						internalType: "string",
						name: "fileName",
						type: "string",
					},
					{
						internalType: "string",
						name: "cid",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "hash",
						type: "uint256",
					},
				],
				name: "commitPatientFileHashAndPatientData",
				outputs: [],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "string",
						name: "",
						type: "string",
					},
				],
				name: "documentFileHashes",
				outputs: [
					{
						internalType: "uint256",
						name: "",
						type: "uint256",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "bytes32",
						name: "role",
						type: "bytes32",
					},
				],
				name: "getRoleAdmin",
				outputs: [
					{
						internalType: "bytes32",
						name: "",
						type: "bytes32",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "bytes32",
						name: "role",
						type: "bytes32",
					},
					{
						internalType: "address",
						name: "account",
						type: "address",
					},
				],
				name: "grantRole",
				outputs: [],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "bytes32",
						name: "role",
						type: "bytes32",
					},
					{
						internalType: "address",
						name: "account",
						type: "address",
					},
				],
				name: "hasRole",
				outputs: [
					{
						internalType: "bool",
						name: "",
						type: "bool",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "address",
						name: "",
						type: "address",
					},
				],
				name: "hospitals",
				outputs: [
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "string",
						name: "description",
						type: "string",
					},
					{
						internalType: "bool",
						name: "isCreated",
						type: "bool",
					},
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "string",
						name: "description",
						type: "string",
					},
				],
				name: "registerAsHospital",
				outputs: [],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [],
				name: "registerAsPatient",
				outputs: [],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "bytes32",
						name: "role",
						type: "bytes32",
					},
					{
						internalType: "address",
						name: "account",
						type: "address",
					},
				],
				name: "renounceRole",
				outputs: [],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "bytes32",
						name: "role",
						type: "bytes32",
					},
					{
						internalType: "address",
						name: "account",
						type: "address",
					},
				],
				name: "revokeRole",
				outputs: [],
				stateMutability: "nonpayable",
				type: "function",
			},
			{
				inputs: [
					{
						internalType: "bytes4",
						name: "interfaceId",
						type: "bytes4",
					},
				],
				name: "supportsInterface",
				outputs: [
					{
						internalType: "bool",
						name: "",
						type: "bool",
					},
				],
				stateMutability: "view",
				type: "function",
			},
		],
		signerOrProvider: signer,
	});

	return { contract, isError, isLoading };
}
