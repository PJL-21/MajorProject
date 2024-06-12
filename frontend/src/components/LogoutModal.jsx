import React from "react";
import { Modal, Text, Button, Flex } from "@mantine/core";

const LogoutModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal opened={open} onClose={onClose} centered title="Log Out">
      <Text variant="body1">Are you sure you want to logout?</Text>
      <Flex mt="xs" gap="xs" justify="end">
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button onClick={onConfirm}>
          Confirm
        </Button>
      </Flex>
    </Modal>
  );
};

export default LogoutModal;
