"use client";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useToast,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import { signUp } from "@/lib/auth/auth";

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const toast = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    if (!email) {
      setEmailError("Can't be empty");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Please enter a password");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      hasError = true;
    }

    if (hasError) return;

    try {
      await signUp(email, password, confirmPassword);
      window.location.href = "/profile";
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const maxWidth = useBreakpointValue({
    base: "90%",
    sm: "80%",
    md: "60%",
    lg: "40%",
  });

  return (
    <Box
      p={4}
      maxW={maxWidth}
      mx="auto"
      mt={8}
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Stack spacing={4} textAlign="center" w="full" shadow="md" p={8}>
        <Flex alignItems="center" justifyContent="center" mb={16}>
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <Text fontSize="3xl" fontWeight="bold" color="#333333">
            devlinks
          </Text>
        </Flex>
        <Box textAlign="left" gap="8px">
          <Text
            fontSize="32px"
            fontWeight={700}
            lineHeight="48px"
            color="#333333"
            mb={4}
          >
            Create account
          </Text>
          <Text
            fontSize="16px"
            fontWeight={400}
            lineHeight="24px"
            color="#737373"
            mb={4}
          >
            Let's get you started sharing your links!
          </Text>
        </Box>
        <form onSubmit={handleSignUp}>
          <FormControl isInvalid={!!emailError} mb={4}>
            <FormLabel
              fontSize="12px"
              lineHeight="18px"
              fontWeight={400}
              color={emailError ? "#FF0000" : "#888888"}
            >
              Email address
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Image
                  src="/emailIcon.png"
                  alt="Email"
                  width={16}
                  height={16}
                />
              </InputLeftElement>
              <Input
                type="email"
                placeholder={emailError || "e.g. alex@email.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outline"
                gap="12px"
                color="#333333"
                fontSize="16px"
                lineHeight="24px"
                fontWeight={400}
                border="1px solid #D9D9D9"
                borderRadius="8px"
                _focus={{ borderColor: "#633CFF" }}
              />
            </InputGroup>
            {emailError && (
              <FormErrorMessage
                position="absolute"
                right="2px"
                top="55%"
                transform="translateY(-50%)"
                color="#FF3939"
                fontSize="12px"
                lineHeight="18px"
                fontWeight={400}
                textAlign="right"
              >
                {emailError}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!passwordError} mb={4}>
            <FormLabel
              fontSize="12px"
              lineHeight="18px"
              fontWeight={400}
              color={passwordError ? "#FF0000" : "#888888"}
            >
              Password
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Image
                  src="/passwordIcon.png"
                  alt="Password"
                  width={16}
                  height={16}
                />
              </InputLeftElement>
              <Input
                type="password"
                placeholder={passwordError || "••••••••••"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outline"
                gap="12px"
                color="#333333"
                fontSize="16px"
                lineHeight="24px"
                fontWeight={400}
                border="1px solid #D9D9D9"
                borderRadius="8px"
                _focus={{ borderColor: "#633CFF" }}
              />
            </InputGroup>
            {passwordError && (
              <FormErrorMessage
                position="absolute"
                right="2px"
                top="55%"
                transform="translateY(-50%)"
                color="#FF3939"
                fontSize="12px"
                lineHeight="18px"
                fontWeight={400}
                textAlign="right"
              >
                {passwordError}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!confirmPasswordError} mb={4}>
            <FormLabel
              fontSize="12px"
              lineHeight="18px"
              fontWeight={400}
              color={confirmPasswordError ? "#FF0000" : "#888888"}
            >
              Confirm Password
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Image
                  src="/passwordIcon.png"
                  alt="Password"
                  width={16}
                  height={16}
                />
              </InputLeftElement>
              <Input
                type="password"
                placeholder={confirmPasswordError || "Confirm Password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outline"
                gap="12px"
                color="#333333"
                fontSize="16px"
                lineHeight="24px"
                fontWeight={400}
                border="1px solid #D9D9D9"
                borderRadius="8px"
                _focus={{ borderColor: "#633CFF" }}
              />
            </InputGroup>
            {confirmPasswordError && (
              <FormErrorMessage
                position="absolute"
                right="2px"
                top="55%"
                transform="translateY(-50%)"
                color="#FF3939"
                fontSize="12px"
                lineHeight="18px"
                fontWeight={400}
                textAlign="right"
              >
                {confirmPasswordError}
              </FormErrorMessage>
            )}
          </FormControl>
          <Button
            type="submit"
            gap="8px"
            bg="#633CFF"
            color="#FFFFFF"
            w="full"
            borderRadius="8px"
            _hover={{ bg: "#BEADFF" }}
          >
            Create new account
          </Button>
        </form>

        <Text
          colorScheme="teal"
          display="flex"
          justifyContent="center"
          color="#737373"
          fontSize="16px"
          lineHeight="24px"
          fontWeight={400}
          textAlign="center"
        >
          Already have an account?{" "}
          <Text
            color="#633CFF"
            pl={1}
            variant="link"
            onClick={handleLogin}
            _hover={{ cursor: "pointer" }}
          >
            Login
          </Text>
        </Text>
      </Stack>
    </Box>
  );
};

export default SignUpPage;
