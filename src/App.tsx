import { FormEvent, useState } from "react";
import {
  ChakraProvider,
  Box,
  theme,
  Input,
  Button,
  InputGroup,
  FormControl,
  InputRightElement,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";

export const App = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Fill all fields");
    } else if (password.length < 6) {
      setError("password must be at least 6 characters");
    } else {
      setError("");
    }
  };
  return (
    <ChakraProvider theme={theme}>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Box textAlign="center" fontSize="xl">
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Box minW={{ base: "90%", md: "468px" }}>
              <form onSubmit={onSubmitHandler}>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  <FormControl>
                    <InputGroup>
                      <Input
                        type="email"
                        placeholder="email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Login
                  </Button>
                  <Text color="tomato" data-testid="error-message">
                    {error}
                  </Text>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};
