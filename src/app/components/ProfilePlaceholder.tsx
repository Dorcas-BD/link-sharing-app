import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import "react-placeholder/lib/reactPlaceholder.css";
import "./ProfilePlaceholder.css";

const ProfilePlaceholder = () => {
  return (
    <Box
      className="phone-skeleton"
      w="237px"
      h="500px"
      borderRadius="8px"
      bg="#f5f5f5"
      position="relative"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
      p="20px"
    >
      <Box
        padding="6"
        boxShadow="lg"
        bg="white"
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        h={"auto"}
      >
        <Flex direction={"column"} alignItems={"center"}>
          <SkeletonCircle size="24" />
          <Text>Name</Text>
          <Text>Email</Text>
        </Flex>
        <Skeleton mt="4" borderRadius={"8px"} width="100%" height="44px" />
        <Skeleton mt="4" borderRadius={"8px"} width="100%" height="44px" />
        <Skeleton mt="4" borderRadius={"8px"} width="100%" height="44px" />
        <Skeleton mt="4" borderRadius={"8px"} width="100%" height="44px" />
        <Skeleton mt="4" borderRadius={"8px"} width="100%" height="44px" />
      </Box>
    </Box>
  );
};

export default ProfilePlaceholder;
