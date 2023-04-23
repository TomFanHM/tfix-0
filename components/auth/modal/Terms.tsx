import { terms } from "@/config/terms";
import { ThemeColor } from "@/styles/chakra/colors";
import { Flex, Button, Text } from "@chakra-ui/react";
import React from "react";

type TermsProps = {
  toggleView: (view: string) => void;
  handleClose: () => void;
  color: ThemeColor;
};

const Terms: React.FC<TermsProps> = ({ toggleView, handleClose, color }) => {
  return (
    <Flex flexDirection="column" align="start" gap="4" mx="auto">
      {terms["Terms and Conditions"].map((e, i) => (
        <>
          <Text fontSize="xl" as="b" color={color.primary}>
            {e.Clause}
          </Text>
          <Text color={color.onSurfaceVariant}>{e.Description}</Text>
        </>
      ))}
      <Button variant="form" onClick={handleClose}>
        Decline
      </Button>
      <Button variant="form" onClick={() => toggleView("signup")}>
        Accept
      </Button>
    </Flex>
  );
};

export default Terms;
