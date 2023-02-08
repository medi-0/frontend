import img1 from "../../lib/assets/picture/Hospital.jpg";
import img2 from "../../lib/assets/picture/Patient.jpg";
import { useAccount, useWaitForTransaction } from "wagmi";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	Input,
	FormControl,
	FormLabel,
	CardBody,
	Card,
	Stack,
	Heading,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ContractTransaction } from "ethers";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useMediCoreContract } from "../../lib/hooks/useMediCoreContract";

function RegistrationModal() {
	const {
		isOpen: isFirstOpen,
		onOpen: onFirstOpen,
		onClose: onFirstClose,
	} = useDisclosure({ defaultIsOpen: true });

	const {
		isOpen: isSecondOpen,
		onOpen: onSecondOpen,
		onClose: onSecondClose,
	} = useDisclosure();

	const registerHospital = () => {
		onFirstClose();
		onSecondOpen();
	};

	const navigate = useNavigate();

	//WORKING CODE
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const { contract } = useMediCoreContract();

	const [tx, setTx] = useState<ContractTransaction | null>(null);
	const { data } = useWaitForTransaction({
		hash: tx?.hash as `0x${string}` | undefined,
	});

	const handleHospital = () => {
		contract?.registerAsHospital(name, description).then((tx) => {
			setTx(tx);
		});
		
		// navigate("/Hospital");
		// onSecondClose();
	};

	const handlePatient = () => {
		contract?.registerAsPatient().then((tx) => {
			setTx(tx);
		});
		
		// navigate("/Patient");
		// onFirstClose();
	};

	const { address } = useAccount();

	// useEffect (() =>{
	//   console.log("tx completed", data)
	//   // contract?.hasRole()

	// },[data])

	useEffect(() => {
		console.log("tx completed1", data);
		// console.log("my contract",contract);
		// if (data) navigate("/app");

		

		// if (!contract || !address) return;

		// Promise.all([
		// 	contract.hasRole(
		// 		// keccak(HOSPITAL_ROLE)
		// 		"0xc8f5b4140cca307cd927e59cbeea8291bffeee228fc677f0fa059aef7b4dd8d5",
		// 		address
		// 	),
		// 	contract.hasRole(
		// 		// keccak(PATIENT_ROLE)
		// 		"0x72606200fac42b7dc86b75901d61ecfab2a4a1a6eded478b97a428094891abed",
		// 		address
		// 	),
		// ]).then(([isHospital, isPatient]) => {
		// 	console.log("double", isHospital, isPatient);

		// 	if (isHospital) {
		// 		setRole(UserRole.HOSPITAL_ROLE);
		// 		navigate("/app");
		// 		console.log("tx completed2", data);
		// 	} else if (isPatient) {
		// 		setRole(UserRole.PATIENT_ROLE);
		// 		navigate("/app");
		// 		console.log("tx completed2", data);
		// 	} else {
		// 	}
		// });
	}, [data]);

	return (
		<>
			{/* <button
          className="border border-solid rounded-full w-[150px] h-[50px] bg-[#F98E7C] text-[#3DF9E2]"
          onClick={onFirstOpen}
        >
          Connect Wallet
        </button> */}

			<Modal isOpen={isFirstOpen} onClose={onFirstClose} isCentered>
				<ModalOverlay />
				<ModalContent maxH="1000px" maxW="1000px">
					<h1 className="text-[#396AEB] text-2xl font-bold m-10">
						Choose Side
					</h1>
					<ModalCloseButton />

					<ModalBody maxH="1000px" maxW="1000px">
						<div className="flex justify-around">
							<Card maxW="sm" className="tag">
								<CardBody>
									<img src={img1} width={400} height={400} alt="" />
									<Stack mt="6" spacing="3">
										<div className="flex justify-center items-center flex-col">
											<Heading size="md" className="mb-[10px]">
												Register as Hospital
											</Heading>
											<Text>
												Lorem ipsum dolor sit amet consectetur
												adipisicing elit. Eligendi est dignissimos
												odit sit dolorum numquam aliquid odio quo?
												Molestias, deserunt. Atque placeat
												asperiores pariatur voluptatibus soluta?
												Sapiente perferendis optio deleniti!
											</Text>
										</div>
									</Stack>
								</CardBody>
								<div className="flex justify-center items-center py-[20px]">
									<Button
										onClick={registerHospital}
										variant="solid"
										colorScheme="blue"
										className="w-[300px] flex button-start"
									>
										<div className="mr-[10px]">Register</div>
										<ArrowForwardIcon className="arrow" />
									</Button>
								</div>
							</Card>

							<Card maxW="sm" className="tag">
								<CardBody>
									<img src={img2} width={400} height={400} alt="" />
									<Stack mt="6" spacing="3">
										<div className="flex justify-center items-center flex-col">
											<Heading size="md" className="mb-[10px]">
												Register as Patient
											</Heading>
											<Text>
												Lorem ipsum dolor sit amet consectetur
												adipisicing elit. Eligendi est dignissimos
												odit sit dolorum numquam aliquid odio quo?
												Molestias, deserunt. Atque placeat
												asperiores pariatur voluptatibus soluta?
												Sapiente perferendis optio deleniti!
											</Text>
										</div>
									</Stack>
								</CardBody>
								<div className="flex justify-center items-center py-[20px]">
									<Button
										onClick={handlePatient}
										variant="solid"
										colorScheme="blue"
										className="w-[300px] flex button-start"
									>
										<div className="mr-[10px]">Register</div>
										<ArrowForwardIcon className="arrow" />
									</Button>
								</div>
							</Card>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>

			<Modal isOpen={isSecondOpen} onClose={onSecondClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Register Hospital Data</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Description</FormLabel>
							<Input
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleHospital}>
							Save
						</Button>
						<Button onClick={onSecondClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
export default RegistrationModal;
