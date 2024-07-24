import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import LoginPage from "./login/page";

export default function Home() {
  return (
    <Box>
      <LoginPage />
    </Box>
  );
}
