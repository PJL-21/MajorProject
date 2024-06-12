import React, { forwardRef } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Group, Avatar, Text, UnstyledButton } from '@mantine/core';

const UserButton = forwardRef(({image, username, email, ...others }, ref) => (
    <UnstyledButton
    ref={ref}
    style={{
        padding: 'var(--mantinte-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
    }}
    {...others}
    >
        <Group>
            <Avatar src={image} radius="xl" />
            <div style={{flex: 1}}>
                <Text size="sm" fw={500}>
                    {username}
                </Text>

                <Text c="dark.8" size="xs">
                    {email}
                </Text>
            </div>
        </Group>
    </UnstyledButton>
)) 

export default UserButton;