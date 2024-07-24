"use client";

import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useToast,
  FormControl,
  FormLabel,
  Image as ChakraImage,
  Icon,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { storage, db } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { FiPlus, FiChevronDown } from "react-icons/fi";
import {
  FaGithub,
  FaYoutube,
  FaPinterest,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import ProfilePlaceholder from "../components/ProfilePlaceholder";

const ProfilePage = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [links, setLinks] = useState<{ platform: string; url: string }[]>([]);
  const [newLinkForms, setNewLinkForms] = useState<
    {
      id: number;
      platform: string;
      url: string;
      error: string | null;
    }[]
  >([]);
  const [activeMenu, setActiveMenu] = useState<string>("links");
  const toast = useToast();

  const platformIcons: Record<string, any> = {
    GitHub: FaGithub,
    YouTube: FaYoutube,
    Pinterest: FaPinterest,
    Twitter: FaTwitter,
    LinkedIn: FaLinkedin,
    Facebook: FaFacebook,
  };

  const platformValidators: Record<string, (url: string) => boolean> = {
    GitHub: (url: string) => /^https:\/\/github\.com\/[\w-]+$/.test(url),
    YouTube: (url: string) => /^https:\/\/www\.youtube\.com\/[\w-]+$/.test(url),
    Pinterest: (url: string) =>
      /^https:\/\/www\.pinterest\.com\/[\w-]+$/.test(url),
    Twitter: (url: string) => /^https:\/\/twitter\.com\/[\w-]+$/.test(url),
    LinkedIn: (url: string) =>
      /^https:\/\/www\.linkedin\.com\/in\/[\w-]+$/.test(url),
    Facebook: (url: string) =>
      /^https:\/\/www\.facebook\.com\/[\w-]+$/.test(url),
  };

  const handleSaveProfile = async () => {
    if (!firstName || !lastName || !email) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const userDocRef = doc(db, "users", "userId"); // Adjust to your user ID
      await updateDoc(userDocRef, { firstName, lastName, email });

      if (profileImage) {
        const imageRef = ref(storage, `profile-images/${profileImage.name}`);
        await uploadBytes(imageRef, profileImage);
        const imageUrl = await getDownloadURL(imageRef);
        await updateDoc(userDocRef, { profileImage: imageUrl });
      }

      toast({
        title: "Profile updated.",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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

  const handleAddLink = () => {
    if (newLinkForms.length < 5) {
      setNewLinkForms([
        ...newLinkForms,
        { id: newLinkForms.length + 1, platform: "", url: "", error: null },
      ]);
    } else {
      toast({
        title: "Link limit reached.",
        description: "You can only add up to 5 links.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLinkChange = (id: number, field: string, value: string) => {
    setNewLinkForms((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  const validateLinks = () => {
    let valid = true;
    const updatedLinks = newLinkForms.map((link) => {
      const isValid = platformValidators[link.platform]?.(link.url);
      if (!isValid) valid = false;
      return { ...link, error: isValid ? null : "Please check the URL" };
    });
    setNewLinkForms(updatedLinks);
    return valid;
  };

  const handleRemoveLink = (id: number) => {
    setNewLinkForms((prev) => prev.filter((link) => link.id !== id));
  };

  const handleSaveLinks = async () => {
    if (validateLinks()) {
      try {
        const userDocRef = doc(db, "users", "userId"); // Adjust to your user ID
        await updateDoc(userDocRef, { links: [...links, ...newLinkForms] });

        toast({
          title: "Links updated.",
          description: "Your links have been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box p={4} w="full">
      <Navbar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <Flex mt={8} w="full">
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          w="40%"
          p={4}
          border="1px solid #D9D9D9"
          borderRadius="8px"
          bg="#fff"
          boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
        >
          {(activeMenu === "profileDetails" || activeMenu === "links") && (
            <ProfilePlaceholder />
          )}
        </Flex>
        <Flex w="60%" ml={8}>
          <Stack spacing={4} w="full">
            {activeMenu === "profileDetails" && (
              <>
                <Text fontSize="2xl" fontWeight="bold">
                  Profile Details
                </Text>
                <FormControl mb={4}>
                  <FormLabel>Profile Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setProfileImage(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <Button onClick={handleSaveProfile} colorScheme="blue">
                  Save Profile
                </Button>
              </>
            )}
            {activeMenu === "links" && (
              <>
                <Box>
                  <Text
                    fontSize={"32px"}
                    lineHeight={"48px"}
                    fontWeight={700}
                    color={"#333333"}
                    mt={8}
                  >
                    Customize your links
                  </Text>
                  <Text
                    fontSize={"16px"}
                    lineHeight={"24px"}
                    fontWeight={400}
                    color={"#737373"}
                    mt={2}
                  >
                    Add/edit/remove links below and then reorder them as you
                    prefer.
                  </Text>

                  <Button
                    onClick={handleAddLink}
                    border={"1px solid #633CFF"}
                    borderRadius={"8px"}
                    color={"#633CFF"}
                    bg={"#FFFFFF"}
                    w={"100%"}
                    my={8}
                    leftIcon={<Icon as={FiPlus} />}
                  >
                    Add New Link
                  </Button>
                  {newLinkForms.map((linkForm, index) => (
                    <Box
                      key={linkForm.id}
                      // border={"1px solid #D9D9D9"}
                      borderRadius={"8px"}
                      bg={"#FAFAFA"}
                      p={4}
                      mt={4}
                    >
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Flex alignItems="center" mb={2}>
                          <Icon
                            as={platformIcons[linkForm.platform]}
                            mr={2}
                            boxSize={4}
                          />
                          <Text
                            fontSize={"16px"}
                            lineHeight={"24px"}
                            fontWeight={700}
                            color={"#737373"}
                          >
                            Link #{index + 1}
                          </Text>
                        </Flex>

                        <Button
                          onClick={() => handleRemoveLink(linkForm.id)}
                          variant="link"
                          fontSize={"16px"}
                          lineHeight={"24px"}
                          fontWeight={400}
                          color={"#737373"}
                        >
                          Remove
                        </Button>
                      </Flex>
                      <FormControl>
                        <FormLabel
                          fontSize={"12px"}
                          lineHeight={"18px"}
                          fontWeight={400}
                          color={"#333333"}
                        >
                          Platform
                        </FormLabel>
                        <Select
                          value={linkForm.platform}
                          onChange={(e) =>
                            handleLinkChange(
                              linkForm.id,
                              "platform",
                              e.target.value
                            )
                          }
                          mb={2}
                          icon={<FiChevronDown />}
                        >
                          <option value="">Select platform</option>
                          <option value="GitHub">GitHub</option>
                          <option value="YouTube">YouTube</option>
                          <option value="Pinterest">Pinterest</option>
                          <option value="Twitter">Twitter</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Facebook">Facebook</option>
                        </Select>
                      </FormControl>

                      <FormControl isInvalid={!!linkForm.error}>
                        <FormLabel
                          fontSize={"12px"}
                          lineHeight={"18px"}
                          fontWeight={400}
                          color={"#333333"}
                        >
                          Link
                        </FormLabel>
                        <Input
                          placeholder="Enter link"
                          value={linkForm.url}
                          onChange={(e) =>
                            handleLinkChange(linkForm.id, "url", e.target.value)
                          }
                        />
                        {linkForm.error && (
                          <FormErrorMessage
                            position="absolute"
                            right="8px"
                            top="40%"
                            transform="translateY(-50%)"
                            color="#FF3939"
                            fontSize="12px"
                            lineHeight="18px"
                            fontWeight={400}
                            textAlign={"right"}
                          >
                            {linkForm.error}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                    </Box>
                  ))}

                  <Flex justify={"flex-end"} mt={6}>
                    <Button
                      onClick={handleSaveLinks}
                      borderRadius={"8px"}
                      bg={"#633CFF"}
                      color={"#FFFFFF"}
                      p={"11px 27px"}
                    >
                      Save Links
                    </Button>
                  </Flex>
                </Box>
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProfilePage;
