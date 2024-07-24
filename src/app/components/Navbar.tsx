import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

interface NavbarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const Navbar = ({ activeMenu, setActiveMenu }: NavbarProps) => {
  const handlePreview = () => {
    window.location.href = "/profile-preview";
  };

  const getButtonStyles = (menu: string) => ({
    bg: activeMenu === menu ? "#EFEBFF" : "none",
    color: activeMenu === menu ? "#633CFF" : "#737373",
    padding: "11px 27px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    _hover: {
      bg: "#EFEBFF",
      color: "#633CFF",
    },
  });

  const getIconSrc = (menu: string) => {
    if (menu === "links") {
      return activeMenu === "links" ? "/linkIconA.png" : "/linkIcon.png";
    } else if (menu === "profileDetails") {
      return activeMenu === "profileDetails"
        ? "/profileIconA.png"
        : "/profileIcon.png";
    }
    return "";
  };

  return (
    <Flex
      as="nav"
      p={4}
      bg="#f5f5f5"
      alignItems="center"
      justifyContent="space-between"
      fontSize={"16px"}
      lineHeight={"24px"}
      fontWeight={600}
    >
      <Flex alignItems="center">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <Text fontSize="xl" fontWeight="bold" ml={2}>
          devlinks
        </Text>
      </Flex>
      <Flex>
        <Button
          variant="link"
          onClick={() => setActiveMenu("links")}
          {...getButtonStyles("links")}
        >
          <Image src={getIconSrc("links")} alt="Links" width={20} height={20} />
          <Text ml={2}>Links</Text>
        </Button>
        <Button
          variant="link"
          ml={4}
          onClick={() => setActiveMenu("profileDetails")}
          {...getButtonStyles("profileDetails")}
        >
          <Image
            src={getIconSrc("profileDetails")}
            alt="Profile Details"
            width={20}
            height={20}
          />
          <Text ml={2}>Profile Details</Text>
        </Button>
      </Flex>
      <Button
        p={"11px 27px"}
        border={"1px solid #633CFF"}
        bg={"#FFFFFF"}
        color={"#633CFF"}
        onClick={handlePreview}
      >
        Preview
      </Button>
    </Flex>
  );
};

export default Navbar;
