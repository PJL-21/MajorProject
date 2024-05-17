import React from "react";
import { Text } from "@mantine/core";

const ContactPage = () => {
  return (
    <div>
      <Text variant="h4">Contact Us</Text>
      <Text variant="body1">
        If you have any questions or need assistance, please feel free to
        contact us at{" "}
        <Link href="mailto:admin@example.com">admin@example.com</Link>.
      </Text>
    </div>
  );
};

export default ContactPage;
